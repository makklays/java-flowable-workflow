package com.techmatrix18.controller.api;

import com.techmatrix18.dto.UserDto;
import com.techmatrix18.mapper.UserMapper;
import com.techmatrix18.model.User;
import com.techmatrix18.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.time.LocalDateTime;
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

    @PostMapping
    @Operation(summary = "Create new user", description = "Adds a new user to the system")
    public ResponseEntity addUser(@Valid @RequestBody UserDto userDto) {
        log.info("Creating new user ID = " + userDto.getDisplayname());
        User user = UserMapper.toEntity(userDto);
        User saved = userService.addUser(user);
        return ResponseEntity
                .created(URI.create("/api/v1/users/" + saved.getId()))
                .body(UserMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing user by ID", description = "Updates data for an existing user by ID")
    public ResponseEntity updateUser(@PathVariable Long id, @Valid @RequestBody UserDto userDto) {
        User user = userService.getById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        log.info("Updating user with ID " + id);

        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setUsername(userDto.getUsername());
        user.setDisplayname(userDto.getDisplayname());
        user.setRole(userDto.getRole());
        user.setDepartment(userDto.getDepartment());
        user.setPosition(userDto.getPosition());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setAge(userDto.getAge());
        user.setMan(userDto.getIsMan());
        user.setPictureSet(userDto.getIsPictureSet());
        user.setAddress(userDto.getAddress());
        user.setUpdatedAt(LocalDateTime.now());

        User updated = userService.updateUser(user);

        return ResponseEntity.ok(UserMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete user by ID", description = "Deletes a user by ID")
    public ResponseEntity deleteUser(@PathVariable Long id) {
        log.info("Deleting User ID = " + id);
        if (userService.getById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}

