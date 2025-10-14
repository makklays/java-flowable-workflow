package com.techmatrix18.controller.web;

import com.techmatrix18.dto.UserDto;
import com.techmatrix18.model.User;
import com.techmatrix18.service.DepartmentService;
import com.techmatrix18.service.PositionService;
import com.techmatrix18.service.RoleService;
import com.techmatrix18.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.logging.Logger;

/**
 * User controller with endpoints for user pages
 *
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class UserViewController {

    Logger log = Logger.getLogger(UserViewController.class.getName());

    private final UserService userService;
    private final DepartmentService departmentService;
    private final PositionService positionService;
    private final RoleService roleService;

    public UserViewController(UserService userService,
                              DepartmentService departmentService,
                              PositionService positionService,
                              RoleService roleService) {
        this.userService = userService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.roleService = roleService;
    }

    @GetMapping("/welcome")
    public String welcome(Model model, HttpSession session) {
        // get session
        Long userId = (Long) session.getAttribute("userId");
        log.info("---------- user ID--------------> " + userId);
        return "welcome";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }

    @GetMapping("/panel")
    public String panel(Model model) {
        return "panel";
    }

    @GetMapping("/home")
    public String home(Model model) {
        return "home";
    }

    //-------

    @GetMapping("/users")
    public String getAllUsers(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              Model model) {
        Page<User> usersPage = userService.getAllPaginated(page, size);
        model.addAttribute("usersPage", usersPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", usersPage.getTotalPages());
        return "users/index";
    }

    @GetMapping("/users/add")
    public String addUser(Model model) {
        model.addAttribute("userDto", new UserDto()); // empty form
        model.addAttribute("departments", departmentService.getAll());
        model.addAttribute("positions", positionService.getAll());
        model.addAttribute("roles", roleService.getAll());
        return "users/add";
    }

    @PostMapping("/users/add")
    public String addUserPost(@Valid @ModelAttribute("userDto") UserDto userDto,
                              BindingResult result,
                              Model model,
                              RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "users/add"; // return form with errors
        }

        // Mapping DTO → Entity
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setDisplayname(userDto.getDisplayname());
        user.setDepartment(userDto.getDepartment());
        user.setPosition(userDto.getPosition());
        user.setRole(userDto.getRole());
        user.setTenantId("1");
        user.setPhone(userDto.getPhone());
        user.setEmail(userDto.getEmail());
        user.setAge(userDto.getAge());
        user.setMan(userDto.getIsMan());
        user.setPictureSet(userDto.getIsPictureSet());
        user.setAddress(userDto.getAddress());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode("admin"));
        user.setStartWorkAt(LocalDate.now());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // save User in database
        userService.addUser(user);
        redirectAttributes.addFlashAttribute("successMessage", "User was successfully added!");
        return "redirect:/users";
    }

    @GetMapping("/users/edit/{id}")
    public String editUser(@PathVariable Long id, Model model) {
        UserDto userDto = userService.getByIdDto(id);
        model.addAttribute("userDto", userDto);
        model.addAttribute("departments", departmentService.getAll());
        model.addAttribute("positions", positionService.getAll());
        model.addAttribute("roles", roleService.getAll());
        return "users/edit";
    }

    @PostMapping("/users/edit")
    public String editUserPost(@Valid @ModelAttribute("userDto") UserDto userDto,
                               BindingResult result,
                               Model model,
                               RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "users/edit"; // return form with errors
        }

        // Mapping DTO → Entity
        User user = userService.getById(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setDisplayname(userDto.getDisplayname());
        user.setDepartment(userDto.getDepartment());
        user.setPosition(userDto.getPosition());
        user.setRole(userDto.getRole());
        user.setTenantId("1");
        user.setPhone(userDto.getPhone());
        user.setEmail(userDto.getEmail());
        user.setAge(userDto.getAge());
        user.setMan(userDto.getIsMan());
        user.setPictureSet(userDto.getIsPictureSet());
        user.setAddress(userDto.getAddress());
        user.setUpdatedAt(LocalDateTime.now());

        userService.updateUser(user); // update entity
        redirectAttributes.addFlashAttribute("successMessage", "User was successfully updated!");
        return "redirect:/users";
    }

    @GetMapping("/users/view/{id}")
    public String viewUser(@PathVariable Long id, Model model) {
        User user = userService.getById(id);
        model.addAttribute("user", user);
        return "users/view";
    }

    @GetMapping("/users/delete/{id}")
    public String deleteUser(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        userService.deleteUser(id);
        redirectAttributes.addFlashAttribute("successMessage", "User was successfully deleted!");
        return "redirect:/users";
    }
}

