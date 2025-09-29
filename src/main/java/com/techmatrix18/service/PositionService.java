package com.techmatrix18.service;

import com.techmatrix18.model.Position;
import com.techmatrix18.repository.PositionRepository;
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
public class PositionService {
    private PositionRepository positionRepository;

    public PositionService(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    /**
     * Find a position by id
     *
     * @param id Position ID
     * @return found position
     * @throws EntityNotFoundException if the position is not found
     */
    public Position getById(Long id) {
        return positionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("The position didn't find"));
    }

    /**
     * Finds all positions
     *
     * @return found all positions
     */
    public List<Position> getAll() {
        return positionRepository.findAll();
    }

    /**
     * Finds a position by title.
     *
     * @param title
     * @return
     */
    public Position findPositionByTitle(String title) {
        Optional<Position> position = positionRepository.findByTitle(title);
        if (position.get().getId() != null) {
            return position.get();
        } else {
            throw(new NoSuchElementException("Position with the title '" + title + "' not found"));
        }
    }

    /**
     * Add Position
     *
     * @return boolean
     */
    public boolean addPosition(Position position) {
        Position b = positionRepository.save(position);
        if (!b.getTitle().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Edit Position
     *
     * @return boolean
     */
    public boolean updatePosition(Position position) {
        Position b = positionRepository.save(position);
        if (!b.getTitle().isEmpty()) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delete Position by PositionID
     *
     * @return boolean
     */
    public boolean deletePosition(Long id) {
        Optional<Position> position = positionRepository.findById(id);
        if (position.get().getId() != null) {
            positionRepository.delete(position.get());
            return true;
        } else {
            return false;
        }
    }
}

