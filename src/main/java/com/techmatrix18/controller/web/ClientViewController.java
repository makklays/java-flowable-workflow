package com.techmatrix18.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.logging.Logger;

/**
 * Client controller with endpoints for clients pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class ClientViewController {

    Logger log = Logger.getLogger(ClientViewController.class.getName());

    @GetMapping("/clients")
    public String welcome(Model model) {

        return "clients/index";
    }
}

