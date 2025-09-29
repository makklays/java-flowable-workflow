package com.techmatrix18.service;

import com.techmatrix18.model.User;
import com.techmatrix18.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Кастомный сервис пользователей для Flowable
 * Работает с моей таблицей users, а не FLW_ID_USER
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
     * Найти пользователя по ID
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
     * Получить всех пользователей
     */
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * Получить всех пользователей по списку ID
     */
    public List<User> findAllByIds(List<String> ids) {
        return ids.stream()
                .map(this::findById)
                .filter(u -> u != null)
                .collect(Collectors.toList());
    }

    /**
     * Дополнительные методы, если нужно
     */
    public String getDisplayName(String userId) {
        User user = findById(userId);
        return user != null ? user.getFirstname() + " " + user.getLastname() : null;
    }
}

