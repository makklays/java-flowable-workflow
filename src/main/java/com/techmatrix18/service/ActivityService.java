package com.techmatrix18.service;

import com.techmatrix18.dto.ActivityDto;
import com.techmatrix18.dto.ClientDto;
import com.techmatrix18.model.Client;
import com.techmatrix18.model.enums.ActivityStatus;
import com.techmatrix18.model.Activity;
import com.techmatrix18.repository.ActivityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * @author Alexander Kuziv
 * @since 01.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
@Transactional
public class ActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    // Get all activities
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    // Find activity by ID
    public Optional<Activity> getById(Long id) {
        return activityRepository.findById(id);
    }

    /**
     * Finds all activities by pages
     *
     * @param page
     * @param size
     * @return
     */
    public Page<Activity> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return activityRepository.findAll(pageable);
    }

    public ActivityDto getByIdDto(Long id) {
        Activity activity = activityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity not found"));
        return mapToDto(activity);
    }

    private ActivityDto mapToDto(Activity activity) {
        ActivityDto dto = new ActivityDto();
        dto.setId(activity.getId());
        dto.setTitle(activity.getTitle());
        dto.setClient(activity.getClient());
        dto.setContact(activity.getContact());
        dto.setType(activity.getType());
        dto.setDescription(activity.getDescription());
        dto.setDateTime(String.valueOf(activity.getDateTime()));
        dto.setStatus(activity.getStatus());
        return dto;
    }

    // Find activities by title
    // -- no title field in Activity
//    public List<Activity> getActivitiesByTitle(String title) {
//        return activityRepository.findByTitle(title);
//    }

    // Find activities by part of title
//    public List<Activity> searchActivitiesByTitle(String title) {
//        return activityRepository.findByPartTitle(title);
//    } -- no title field in Activity

    // Find activities by owner (ownerId)
    public List<Activity> getActivitiesByOwnerId(Long ownerId) {
        return activityRepository.findByOwnerId(ownerId);
    }

    // Find activities by client and status
    public List<Activity> getActivitiesByClientIdAndStatus(Long clientId, ActivityStatus status) {
        return activityRepository.findByClientIdAndStatus(clientId, status);
    }

    // Save and update activity
    public Activity saveActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    // Delete activity
    public void deleteActivity(Long id) {
        activityRepository.deleteById(id);
    }
}

