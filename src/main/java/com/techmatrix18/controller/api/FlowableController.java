package com.techmatrix18.controller.api;

import com.techmatrix18.dto.FlowableTaskDto;
import com.techmatrix18.security.CustomUserDetails;
import org.flowable.bpmn.model.*;
import org.flowable.engine.IdentityService;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.repository.ProcessDefinition;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.form.api.FormInfo;
import org.flowable.form.api.FormModel;
import org.flowable.task.api.Task;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.flowable.engine.TaskService;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * FlowableController - REST API контроллер для взаимодействия с Flowable BPMN движком.
 *
 * @author Alexander Kuziv
 * @since 30.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@RestController
@RequestMapping("/api/v1/workflow")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"})
public class FlowableController {

    private final RepositoryService repositoryService;
    private final TaskService taskService;
    private final RuntimeService runtimeService;
    private final IdentityService identityService;

    public FlowableController(RepositoryService repositoryService, TaskService taskService, RuntimeService runtimeService, IdentityService identityService) {
        this.repositoryService = repositoryService;
        this.taskService = taskService;
        this.runtimeService = runtimeService;
        this.identityService = identityService;
    }

    // 1. Получить список схем (Определений процессов) для карточек "Доступные действия"
    @GetMapping("/definitions")
    public ResponseEntity<?> getDefinitions() {
        return ResponseEntity.ok(
            repositoryService.createProcessDefinitionQuery()
                .latestVersion()
                .orderByProcessDefinitionKey().asc()
                .orderByProcessDefinitionVersion().desc()
                .list()
                .stream()
                .map(pd -> Map.of(
                    "id", pd.getId(),
                    "name", pd.getName() != null ? pd.getName() : pd.getKey(),
                    "key", pd.getKey(),
                    "version", pd.getVersion()
                )).toList()
        );
    }

    // 2. Получить список активных задач для текущего пользователя
    @GetMapping("/tasks/{userId}/by-user")
    public ResponseEntity<?> getTasks(@PathVariable String userId) {
        return ResponseEntity.ok(
            taskService.createTaskQuery()
                .taskAssignee(userId)
                .active()
                .list()
                .stream()
                .map(t -> Map.of(
                    "id", t.getId(),
                    "name", t.getName(),
                    "processInstanceId", t.getProcessInstanceId(),
                    "createTime", t.getCreateTime()
                )).toList()
        );
    }

