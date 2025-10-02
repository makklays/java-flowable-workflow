package com.techmatrix18.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.logging.Logger;

/**
 * Deal controller with endpoints for deals pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class DealViewController {

    Logger log = Logger.getLogger(DealViewController.class.getName());

    @GetMapping("/deals")
    public String welcome(Model model) {

        return "deals/index";
    }
}

