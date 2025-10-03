package com.techmatrix18.controller.web;

import com.techmatrix18.dto.RoleDto;
import com.techmatrix18.model.Role;
import com.techmatrix18.service.RoleService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.util.List;
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
    public String getAllRoles(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              Model model) {
        Page<Role> rolesPage = roleService.getAllPaginated(page, size);

        model.addAttribute("rolesPage", rolesPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", rolesPage.getTotalPages());

        return "roles/index";
    }

    @GetMapping("/roles/add")
    public String addRole(Model model) {
        model.addAttribute("roleDto", new RoleDto()); // empty form
        return "roles/add";
    }

    @PostMapping("/roles/add")
    public String addRolePost(@Valid @ModelAttribute("roleDto") RoleDto roleDto,
                              BindingResult result,
                              Model model,
                              RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "roles/add"; // return form with errors
        }

        // Mapping DTO → Entity
        Role role = new Role();
        role.setTitle(roleDto.getTitle());
        role.setDescription(roleDto.getDescription());
        role.setCreatedAt(LocalDateTime.now());
        role.setUpdatedAt(LocalDateTime.now());

        // save Role in database
        roleService.addRole(role);
        redirectAttributes.addFlashAttribute("successMessage", "Role was successfully added!");

        return "redirect:/roles";
    }

    @GetMapping("/roles/edit/{id}")
    public String editRole(@PathVariable Long id, Model model) {
        RoleDto roleDto = roleService.getByIdDto(id);
        model.addAttribute("roleDto", roleDto);
        return "roles/edit";
    }

    @PostMapping("/roles/edit")
    public String editRolePost(@Valid @ModelAttribute("roleDto") RoleDto roleDto,
                               BindingResult result,
                               Model model,
                               RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "roles/edit"; // return form with errors
        }

        // Mapping DTO → Entity
        Role role = roleService.getById(roleDto.getId());
        role.setTitle(roleDto.getTitle());
        role.setDescription(roleDto.getDescription());
        role.setUpdatedAt(LocalDateTime.now());

        roleService.updateRole(role); // update entity
        redirectAttributes.addFlashAttribute("successMessage", "Role was successfully updated!");
        return "redirect:/roles";
    }

    @GetMapping("/roles/view/{id}")
    public String viewRole(@PathVariable Long id, Model model) {
        Role role = roleService.getById(id);
        model.addAttribute("role", role);
        return "roles/view";
    }

    @GetMapping("/roles/delete/{id}")
    public String deleteRole(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        roleService.deleteRole(id);
        redirectAttributes.addFlashAttribute("successMessage", "Role was successfully deleted!");
        return "redirect:/roles";
    }
}

