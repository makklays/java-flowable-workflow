package com.techmatrix18.mapper;

import com.techmatrix18.dto.RoleDto;
import com.techmatrix18.model.Role;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class RoleMapper {

    public static RoleDto toDto (Role role) {
        RoleDto dto = new RoleDto();
        dto.setId(role.getId());
        dto.setTitle(role.getTitle());
        dto.setDescription(role.getDescription());
        return dto;
    }

    public static List<RoleDto> toDtoList(List<Role> roles) {
        return roles.stream().map(role -> RoleMapper.toDto(role)).collect(Collectors.toList());
    }

    public static Role toEntity(RoleDto roleDto) {
        Role role = new Role();
        role.setId(roleDto.getId());
        role.setTitle(roleDto.getTitle());
        role.setDescription(roleDto.getDescription());
        return role;
    }
}

