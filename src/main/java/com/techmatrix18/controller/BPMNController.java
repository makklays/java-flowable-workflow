package com.techmatrix18.controller;

import com.techmatrix18.service.BPMNService;
import org.springframework.web.bind.annotation.*;

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

    private final BPMNService bpmnService;

    public BPMNController(BPMNService bpmnService) {
        this.bpmnService = bpmnService;
    }

    @GetMapping("/start")
    public String startProcessGet(@RequestParam boolean approved) {
        String processId = bpmnService.startLoanApprovalProcess(approved);
        return "Started process with id: " + processId;
    }
}

