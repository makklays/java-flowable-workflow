package com.techmatrix18.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.logging.Logger;

/**
 * Activity controller with endpoints for activities pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class ActivityViewController {

    Logger log = Logger.getLogger(ActivityViewController.class.getName());

    @GetMapping("/activities")
    public String welcome(Model model) {

        return "activities/index";
    }
}

