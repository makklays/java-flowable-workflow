package com.techmatrix18.controller.api;

import com.techmatrix18.dto.DealDto;
import com.techmatrix18.mapper.DealMapper;
import com.techmatrix18.model.Deal;
import com.techmatrix18.service.DealService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

/**
 * Controller for registering deals in the system.
 * Processes HTTP-requests, related to deal.
 *
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Deals", description = "Deal management API")
@RequestMapping("/api/v1/deals")
public class DealController {

    private DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }

    private static final Logger log = Logger.getLogger(DealController.class.getName());

    @GetMapping
    @Operation(summary = "Get all deals", description = "Returns list of all deals")
    public ResponseEntity<List<DealDto>> getAll() {
        log.info("Fetching all deals");
        List<Deal> deals = dealService.getAll();
        return ResponseEntity.ok(DealMapper.toDtoList(deals));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get deal by ID", description = "Returns a deal by its unique ID")
    public ResponseEntity<DealDto> getDeal(@PathVariable Long id) {
        log.info("Fetching deal with ID = " + id);
        Optional<Deal> deal = dealService.getById(id);
        if (deal.isPresent()) {
            return ResponseEntity.ok(DealMapper.toDto(deal.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new deal", description = "Adds a new deal to the system")
    public ResponseEntity addDeal(@Valid @RequestBody DealDto dealDto) {
        log.info("Creating new deal name = " + dealDto.getName());
        Deal deal = DealMapper.toEntity(dealDto);
        Deal saved = dealService.saveDeal(deal);
        return ResponseEntity
                .created(URI.create("/api/v1/deals/" + saved.getId()))
                .body(DealMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing deal by ID", description = "Updates data for an existing deal by ID")
    public ResponseEntity updateDeal(@PathVariable Long id, @Valid @RequestBody DealDto dealDto) {
        Optional<Deal> exist = dealService.getById(id);
        if (exist.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        log.info("Updating deal with ID + " + id);

        Deal deal = exist.get();
        deal.setClient(dealDto.getClient());
        deal.setName(dealDto.getName());
        deal.setAmount(new BigDecimal(dealDto.getAmount()));
        deal.setCurrency(dealDto.getCurrency());
        deal.setStage(dealDto.getStage());
        deal.setStartDate(LocalDateTime.parse(dealDto.getStartDate()));
        deal.setCloseDate(LocalDateTime.parse(dealDto.getCloseDate()));
        deal.setUpdatedAt(LocalDateTime.now());
        Deal updated = dealService.saveDeal(deal);

        return ResponseEntity.ok(DealMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete deal by ID", description = "Deletes a deal by ID")
    public ResponseEntity deleteDeal(@PathVariable Long id) {
        log.info("Deleting deal with ID = " + id);
        if (dealService.getById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        dealService.deleteDeal(id);
        return ResponseEntity.noContent().build();
    }
}

