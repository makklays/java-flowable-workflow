package com.techmatrix18.controller.web;

import com.techmatrix18.model.Role;
import com.techmatrix18.service.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.logging.Logger;

/**
 * Role controller with endpoints for roles pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class RoleViewController {

    Logger log = Logger.getLogger(RoleViewController.class.getName());

    private final RoleService roleService;

    public RoleViewController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/roles")
    public String getAllRoles(Model model) {

        return "roles/index";
    }

    @GetMapping("/roles/add")
    public String addRole(Model model) {

        return "roles/add";
    }

    @GetMapping("/roles/edit/{id}")
    public String editRole(@PathVariable Long id, Model model) {
        Role role = roleService.getById(id);
        model.addAttribute("role", role);

        return "roles/edit";
    }

    @GetMapping("/roles/view/{id}")
    public String viewRole(@PathVariable Long id, Model model) {
        Role role = roleService.getById(id);
        model.addAttribute("role", role);

        return "roles/view";
    }

    @GetMapping("/roles/delete/{id}")
    public void deleteRole(@PathVariable Long id, Model model) {
        Role role = roleService.getById(id);
        //
    }
}

