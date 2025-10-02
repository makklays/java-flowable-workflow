package com.techmatrix18.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.logging.Logger;

/**
 * Contact controller with endpoints for contacts pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class ContactViewController {

    Logger log = Logger.getLogger(ContactViewController.class.getName());

    @GetMapping("/contacts")
    public String welcome(Model model) {

        return "contacts/index";
    }
}

