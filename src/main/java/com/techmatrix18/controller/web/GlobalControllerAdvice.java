package com.techmatrix18.controller.web;

import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalControllerAdvice {

    // Current URL - for all templates and all controllers
    @ModelAttribute("requestURI")
    public String requestURI(HttpServletRequest request) {
        return request.getRequestURI();
    }

    // Current user - for all templates and all controllers
    /*@ModelAttribute("currentUser")
    public UserDetails currentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userDetails;
    }*/
}

