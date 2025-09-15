package com.techmatrix18.controller;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.runtime.ProcessInstance;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * This is ProcessController
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 05-09-2025
 * @version 0.0.1
 */

@RestController
@RequestMapping("/api/process")
public class BPMNController {

    private final RuntimeService runtimeService;

    public BPMNController(RuntimeService runtimeService) {
        this.runtimeService = runtimeService;
    }

    @GetMapping("/start")
    public String startProcessGet(@RequestParam boolean approved) {
        return startProcess(approved);
    }

    @PostMapping("/start")
    public String startProcess(@RequestParam boolean approved) {
        ProcessInstance instance = runtimeService.startProcessInstanceByKey(
                "loanApproval",
                Map.of("approved", approved)
        );
        return "Started process with id: " + instance.getId();
    }
}

