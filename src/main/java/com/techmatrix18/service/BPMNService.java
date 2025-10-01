package com.techmatrix18.service;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.runtime.ProcessInstance;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class BPMNService {

    private final RuntimeService runtimeService;
    private final TaskService taskService;

    public BPMNService(RuntimeService runtimeService, TaskService taskService) {
        this.runtimeService = runtimeService;
        this.taskService = taskService;
    }

    // Starting the process
    public String startLoanApprovalProcess(boolean approved) {
        ProcessInstance instance = runtimeService.startProcessInstanceByKey(
                "loanApproval",
                Map.of("approved", approved)
        );
        return instance.getId();
    }

    // Getting active tasks for a process
    public String getActiveTasks(String processInstanceId) {
        return taskService.createTaskQuery()
                .processInstanceId(processInstanceId)
                .list()
                .toString();
    }

    // Completing a task by Id
    public void completeTask(String taskId, Map<String, Object> variables) {
        taskService.complete(taskId, variables);
    }
}

