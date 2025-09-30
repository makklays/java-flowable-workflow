package com.techmatrix18.repository;

import com.techmatrix18.Main;
import com.techmatrix18.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveUser() {
        User user = new User();
        user.setUsername("username1");
        user.setEmail("makklays@gmail.com");
        User saved = userRepository.save(user);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getUsername()).isEqualTo("username1");
        assertThat(saved.getEmail()).isEqualTo("makklays@gmail.com");
    }

    @Test
    void testSave2User() {
        User user = new User();
        user.setUsername("username1");
        user.setEmail("makklays@gmail.com");

        User saved = userRepository.save(user);
        User found = userRepository.findById(saved.getId()).orElseThrow();

        assertThat(found)
            .extracting(User::getUsername, User::getEmail)
            .containsExactly("username1", "makklays@gmail.com");
    }
}
