package com.techmatrix18.controller.web;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.logging.Logger;

/**
 * User controller with endpoints for user pages
 *
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class UserViewController {

    Logger log = Logger.getLogger(UserViewController.class.getName());

    @GetMapping("/welcome")
    public String welcome(Model model, HttpSession session) {
        // get session
        Long userId = (Long) session.getAttribute("userId");
        log.info("---------- user ID--------------> " + userId);
        return "welcome";
    }

    @GetMapping("/panel")
    public String panel(Model model) {
        return "panel";
    }

    @GetMapping("/home")
    public String home(Model model) {
        return "home";
    }

    @GetMapping("/users")
    public String getAllUsers(Model model) {

        return "users/index";
    }
}

