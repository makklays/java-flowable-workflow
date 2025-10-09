package com.techmatrix18.controller.api;

import com.techmatrix18.dto.DepartmentDto;
import com.techmatrix18.mapper.DepartmentMapper;
import com.techmatrix18.model.Department;
import com.techmatrix18.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.logging.Logger;

/**
 * Controller for registering departments in the system.
 * Processes HTTP-requests, related to department.
 *
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Departments", description = "Department management API")
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    private DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    private static final Logger log = Logger.getLogger(DepartmentController.class.getName());

    @GetMapping
    @Operation(summary = "Get all departments", description = "Returns list of all departments")
    public ResponseEntity<List<DepartmentDto>> getAllDepartment() {
        List<Department> departments = departmentService.getAll();
        return ResponseEntity.ok(DepartmentMapper.toDtoList(departments));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get department by ID", description = "Returns a department by its unique ID")
    public ResponseEntity<DepartmentDto> getDepartment(@PathVariable Long id) {
        Department department = departmentService.getById(id);
        if (department != null) {
            return ResponseEntity.ok(DepartmentMapper.toDto(department));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new department", description = "Adds a new department to the system")
    public ResponseEntity addDepartment(@Valid @RequestBody DepartmentDto departmentDto) {
        log.info("Creating new department ID = " + departmentDto.getTitle());
        Department department = DepartmentMapper.toEntity(departmentDto);
        boolean added = departmentService.addDepartment(department);

        if (added) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Department successfully added");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add department");
        }
    }
}

