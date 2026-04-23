package com.techmatrix18.controller.api;

import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.runtime.ProcessInstance;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.flowable.engine.TaskService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/workflow")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"})
public class FlowableController {

    private final RepositoryService repositoryService;
    private final TaskService taskService;
    private final RuntimeService runtimeService;

    public FlowableController(RepositoryService repositoryService, TaskService taskService, RuntimeService runtimeService) {
        this.repositoryService = repositoryService;


        this.taskService = taskService;
        this.runtimeService = runtimeService;
    }

    // 1. Получить список схем (Определений процессов) для карточек "Доступные действия"
    @GetMapping("/definitions")
    public ResponseEntity<?> getDefinitions() {
        return ResponseEntity.ok(
            repositoryService.createProcessDefinitionQuery()
                .latestVersion()
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
    @GetMapping("/tasks/{userId}")
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
    public ResponseEntity<?> startProcess(@PathVariable String processKey, @RequestBody Map<String, Object> variables) {
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
        return ResponseEntity.ok(
            taskService.createTaskQuery()
                .active()
                .list()
                .stream()
                .map(t -> Map.of(
                    "id", t.getId(),
                    "name", t.getName(),
                    "processInstanceId", t.getProcessInstanceId(),
                    "assignee", t.getAssignee() != null ? t.getAssignee() : "Unassigned",
                    "createTime", t.getCreateTime()
                )).toList()
        );
    }
}

