package com.techmatrix18.service;

import com.techmatrix18.dto.UserDto;
import com.techmatrix18.model.User;
import com.techmatrix18.repository.UserRepository;
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
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Find a user by id
     *
     * @param id User ID
     * @return found user
     * @throws EntityNotFoundException if the user is not found
     */
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("The user didn't find"));
    }

    /**
     * Finds all users
     *
     * @return found all users
     */
    public List<User> getAll() {
        return userRepository.findAll();
    }

    /**
     * Finds all roles by pages
     *
     * @param page
     * @param size
     * @return
     */
    public Page<User> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return userRepository.findAll(pageable);
    }

    public UserDto getByIdDto(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return mapToDto(user);
    }

    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setDisplayname(user.getDisplayname());
        dto.setDepartment(user.getDepartment());
        dto.setPosition(user.getPosition());
        dto.setRole(user.getRole());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setIsMan(user.getMan());
        dto.setIsPictureSet(user.getPictureSet());
        dto.setAge(user.getAge());
        dto.setAddress(user.getAddress());
        return dto;
    }

    /**
     * Finds a user by username.
     *
     * @param username
     * @return
     */
    public User findUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.get().getId() != null) {
            return user.get();
        } else {
            throw(new NoSuchElementException("User with the username '" + username + "' not found"));
        }
    }

    /**
     * Finds a user by email.
     *
     * @param email User email
     * @return found user
     * @throws NoSuchElementException if the user is not found
     */
    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.get().getId() != null) {
            return user.get();
        } else {
            throw(new NoSuchElementException("User with the email '" + email + "' not found"));
        }
    }

    /**
     * Finds a user by phone.
     *
     * @param phone User mobile
     * @return found user
     * @throws NoSuchElementException if the user is not found
     */
    public User findUserByPhone(String phone) {
        Optional<User> user = userRepository.findByPhone(phone);
        if (user.get().getId() != null) {
            return user.get();
        } else {
            throw(new NoSuchElementException("User with the phone '" + phone + "' not found"));
        }
    }

    /**
     * Finds users by part phone
     *
     * @return found users
     */
    public List<User> getUsersByPartPhone(String phone) {
        return userRepository.findByPartPhone(phone);
    }

    /**
     * Finds users by part email
     *
     * @return found users
     */
    public List<User> getUsersByPartEmail(String email) {
        return userRepository.findByPartEmail(email);
    }

    /**
     * Finds users by part username
     *
     * @return found users
     */
    public List<User> getUsersByPartUsername(String username) {
        return userRepository.findByPartUsername(username);
    }

    /**
     * Add User
     *
     * @return boolean
     */
    public boolean addUser(User user) {
        User b = userRepository.save(user);
        if (!b.getUsername().isEmpty()) {
            // add event to publisher
            //applicationEventPublisher.publishEvent(new UserRegisteredEvent(user.getEmail()));
            return true;
        } else {
            return false;
        }
    }

    /**
     * Edit User
     *
     * @return boolean
     */
    public boolean updateUser(User user) {
        User b = userRepository.save(user);
        if (!b.getUsername().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delete User by UserID
     *
     * @return boolean
     */
    public boolean deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.get().getId() != null) {
            userRepository.delete(user.get());
            return true;
        } else {
            return false;
        }
    }
}

