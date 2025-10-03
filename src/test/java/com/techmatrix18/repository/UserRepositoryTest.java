package com.techmatrix18.repository;

import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private PositionRepository positionRepository;

    private User user;
    private User savedUser;

    @BeforeEach
    void setUp() {
        Role role = roleRepository.save(new Role("Admin"));
        Department dept = departmentRepository.save(new Department("IT"));
        Position pos = positionRepository.save(new Position("Developer"));

        savedUser = new User();
        savedUser.setUsername("John Connor");
        savedUser.setFirstname("John");
        savedUser.setLastname("Connor");
        savedUser.setEmail("john.connor@example.com");
        savedUser.setMan(true);
        savedUser.setRole(role);
        savedUser.setDepartment(dept);
        savedUser.setPosition(pos);
        savedUser.setCreatedAt(LocalDateTime.now());
        savedUser.setUpdatedAt(LocalDateTime.now());

        savedUser = userRepository.save(savedUser); // ✅ присваиваем
    }

    @Test
    void testSaveUser() {
        assertThat(savedUser.getId()).isNotNull();
        assertThat(savedUser.getUsername()).isEqualTo("John Connor");
        assertThat(savedUser.getEmail()).isEqualTo("john.connor@example.com");
    }

    /*@Test
    void testSave2User() {

        User found = userRepository.findById(savedUser.getId()).orElseThrow();

        assertThat(found)
            .extracting(User::getUsername, User::getEmail)
            .containsExactly("username1", "makklays@gmail.com");
    }*/

    @AfterEach
    void tearDown() {
        userRepository.deleteAll();
    }
}