    // 3. Старт процесса по ключу (напр. "helloProcess")
    @PostMapping("/start/{processKey}")
    public ResponseEntity<?> startProcess(
            @PathVariable String processKey,
            @RequestBody Map<String, Object> variables,
            Authentication authentication) {

        // 1. Защита от анонимных запросов
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        // 2. Безопасное извлечение
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof CustomUserDetails userDetails)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid user details type");
        }

        // Передаем ID в Flowable
        Long userId = userDetails.getId();
        variables.put("initiatorId", userId);

        // Устанавливаем пользователя для истории Flowable (Audit Log)
        identityService.setAuthenticatedUserId(String.valueOf(userId));

        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(processKey, variables);
        return ResponseEntity.ok(Map.of("id", processInstance.getId(), "status", "started"));
    }

    // 4. Получить список всех запущенных экземпляров процессов
    @GetMapping("/instances")
    public ResponseEntity<?> getInstances() {
        return ResponseEntity.ok(
            runtimeService.createProcessInstanceQuery()
                .list()
                .stream()
                .map(pi -> Map.of(
                    "id", pi.getId(),
                    "processDefinitionId", pi.getProcessDefinitionId(),
                    "businessKey", pi.getBusinessKey() != null ? pi.getBusinessKey() : "N/A",
                    "startTime", pi.getStartTime() != null ? pi.getStartTime() : "N/A",
                    "isEnded", pi.isEnded()
                )).toList()
        );
    }

    // 5. Все таски
    @GetMapping("/tasks/all")
    public ResponseEntity<?> getAllTasks() {
        // Get list of all active tasks
        List<Task> tasks = taskService.createTaskQuery().active().orderByTaskCreateTime().desc().list();

        if (tasks.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        // Collect all unique definitions IDs
        Set<String> processDefIds = tasks.stream()
            .map(Task::getProcessDefinitionId)
            .filter(id -> id != null)
            .collect(Collectors.toSet());

        // We request process names from the database with one query and create a Map [id -> name]
        Map<String, String> processNamesMap = Collections.emptyMap();
        if (!processDefIds.isEmpty()) {
            processNamesMap = repositoryService.createProcessDefinitionQuery()
                .processDefinitionIds(processDefIds) // Корректный метод для Flowable
                .list()
                .stream()
                .collect(Collectors.toMap(
                    ProcessDefinition::getId,
                    pd -> pd.getName() != null ? pd.getName() : pd.getKey(),
                    (existing, replacement) -> existing // Защита от дубликатов
                ));
        }

        Map<String, String> finalNamesMap = processNamesMap;
        return ResponseEntity.ok(
            taskService.createTaskQuery()
                .active()
                .orderByTaskCreateTime().desc()
                .list()
                .stream()
                .map(t -> Map.of(
                    "id", t.getId(),
                    "name", t.getName(),
                    "processInstanceId", t.getProcessInstanceId(),
                    "processName", finalNamesMap.getOrDefault(t.getProcessDefinitionId(), "Unknown Process"), // Название процесса
                    "assignee", t.getAssignee() != null ? t.getAssignee() : "Unassigned",
                    "createTime", t.getCreateTime()
                )).toList()
        );
    }

    // Рекурсивный обход схемы для поиска следующего User Task в Процессе (пропуская шлюзы и автоматические шаги)
    // Если на форме нужно отобразить Название следующего User Task из Процесса
    private void findNextUserTasksRecursive(List<SequenceFlow> outgoingFlows, List<String> resultNames) {
        for (SequenceFlow flow : outgoingFlows) {
            FlowElement targetElement = flow.getTargetFlowElement();

            if (targetElement instanceof UserTask) {
                // Если следующий элемент — User Task, берем его имя (или ключ, если имя пустое)
                UserTask userTask = (UserTask) targetElement;
                resultNames.add(userTask.getName() != null ? userTask.getName() : userTask.getId());

            } else if (targetElement instanceof Gateway || targetElement instanceof ServiceTask) {
                // Если это шлюз или авто-шаг, идем глубже по его исходящим связям
                if (targetElement instanceof FlowNode) {
                    findNextUserTasksRecursive(((FlowNode) targetElement).getOutgoingFlows(), resultNames);
                }
            }
            // EndEvent (конец процесса) здесь игнорируется, так как это не User Task
        }
    }

    // 6. Start process with a Business Key
    @PostMapping("/start/{processKey}/{businessKey}")
    public ResponseEntity<?> startProcessWithKey(
            @PathVariable String processKey,
            @PathVariable String businessKey,
            @RequestBody Map<String, Object> variables,
            Authentication authentication
    ) {
        // Извлекаем твоего кастомного пользователя
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getId();

        // Передаем ID в Flowable
        variables.put("initiatorId", userId);

        // We pass the businessKey here to link the process to our external ID
        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey(
            processKey,
            businessKey,
            variables
        );

        return ResponseEntity.ok(Map.of(
            "id", processInstance.getId(),
            "businessKey", processInstance.getBusinessKey(),
            "status", "started"
        ));
    }

    // 7. Получить описание формы для User Task по ID задачи
    // Этот вызов вернет JSON с массивом полей (fields), их типами (string, date, boolean) и правилами валидации.
    @GetMapping("/tasks/{taskId}/form")
    public FormModel getTaskForm(@PathVariable String taskId) {
        // Получаем FormInfo (содержит ID формы, версию и т.д.)
        FormInfo formInfo = taskService.getTaskFormModel(taskId);
        if (formInfo == null) {
            // Если у задачи не привязана форма (formKey пустой)
            return null;
        }

        // Извлекаем саму модель (содержит fields, layout и т.д.)
        return formInfo.getFormModel();
    }

    // 8. Завершить задачу с передачей переменных (напр. { "approved": true, "reviewComment": "..." })
    @PostMapping("/tasks/{taskId}/complete")
    public ResponseEntity<Void> completeTask(@PathVariable String taskId, @RequestBody Map<String, Object> variables) {
        // variables содержит { "approved": true, "reviewComment": "..." }
        // Метод complete сам сохранит переменные в процесс и завершит задачу (переменные процесса, не переменные таски)
        taskService.complete(taskId, variables);
        return ResponseEntity.ok().build();
    }

    // 9. Получить детали задачи по ID (включая formKey, который критически важен для фронтенда)
    @GetMapping("/tasks/{taskId}")
    public FlowableTaskDto getTask(@PathVariable String taskId) {
        // Ищем задачу во Flowable по ID
        Task task = taskService.createTaskQuery()
            .taskId(taskId)
            .singleResult();

        // Безопасное логирование: проверяем на null перед вызовом методов
        System.out.println("Получаем задачу по ID --------->: " + (task != null ? task.getId() : "null"));

        // Сначала проверяем на null, только потом работаем с объектом
        if (task == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Задача не найдена");
        }

        // Get all process's variables
        Map<String, Object> processVariables = taskService.getVariables(taskId);

        // Маппим данные в DTO из Task для отправки на фронтенд
        FlowableTaskDto dto = new FlowableTaskDto();
        dto.setId(task.getId());
        dto.setName(task.getName());
        dto.setFormKey(task.getFormKey()); // Это критически важное поле для фронтенда
        dto.setProcessInstanceId(task.getProcessInstanceId());
        dto.setCreateTime(task.getCreateTime());
        dto.setProcessVariables(processVariables);
        // Получаем имя процесса из его Definition
        if (task.getProcessDefinitionId() != null) {
            var processDefinition = repositoryService.createProcessDefinitionQuery()
                    .processDefinitionId(task.getProcessDefinitionId())
                    .singleResult();

            // Защита на случай, если дефиниция процесса была удалена из базы
            if (processDefinition != null) {
                dto.setProcessName(processDefinition.getName()); // вернет "Название процесса"
            }
        }

        return dto;
    }
}

