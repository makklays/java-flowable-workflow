package com.techmatrix18.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.logging.Logger;

/**
 * Position controller with endpoints for positions pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class PositionViewController {

    Logger log = Logger.getLogger(PositionViewController.class.getName());

    @GetMapping("/positions")
    public String welcome(Model model) {

        return "positions/index";
    }
}

