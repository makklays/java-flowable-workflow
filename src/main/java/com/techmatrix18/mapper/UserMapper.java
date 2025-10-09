package com.techmatrix18.mapper;

import com.techmatrix18.dto.UserDto;
import com.techmatrix18.model.User;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class UserMapper {

    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setDisplayname(user.getDisplayname());
        dto.setRole(user.getRole());
        dto.setDepartment(user.getDepartment());
        dto.setPosition(user.getPosition());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAge(user.getAge());
        dto.setIsMan(user.getMan());
        dto.setIsPictureSet(user.getPictureSet());
        dto.setAddress(user.getAddress());
        return dto;
    }

    public static List<UserDto> toDtoList(List<User> users) {
        return users.stream().map(user -> UserMapper.toDto(user)).collect(Collectors.toList());
    }

    public static User toEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
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
        return user;
    }
}

