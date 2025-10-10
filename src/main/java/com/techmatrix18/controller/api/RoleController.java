package com.techmatrix18.controller.api;

import com.techmatrix18.dto.RoleDto;
import com.techmatrix18.mapper.RoleMapper;
import com.techmatrix18.model.Role;
import com.techmatrix18.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

/**
 * Controller for registering roles in the system.
 * Processes HTTP-requests, related to role.
 *
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Roles", description = "Role management API")
@RequestMapping("/api/v1/roles")
public class RoleController {

    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    private static final Logger log = Logger.getLogger(RoleController.class.getName());

    @GetMapping
    @Operation(summary = "Get all roles", description = "Returns list of all roles")
    public ResponseEntity<List<RoleDto>> getAll() {
        log.info("Fetching all roles");
        List<Role> roles = roleService.getAll();
        return ResponseEntity.ok(RoleMapper.toDtoList(roles));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get role by ID", description = "Returns a role by its unique ID")
    public ResponseEntity<RoleDto> getRole(@PathVariable Long id) {
        log.info("Fetching role with ID = " + id);
        Role role = roleService.getById(id);
        if (role == null) {
            return ResponseEntity.ok(RoleMapper.toDto(role));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new role", description = "Adds a new role to the system")
    public ResponseEntity addRole(@Valid @RequestBody RoleDto roleDto) {
        log.info("Creating new role name = " + roleDto.getTitle());
        Role role = RoleMapper.toEntity(roleDto);

        boolean added = roleService.addRole(role);
        if (added) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Role successfully added");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add role");
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing role by ID", description = "Updates data for an existing role by ID")
    public ResponseEntity updateRole(@PathVariable Long id, @Valid @RequestBody RoleDto roleDto) {
        Role role = roleService.getById(id);
        if (role == null) {
            return ResponseEntity.notFound().build();
        }
        log.info("Updating role with ID + " + id);

        role.setTitle(roleDto.getTitle());
        role.setDescription(roleDto.getDescription());
        role.setUpdatedAt(LocalDateTime.now());

        boolean updated = roleService.updateRole(role);
        if (updated) {
            return ResponseEntity.status(HttpStatus.OK).body("Role successfully updated");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update role");
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete role by ID", description = "Deletes a role by ID")
    public ResponseEntity deleteRole(@PathVariable Long id) {
        log.info("Deleting role with ID = " + id);
        if (roleService.getById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}

