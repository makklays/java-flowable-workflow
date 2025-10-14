package com.techmatrix18.controller.web;

import com.techmatrix18.model.User;
import com.techmatrix18.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalControllerAdvice {

    private final UserService userService;

    public GlobalControllerAdvice(UserService userService) {
        this.userService = userService;
    }

    // Current URL - for all templates and all controllers
    @ModelAttribute("requestURI")
    public String requestURI(HttpServletRequest request) {
        return request.getRequestURI();
    }

    // Current user - for all templates and all controllers
    @ModelAttribute("currentUser")
    public User currentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return null; // или верни Guest/анонимного пользователя
        }
        User user = userService.getUserByUsername(userDetails.getUsername());
        return user;
    }
}

