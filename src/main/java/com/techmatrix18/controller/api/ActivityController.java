package com.techmatrix18.controller.api;

import com.techmatrix18.dto.ActivityDto;
import com.techmatrix18.mapper.ActivityMapper;
import com.techmatrix18.model.Activity;
import com.techmatrix18.service.ActivityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

/**
 * Controller for registering activities in the system.
 * Processes HTTP-requests, related to activity.
 *
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Activities", description = "Activity management API")
@RequestMapping("/api/v1/activities")
public class ActivityController {

    private ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    private static final Logger log = Logger.getLogger(ActivityController.class.getName());

    @GetMapping
    @Operation(summary = "Get all activities", description = "Returns list of all activities")
    public ResponseEntity<List<ActivityDto>> getAllActivities() {
        log.info("Fetching all activities");
        List<Activity> activities = activityService.getAll();
        return ResponseEntity.ok(ActivityMapper.toDtoList(activities));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get activity by ID", description = "Returns a activity by its unique ID")
    public ResponseEntity<ActivityDto> getActivity(@PathVariable Long id) {
        log.info("Fetching activity with ID = " + id);
        Optional<Activity> activity = activityService.getById(id);
        if (activity.isPresent()) {
            return ResponseEntity.ok(ActivityMapper.toDto(activity.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new activity", description = "Adds a new activity to the system")
    public ResponseEntity addActivity(@Valid @RequestBody ActivityDto activityDto) {
        log.info("Creating new activity Title = " + activityDto.getTitle());
        Activity activity = ActivityMapper.toEntity(activityDto);
        Activity saved = activityService.saveActivity(activity);
        return ResponseEntity
                .created(URI.create("/api/v1/activities/" + saved.getId()))
                .body(ActivityMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing activity by ID", description = "Updates data for an existing activity by ID")
    public ResponseEntity updateActivity(@PathVariable Long id, @Valid @RequestBody ActivityDto activityDto) {
        Optional<Activity> exist = activityService.getById(id);
        if (exist.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        log.info("Updating activity with ID + " + id);

        Activity activity = exist.get();
        activity.setClient(activityDto.getClient());
        activity.setContact(activityDto.getContact());
        activity.setTitle(activityDto.getTitle());
        activity.setType(activityDto.getType());
        activity.setDescription(activityDto.getDescription());
        activity.setDateTime(LocalDateTime.parse(activityDto.getDateTime()));
        activity.setStatus(activityDto.getStatus());
        activity.setUpdatedAt(LocalDateTime.now());
        Activity updated = activityService.saveActivity(activity);

        return ResponseEntity.ok(ActivityMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete activity by ID", description = "Deletes a activity by ID")
    public ResponseEntity deleteActivity(@PathVariable Long id) {
        log.info("Deleting activity with ID = " + id);
        if (activityService.getById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        activityService.deleteActivity(id);
        return ResponseEntity.noContent().build();
    }
}

