package com.techmatrix18.service;

import com.techmatrix18.dto.DepartmentDto;
import com.techmatrix18.dto.RoleDto;
import com.techmatrix18.model.Department;
import com.techmatrix18.model.Role;
import com.techmatrix18.repository.DepartmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

/**
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class DepartmentService {
    private DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    /**
     * Find a department by id
     *
     * @param id Department ID
     * @return found department
     * @throws EntityNotFoundException if the department is not found
     */
    public Department getById(Long id) {
        return departmentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("The department didn't find"));
    }

    /**
     * Finds all departments
     *
     * @return found all departments
     */
    public List<Department> getAll() {
        return departmentRepository.findAll();
    }

    /**
     * Finds all departments by pages
     *
     * @param page
     * @param size
     * @return
     */
    public Page<Department> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return departmentRepository.findAll(pageable);
    }

    public DepartmentDto getByIdDto(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        return mapToDto(department);
    }

    private DepartmentDto mapToDto(Department department) {
        DepartmentDto dto = new DepartmentDto();
        dto.setId(department.getId());
        dto.setTitle(department.getTitle());
        dto.setDescription(department.getDescription());
        return dto;
    }

    /**
     * Finds a department by title.
     *
     * @param title
     * @return
     */
    public Department findDepartmentByTitle(String title) {
        Optional<Department> department = departmentRepository.findByTitle(title);
        if (department.get().getId() != null) {
            return department.get();
        } else {
            throw(new NoSuchElementException("Department with the title '" + title + "' not found"));
        }
    }

    /**
     * Add Department
     *
     * @return boolean
     */
    public boolean addDepartment(Department department) {
        Department b = departmentRepository.save(department);
        if (!b.getTitle().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Edit Department
     *
     * @return boolean
     */
    public boolean updateDepartment(Department department) {
        Department b = departmentRepository.save(department);
        if (!b.getTitle().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delete Department by DepartmentID
     *
     * @return boolean
     */
    public boolean deleteDepartment(Long id) {
        Optional<Department> department = departmentRepository.findById(id);
        if (department.get().getId() != null) {
            departmentRepository.delete(department.get());
            return true;
        } else {
            return false;
        }
    }
}

