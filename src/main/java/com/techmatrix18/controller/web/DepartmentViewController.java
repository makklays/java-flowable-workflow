package com.techmatrix18.controller.web;

import com.techmatrix18.dto.DepartmentDto;
import com.techmatrix18.model.Department;
import com.techmatrix18.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.time.LocalDateTime;
import java.util.logging.Logger;

/**
 * Department controller with endpoints for departments pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class DepartmentViewController {

    Logger log = Logger.getLogger(DepartmentViewController.class.getName());

    private final DepartmentService departmentService;

    public DepartmentViewController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping("/departments")
    public String getAllDepartments(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              Model model) {
        Page<Department> departmentsPage = departmentService.getAllPaginated(page, size);

        model.addAttribute("departmentsPage", departmentsPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", departmentsPage.getTotalPages());

        return "departments/index";
    }

    @GetMapping("/departments/add")
    public String addDepartment(Model model) {
        model.addAttribute("departmentDto", new DepartmentDto()); // empty form
        return "departments/add";
    }

    @PostMapping("/departments/add")
    public String addDepartmentPost(@Valid @ModelAttribute("departmentDto") DepartmentDto departmentDto,
                              BindingResult result,
                              Model model,
                              RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "departments/add"; // return form with errors
        }

        // Mapping DTO → Entity
        Department department = new Department();
        department.setTitle(departmentDto.getTitle());
        department.setDescription(departmentDto.getDescription());
        department.setCreatedAt(LocalDateTime.now());
        department.setUpdatedAt(LocalDateTime.now());

        // save Department in database
        departmentService.addDepartment(department);
        redirectAttributes.addFlashAttribute("successMessage", "Department was successfully added!");

        return "redirect:/departments";
    }

    @GetMapping("/departments/edit/{id}")
    public String editDepartment(@PathVariable Long id, Model model) {
        DepartmentDto departmentDto = departmentService.getByIdDto(id);
        model.addAttribute("departmentDto", departmentDto);
        return "departments/edit";
    }

    @PostMapping("/departments/edit")
    public String editDepartmentPost(@Valid @ModelAttribute("departmentDto") DepartmentDto departmentDto,
                               BindingResult result,
                               Model model,
                               RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "departments/edit"; // return form with errors
        }

        // Mapping DTO → Entity
        Department department = departmentService.getById(departmentDto.getId());
        department.setTitle(departmentDto.getTitle());
        department.setDescription(departmentDto.getDescription());
        department.setUpdatedAt(LocalDateTime.now());

        departmentService.updateDepartment(department); // update entity
        redirectAttributes.addFlashAttribute("successMessage", "Department was successfully updated!");
        return "redirect:/departments";
    }

    @GetMapping("/departments/view/{id}")
    public String viewDepartment(@PathVariable Long id, Model model) {
        Department department = departmentService.getById(id);
        model.addAttribute("department", department);
        return "departments/view";
    }

    @GetMapping("/departments/delete/{id}")
    public String deleteDepartment(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        departmentService.deleteDepartment(id);
        redirectAttributes.addFlashAttribute("successMessage", "Department was successfully deleted!");
        return "redirect:/departments";
    }
}

