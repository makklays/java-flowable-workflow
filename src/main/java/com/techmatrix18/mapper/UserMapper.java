package com.techmatrix18.mapper;

import com.techmatrix18.dto.UserDto;
import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.User;
import com.techmatrix18.service.DepartmentService;
import com.techmatrix18.service.PositionService;
import com.techmatrix18.service.RoleService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Component
public class UserMapper {

    private final DepartmentService departmentService;
    private final PositionService positionService;
    private final RoleService roleService;

    public UserMapper(DepartmentService departmentService, PositionService positionService, RoleService roleService) {
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.roleService = roleService;
    }

    public UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setDisplayname(user.getDisplayname());
        if (user.getDepartment() != null) {
            dto.setDepartmentId(user.getDepartment().getId());
            dto.setDepartmentName(user.getDepartment().getTitle());
        }
        if (user.getPosition() != null) {
            dto.setPositionId(user.getPosition().getId());
            dto.setPositionName(user.getPosition().getTitle());
        }
        if (user.getRole() != null) {
            dto.setRoleId(user.getRole().getId());
            dto.setRoleName(user.getRole().getTitle());
        }
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAge(user.getAge());
        dto.setIsMan(user.getMan());
        dto.setIsPictureSet(user.getPictureSet());
        dto.setAddress(user.getAddress());

        return dto;
    }

    public List<UserDto> toDtoList(List<User> users) {
        return users.stream()
                .map(this::toDto)
                .toList();
    }

    public User toEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        user.setDisplayname(userDto.getDisplayname());

        if (userDto.getDepartmentId() != null) {
            Department department = departmentService.getById(userDto.getDepartmentId());
            user.setDepartment(department);
        }

        if (userDto.getPositionId() != null) {
            Position position = positionService.getById(userDto.getPositionId());
            user.setPosition(position);
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

        return user;
    }
}

