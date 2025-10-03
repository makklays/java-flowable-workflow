package com.techmatrix18.repository;

import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User user;
    private User savedUser;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setUsername("username1");
        user.setEmail("makklays@gmail.com");
        user.setRole(new Role(1l, "ROLE_USER"));
        user.setDepartment(new Department(1l, "DEPARTMENT"));
        user.setPosition(new Position(1l, "POSITION"));
        user.setTenantId("1");
        user.setMan(true);
        user.setPictureSet(false);
        savedUser = userRepository.save(user);
    }

    @Test
    void testSaveUser() {


        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getUsername()).isEqualTo("username1");
        assertThat(savedUser.getEmail()).isEqualTo("makklays@gmail.com");
    }

    @Test
    void testSave2User() {

        User found = userRepository.findById(savedUser.getId()).orElseThrow();

        assertThat(found)
            .extracting(User::getUsername, User::getEmail)
            .containsExactly("username1", "makklays@gmail.com");
    }

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }
}
