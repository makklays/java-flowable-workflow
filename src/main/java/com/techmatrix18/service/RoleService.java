package com.techmatrix18.service;

import com.techmatrix18.model.Role;
import com.techmatrix18.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
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
public class RoleService {
    private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    /**
     * Find a role by id
     *
     * @param id Role ID
     * @return found role
     * @throws EntityNotFoundException if the role is not found
     */
    public Role getById(Long id) {
        return roleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("The role didn't find"));
    }

    /**
     * Finds all roles
     *
     * @return found all roles
     */
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    /**
     * Finds a role by title.
     *
     * @param title
     * @return
     */
    public Role findRoleByTitle(String title) {
        Optional<Role> role = roleRepository.findByTitle(title);
        if (role.get().getId() != null) {
            return role.get();
        } else {
            throw(new NoSuchElementException("Role with the title '" + title + "' not found"));
        }
    }

    /**
     * Add Role
     *
     * @return boolean
     */
    public boolean addRole(Role role) {
        Role b = roleRepository.save(role);
        if (!b.getTitle().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Edit Role
     *
     * @return boolean
     */
    public boolean updateRole(Role role) {
        Role b = roleRepository.save(role);
        if (!b.getTitle().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delete Role by RoleID
     *
     * @return boolean
     */
    public boolean deleteRole(Long id) {
        Optional<Role> role = roleRepository.findById(id);
        if (role.get().getId() != null) {
            roleRepository.delete(role.get());
            return true;
        } else {
            return false;
        }
    }
}

