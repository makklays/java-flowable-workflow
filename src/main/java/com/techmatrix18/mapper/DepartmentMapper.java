package com.techmatrix18.mapper;

import com.techmatrix18.dto.DepartmentDto;
import com.techmatrix18.model.Department;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class DepartmentMapper {

    public static DepartmentDto toDto (Department department) {
        DepartmentDto dto = new DepartmentDto();
        dto.setId(department.getId());
        dto.setTitle(department.getTitle());
        dto.setDescription(department.getDescription());
        return dto;
    }

    public static List<DepartmentDto> toDtoList (List<Department> departments) {
        return departments.stream().map(department -> DepartmentMapper.toDto(department)).collect(Collectors.toList());
    }

    public static Department toEntity(DepartmentDto departmentDto) {
        Department department = new Department();
        department.setId(departmentDto.getId());
        department.setTitle(departmentDto.getTitle());
        department.setDescription(departmentDto.getDescription());
        return department;
    }
}

