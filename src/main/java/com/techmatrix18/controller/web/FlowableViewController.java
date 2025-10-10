package com.techmatrix18.controller.web;

import com.techmatrix18.service.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.logging.Logger;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class FlowableViewController {

    Logger log = Logger.getLogger(UserViewController.class.getName());

    private final FlowableService flowableService;

    public FlowableViewController(FlowableService flowableService) {
        this.flowableService = flowableService;
    }

    @GetMapping("/processes")
    public String addUser(Model model) {
        model.addAttribute("processes", flowableService.getProcessesByUser("1"));
        return "flowables/processes";
    }
}

