package com.techmatrix18.service;

import com.techmatrix18.model.User;
import com.techmatrix18.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Custom user service for Flowable
 * Works with my users table, not FLW_ID_USER
 *
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class CustomIdentityService {

    private final UserRepository userRepository;

    public CustomIdentityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Find a user by ID
     */
    public User findById(String userId) {
        try {
            Long id = Long.valueOf(userId);
            return userRepository.findById(id).orElse(null);
        } catch (NumberFormatException e) {
            return null;
        }
    }

    /**
     * Get all users
     */
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * Get all users by ID list
     */
    public List<User> findAllByIds(List<String> ids) {
        return ids.stream()
                .map(this::findById)
                .filter(u -> u != null)
                .collect(Collectors.toList());
    }

    /**
     * Additional methods if needed
     */
    public String getDisplayName(String userId) {
        User user = findById(userId);
        return user != null ? user.getFirstname() + " " + user.getLastname() : null;
    }
}

