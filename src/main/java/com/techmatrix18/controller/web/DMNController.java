package com.techmatrix18.controller.web;

import com.techmatrix18.service.DMNService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * This is DMNController
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 15-09-2025
 * @version 0.0.1
 */

@RestController
@RequestMapping("/api/decisions")
public class DMNController {
    private final DMNService dmnService;

    public DMNController(DMNService dmnService) {
        this.dmnService = dmnService;
    }

    @PostMapping("/risk")
    public String evaluateRisk(@RequestParam int age, @RequestParam int income) {
        return dmnService.evaluateRisk(age, income);
    }
}

