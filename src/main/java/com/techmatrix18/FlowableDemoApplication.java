package com.techmatrix18;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.task.api.Task;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * Flowable Demo Application -
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 28-03-2026
 * @version 0.0.1
 */
@SpringBootApplication
public class FlowableDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(FlowableDemoApplication.class, args);
    }

    @Bean // Вставляем этот блок прямо сюда, внутрь класса
    public CommandLineRunner init(RuntimeService runtimeService, TaskService taskService) {
        return args -> {
            // Запускает процесс hello.bpmn20.xml
            ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("helloProcess");
            /*System.out.println("🚀 Процесс запущен!");
            Task task = taskService.createTaskQuery()
                .processInstanceId(processInstance.getId()) // ВОТ ОНА ПРИВЯЗКА
                .taskAssignee("admin")
                .singleResult();

            if (task != null) {
                System.out.println("✅ Найдена активная задача: " + task.getName());
                System.out.println("ID задачи в БД: " + task.getId());
            }*/
            // SELECT ID_, KEY_, NAME_, VERSION_, DEPLOYMENT_ID_ FROM ACT_RE_PROCDEF;

            // 1. Ищем нашу задачу по назначению (assignee)
            Task task = taskService.createTaskQuery()
                .processInstanceId(processInstance.getId()) // ВОТ ОНА ПРИВЯЗКА
                .taskAssignee("admin")
                .singleResult();

            if (task != null) {
                System.out.println("🏁 Завершаем задачу: " + task.getName());
                // 2. Команда движку: "Задача выполнена!"
                taskService.complete(task.getId());
                System.out.println("✅ Задача завершена. Процесс пошел дальше к End Event.");
            }
            // 3. Проверяем, остались ли активные процессы
            long count = runtimeService.createProcessInstanceQuery().count();
            System.out.println("Количество активных процессов в рантайме: " + count);
            // SELECT * FROM ACT_RU_TASK WHERE ID_ = 'b9266d92-2a8b-11f1-8265-f675e4417f3c';
        };
    }
}

