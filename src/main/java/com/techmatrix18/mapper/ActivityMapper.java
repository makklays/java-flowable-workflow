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
        /*ActivityDto dto = new ActivityDto();
        dto.setId(activity.getId());
        dto.setClient(activity.getClient());
        dto.setContact(activity.getContact());
        dto.setType(activity.getType());
        dto.setTitle(activity.getTitle());
        dto.setDescription(activity.getDescription());
        dto.setStatus(activity.getStatus());
        dto.setDateTime(String.valueOf(activity.getDateTime()));*/

        ActivityDto dto = new ActivityDto.Builder()
                .id(activity.getId())
                .title(activity.getTitle())
                .client(activity.getClient())
                .contact(activity.getContact())
                .type(activity.getType())
                .description(activity.getDescription())
                .dateTime(String.valueOf(activity.getDateTime()))
                .status(activity.getStatus())
                .build();
        return dto;
    }

    public static List<ActivityDto> toDtoList (List<Activity> activities) {
        return activities.stream().map(activity -> ActivityMapper.toDto(activity)).collect(Collectors.toList());
    }

    public static Activity toEntity(ActivityDto activityDto) {
        /*Activity activity = new Activity();
        activity.setId(activityDto.getId());
        activity.setTitle(activityDto.getTitle());
        activity.setDescription(activityDto.getDescription());
        activity.setClient(activityDto.getClient());
        activity.setContact(activityDto.getContact());
        activity.setType(activityDto.getType());
        activity.setStatus(activityDto.getStatus());
        activity.setDateTime(LocalDateTime.parse(activityDto.getDateTime()));*/

        Activity activity = new Activity.Builder()
                .id(activityDto.getId())
                .title(activityDto.getTitle())
                .description(activityDto.getDescription())
                .client(activityDto.getClient())
                .contact(activityDto.getContact())
                .type(activityDto.getType())
                .status(activityDto.getStatus())
                .dateTime(LocalDateTime.parse(activityDto.getDateTime()))
                .build();
        return activity;
    }
}

