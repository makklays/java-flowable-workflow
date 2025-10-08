package com.techmatrix18.controller.web;

import com.techmatrix18.dto.ActivityDto;
import com.techmatrix18.model.Activity;
import com.techmatrix18.model.User;
import com.techmatrix18.model.enums.ActivityStatus;
import com.techmatrix18.model.enums.ActivityType;
import com.techmatrix18.service.ActivityService;
import com.techmatrix18.service.ClientService;
import com.techmatrix18.service.ContactService;
import com.techmatrix18.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.logging.Logger;

/**
 * Activity controller with endpoints for activities pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class ActivityViewController {

    Logger log = Logger.getLogger(ClientViewController.class.getName());

    private final ActivityService activityService;
    private final ContactService contactService;
    private final ClientService clientService;
    private final UserService userService;

    public ActivityViewController(ActivityService activityService,
                                  ContactService contactService,
                                  ClientService clientService,
                                  UserService userService) {
        this.activityService = activityService;
        this.contactService = contactService;
        this.clientService = clientService;
        this.userService = userService;
    }

    @GetMapping("/activities")
    public String getAllActivities(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size,
                                Model model) {

        Page<Activity> activitiesPage = activityService.getAllPaginated(page, size);
        model.addAttribute("activitiesPage", activitiesPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", activitiesPage.getTotalPages());

        return "activities/index";
    }

    @GetMapping("/activities/add")
    public String addActivity(Model model) {
        model.addAttribute("activityDto", new ActivityDto()); // empty form
        model.addAttribute("types", Arrays.asList(ActivityType.values()));
        model.addAttribute("statuses", Arrays.asList(ActivityStatus.values()));
        model.addAttribute("clients", clientService.getAll());
        model.addAttribute("contacts", contactService.getAll());
        return "activities/add";
    }

    @PostMapping("/activities/add")
    public String addActivityPost(@Valid @ModelAttribute("activityDto") ActivityDto activityDto,
                                BindingResult result,
                                Model model,
                                RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "activities/add"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Activity activity = new Activity();
        activity.setClient(activityDto.getClient());
        activity.setContact(activityDto.getContact());
        activity.setTitle(activityDto.getTitle());
        activity.setType(activityDto.getType());
        activity.setDescription(activityDto.getDescription());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        activity.setDateTime(LocalDateTime.parse(activityDto.getDateTime(), formatter));
        activity.setStatus(activityDto.getStatus());
        activity.setOwner(user);
        activity.setCreatedAt(LocalDateTime.now());
        activity.setUpdatedAt(LocalDateTime.now());

        // save Client in database
        activityService.saveActivity(activity);
        redirectAttributes.addFlashAttribute("successMessage", "Activity was successfully added!");

        return "redirect:/activities";
    }

    @GetMapping("/activities/edit/{id}")
    public String editActivity(@PathVariable Long id, Model model) {
        ActivityDto activityDto = activityService.getByIdDto(id);
        model.addAttribute("activityDto", activityDto);
        model.addAttribute("types", Arrays.asList(ActivityType.values()));
        model.addAttribute("statuses", Arrays.asList(ActivityStatus.values()));
        model.addAttribute("clients", clientService.getAll());
        model.addAttribute("contacts", contactService.getAll());
        return "activities/edit";
    }

    @PostMapping("/activities/edit")
    public String editActivityPost(@Valid @ModelAttribute("activityDto") ActivityDto activityDto,
                                 BindingResult result,
                                 Model model,
                                 RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            model.addAttribute("types", Arrays.asList(ActivityType.values()));
            model.addAttribute("statuses", Arrays.asList(ActivityStatus.values()));
            model.addAttribute("clients", clientService.getAll());
            model.addAttribute("contacts", contactService.getAll());
            return "activities/edit"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Activity activity = activityService.getById(activityDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Activity not found with id " + activityDto.getId()));
        activity.setClient(activityDto.getClient());
        activity.setContact(activityDto.getContact());
        activity.setTitle(activityDto.getTitle());
        activity.setType(activityDto.getType());
        activity.setDescription(activityDto.getDescription());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
        activity.setDateTime(LocalDateTime.parse(activityDto.getDateTime(), formatter));
        activity.setStatus(activityDto.getStatus());
        activity.setOwner(user);
        activity.setUpdatedAt(LocalDateTime.now());

        activityService.saveActivity(activity); // update entity

        redirectAttributes.addFlashAttribute("successMessage", "Activity was successfully updated!");
        return "redirect:/activities";
    }

    @GetMapping("/activities/view/{id}")
    public String viewActivity(@PathVariable Long id, Model model) {
        Activity activity = activityService.getById(id)
                .orElseThrow(() -> new EntityNotFoundException("Activity not found with id " + id));
        model.addAttribute("activity", activity);
        return "activities/view";
    }

    @GetMapping("/activities/delete/{id}")
    public String deleteActivity(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        activityService.deleteActivity(id);
        redirectAttributes.addFlashAttribute("successMessage", "Activity was successfully deleted!");
        return "redirect:/activities";
    }
}

