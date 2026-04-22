package com.techmatrix18.controller.api;

import com.techmatrix18.dto.UserDto;
import com.techmatrix18.mapper.UserMapper;
import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.User;
import com.techmatrix18.service.DepartmentService;
import com.techmatrix18.service.PositionService;
import com.techmatrix18.service.RoleService;
import com.techmatrix18.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
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

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"}) // Разрешает запросы с твоего фронта
@RestController
@Tag(name = "Users", description = "User management API")
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final DepartmentService departmentService;
    private final PositionService positionService;
    private final RoleService roleService;
    private final UserMapper userMapper;

    public UserController(DepartmentService departmentService, PositionService positionService, RoleService roleService,
                          UserService userService, UserMapper userMapper) {
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.roleService = roleService;
        this.userService = userService;
        this.userMapper = userMapper;
    }

    private static final Logger log = Logger.getLogger(UserController.class.getName());

    @GetMapping
    @Operation(summary = "Get all users", description = "Returns list of all users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(userMapper.toDtoList(users));
    }

    @GetMapping(params = {"page", "size"})
    @Operation(summary = "Get all users by pages", description = "Returns list of all users by pages")
    public ResponseEntity<Page<UserDto>> getAllUsersByPages(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<User> users = userService.getAllPaginated(page, size);
        Page<UserDto> usersDto = users.map(user -> userMapper.toDto(user));
        return ResponseEntity.ok(usersDto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get user by ID", description = "Returns a user by its unique ID")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id) {
        User user = userService.getById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(userMapper.toDto(user));
        }
    }

    @PostMapping
    @Operation(summary = "Create new user", description = "Adds a new user to the system")
    public ResponseEntity addUser(@Valid @RequestBody UserDto userDto) {
        log.info("Creating new user ID = " + userDto.getDisplayname());
        User user = userMapper.toEntity(userDto);
        User saved = userService.addUser(user);
        return ResponseEntity
                .created(URI.create("/api/v1/users/" + saved.getId()))
                .body(userMapper.toDto(saved));
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

        if (userDto.getDepartmentId() != null) {
            Department dept = departmentService.getById(userDto.getDepartmentId());
            user.setDepartment(dept);
        }
        if (userDto.getPositionId() != null) {
            Position pos = positionService.getById(userDto.getPositionId());
            user.setPosition(pos);
        }
        if (userDto.getRoleId() != null) {
            Role role = roleService.getById(userDto.getRoleId());
            user.setRole(role);
        }

        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setAge(userDto.getAge());
        user.setMan(userDto.getIsMan());
        user.setPictureSet(userDto.getIsPictureSet());
        user.setAddress(userDto.getAddress());
        user.setUpdatedAt(LocalDateTime.now());

        User updated = userService.updateUser(user);

        return ResponseEntity.ok(userMapper.toDto(updated));
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

    @DeleteMapping("/ids-delete")
    @Operation(summary = "Delete multiple users", description = "Deletes users by a list of IDs")
    public ResponseEntity<?> deleteUsers(@RequestBody List<Long> ids) {
        log.info("Deleting Users IDs: " + ids);

        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().body("ID list is empty");
        }

        try {
            userService.deleteUsersByIds(ids);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            //log.error("Error deleting departments: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}

