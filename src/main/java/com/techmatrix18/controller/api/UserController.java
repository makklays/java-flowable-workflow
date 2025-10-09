package com.techmatrix18.controller.api;

import com.techmatrix18.dto.UserDto;
import com.techmatrix18.mapper.UserMapper;
import com.techmatrix18.model.User;
import com.techmatrix18.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.logging.Logger;

/**
 * Controller for registering users in the system.
 * Processes HTTP-requests, related to user registration.
 *
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Users", description = "User management API")
@RequestMapping("/api/v1/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private static final Logger log = Logger.getLogger(UserController.class.getName());

    @GetMapping
    @Operation(summary = "Get all users", description = "Returns list of all users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(UserMapper.toDtoList(users));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Returns a user by its unique ID")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user != null) {
            return ResponseEntity.ok(UserMapper.toDto(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

