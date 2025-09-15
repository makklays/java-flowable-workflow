package com.techmatrix18.service;

import org.flowable.cmmn.api.CmmnRuntimeService;
import org.flowable.engine.TaskService;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class CMMNService {

    private final CmmnRuntimeService cmmnRuntimeService;
    private final TaskService taskService;

    public CMMNService(CmmnRuntimeService cmmnRuntimeService, TaskService taskService) {
        this.cmmnRuntimeService = cmmnRuntimeService;
        this.taskService = taskService;
    }

    public String startCustomerOnboarding(String customerId) {
        Map<String, Object> vars = new HashMap<>();
        vars.put("customerId", customerId);

        return cmmnRuntimeService
                .createCaseInstanceBuilder()
                .caseDefinitionKey("customerOnboarding")
                .variables(vars)
                .start()
                .getId();
    }

    public void completeTask(String taskId) {
        taskService.complete(taskId);
    }
}

