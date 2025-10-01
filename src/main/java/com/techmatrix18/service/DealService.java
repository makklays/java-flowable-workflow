package com.techmatrix18.service;

import com.techmatrix18.enums.DealStage;
import com.techmatrix18.model.Deal;
import com.techmatrix18.repository.DealRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * @author Alexander Kuziv
 * @since 01.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
@Transactional
public class DealService {

    private final DealRepository dealRepository;

    public DealService(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    // Get all deals
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // Find deal by ID
    public Optional<Deal> getDealById(Long id) {
        return dealRepository.findById(id);
    }

    // Find deal by name
    public List<Deal> getDealsByName(String name) {
        return dealRepository.findByName(name);
    }

    // Find deal by amount
    public List<Deal> getDealsByAmount(BigDecimal amount) {
        return dealRepository.findByAmount(amount);
    }

    // Find deal by currency
    public List<Deal> getDealsByCurrency(String currency) {
        return dealRepository.findByCurrency(currency);
    }

    // Find deal by stage
    public List<Deal> getDealsByStage(DealStage stage) {
        return dealRepository.findByStage(stage);
    }

    // Find deal by currency and stage
    public List<Deal> getDealsByCurrencyAndStage(String currency, DealStage stage) {
        return dealRepository.findByCurrencyAndStage(currency, stage);
    }

    // Deals with amount more specified
    public List<Deal> getDealsByAmountGreaterThan(BigDecimal amount) {
        return dealRepository.findByAmountGreaterThan(amount);
    }

    // Deals with amount in range
    public List<Deal> getDealsByAmountBetween(BigDecimal min, BigDecimal max) {
        return dealRepository.findByAmountBetween(min, max);
    }

    // Find by dates
    public List<Deal> getDealsByStartDate(LocalDate startDate) {
        return dealRepository.findByStartDate(startDate);
    }

    public List<Deal> getDealsByCloseDate(LocalDate closeDate) {
        return dealRepository.findByCloseDate(closeDate);
    }

    public List<Deal> getDealsStartedAfter(LocalDate date) {
        return dealRepository.findByStartDateAfter(date);
    }

    public List<Deal> getDealsStartedBefore(LocalDate date) {
        return dealRepository.findByStartDateBefore(date);
    }

    public List<Deal> getDealsClosedBetween(LocalDate start, LocalDate end) {
        return dealRepository.findByCloseDateBetween(start, end);
    }

    public List<Deal> getActiveDeals() {
        return dealRepository.findByCloseDateIsNull();
    }

    public List<Deal> getClosedDeals() {
        return dealRepository.findByCloseDateIsNotNull();
    }

    // Deals by owner
    public List<Deal> getDealsByOwnerId(Long ownerId) {
        return dealRepository.findByOwnerId(ownerId);
    }

    public List<Deal> getDealsByOwnerIdAndStage(Long ownerId, DealStage stage) {
        return dealRepository.findByOwnerIdAndStage(ownerId, stage);
    }

    public List<Deal> getActiveDealsByOwner(Long ownerId) {
        return dealRepository.findByOwnerIdAndCloseDateIsNull(ownerId);
    }

    // Save or update deals
    public Deal saveDeal(Deal deal) {
        return dealRepository.save(deal);
    }

    // Delete deals by ID
    public void deleteDeal(Long id) {
        dealRepository.deleteById(id);
    }
}

