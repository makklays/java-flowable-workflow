package com.techmatrix18.controller.web;

import com.techmatrix18.service.CMMNService;
import org.springframework.web.bind.annotation.*;

/**
 * This is CMMNController
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 15-09-2025
 * @version 0.0.1
 */

@RestController
@RequestMapping("/api/cases")
public class CMMNController {

    private final CMMNService cmmnService;

    public CMMNController(CMMNService cmmnService) {
        this.cmmnService = cmmnService;
    }

    @PostMapping("/start")
    public String startCase(@RequestParam String customerId) {
        return cmmnService.startCustomerOnboarding(customerId);
    }

    @PostMapping("/complete-task")
    public String completeTask(@RequestParam String taskId) {
        cmmnService.completeTask(taskId);
        return "Task " + taskId + " completed";
    }
}

