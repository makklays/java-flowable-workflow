package com.techmatrix18.mapper;

import com.techmatrix18.dto.ActivityDto;
import com.techmatrix18.model.Activity;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class ActivityMapper {

    public static ActivityDto toDto (Activity activity) {
        ActivityDto dto = new ActivityDto();
        dto.setId(activity.getId());
        dto.setClient(activity.getClient());
        dto.setContact(activity.getContact());
        dto.setType(activity.getType());
        dto.setTitle(activity.getTitle());
        dto.setDescription(activity.getDescription());
        dto.setStatus(activity.getStatus());
        dto.setDateTime(String.valueOf(activity.getDateTime()));
        return dto;
    }

    public static List<ActivityDto> toDtoList (List<Activity> activities) {
        return activities.stream().map(activity -> ActivityMapper.toDto(activity)).collect(Collectors.toList());
    }

    public static Activity toEntity(ActivityDto activityDto) {
        Activity activity = new Activity();
        activity.setId(activityDto.getId());
        activity.setTitle(activityDto.getTitle());
        activity.setDescription(activityDto.getDescription());
        activity.setClient(activityDto.getClient());
        activity.setContact(activityDto.getContact());
        activity.setType(activityDto.getType());
        activity.setStatus(activityDto.getStatus());
        activity.setDateTime(LocalDateTime.parse(activityDto.getDateTime()));
        return activity;
    }
}

