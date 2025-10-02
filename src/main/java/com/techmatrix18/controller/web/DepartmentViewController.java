package com.techmatrix18.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.logging.Logger;

/**
 * Department controller with endpoints for departments pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class DepartmentViewController {

    Logger log = Logger.getLogger(DepartmentViewController.class.getName());

    @GetMapping("/departments")
    public String welcome(Model model) {

        return "departments/index";
    }
}

