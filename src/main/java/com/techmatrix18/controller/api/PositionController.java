package com.techmatrix18.controller.api;

import com.techmatrix18.dto.PositionDto;
import com.techmatrix18.mapper.PositionMapper;
import com.techmatrix18.model.Position;
import com.techmatrix18.service.PositionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

/**
 * Controller for registering positions in the system.
 * Processes HTTP-requests, related to position.
 *
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Positions", description = "Position management API")
@RequestMapping("/api/v1/positions")
public class PositionController {

    private PositionService positionService;

    public PositionController(PositionService positionService) {
        this.positionService = positionService;
    }

    private static final Logger log = Logger.getLogger(PositionController.class.getName());

    @GetMapping
    @Operation(summary = "Get all positions", description = "Returns list of all positions")
    public ResponseEntity<List<PositionDto>> getAll() {
        log.info("Fetching all positions");
        List<Position> positions = positionService.getAll();
        return ResponseEntity.ok(PositionMapper.toDtoList(positions));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get position by ID", description = "Returns a position by its unique ID")
    public ResponseEntity<PositionDto> getPosition(@PathVariable Long id) {
        log.info("Fetching position with ID = " + id);
        Position position = positionService.getById(id);
        if (position == null) {
            return ResponseEntity.ok(PositionMapper.toDto(position));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new position", description = "Adds a new position to the system")
    public ResponseEntity addPosition(@Valid @RequestBody PositionDto positionDto) {
        log.info("Creating new position name = " + positionDto.getTitle());
        Position position = PositionMapper.toEntity(positionDto);

        boolean added = positionService.addPosition(position);
        if (added) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Position successfully added");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add position");
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing position by ID", description = "Updates data for an existing position by ID")
    public ResponseEntity updatePosition(@PathVariable Long id, @Valid @RequestBody PositionDto positionDto) {
        Position position = positionService.getById(id);
        if (position == null) {
            return ResponseEntity.notFound().build();
        }
        log.info("Updating position with ID + " + id);

        position.setTitle(positionDto.getTitle());
        position.setUpdatedAt(LocalDateTime.now());

        boolean updated = positionService.updatePosition(position);
        if (updated) {
            return ResponseEntity.status(HttpStatus.OK).body("Position successfully updated");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update position");
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete position by ID", description = "Deletes a position by ID")
    public ResponseEntity deletePosition(@PathVariable Long id) {
        log.info("Deleting position with ID = " + id);
        if (positionService.getById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        positionService.deletePosition(id);
        return ResponseEntity.noContent().build();
    }
}

