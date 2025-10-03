package com.techmatrix18.repository;

import com.techmatrix18.model.Position;
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
class PositionRepositoryTest {

    @Autowired
    private PositionRepository positionRepository;

    @Test
    void testSavePosition() {
        Position position = new Position(1L, "Painter");
        Position saved = positionRepository.save(position);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getTitle()).isEqualTo("Painter");
    }
}

