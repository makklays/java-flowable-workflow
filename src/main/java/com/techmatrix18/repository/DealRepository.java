package com.techmatrix18.repository;

import com.techmatrix18.enums.DealStage;
import com.techmatrix18.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
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

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {

    Optional<Deal> findById(Long id);

    List<Deal> findAll();

    List<Deal> findByName(String name);

    List<Deal> findByAmount(BigDecimal amount);

    List<Deal> findByCurrency(String currency);

    List<Deal> findByStage(DealStage stage);

    List<Deal> findByCurrencyAndStage(String currency, DealStage stage);

    List<Deal> findByAmountGreaterThan(BigDecimal amount);

    List<Deal> findByAmountBetween(BigDecimal min, BigDecimal max);

    // поиск по конкретной дате начала
    List<Deal> findByStartDate(LocalDate startDate);

    // поиск по конкретной дате закрытия
    List<Deal> findByCloseDate(LocalDate closeDate);

    // все сделки, начатые после определённой даты
    List<Deal> findByStartDateAfter(LocalDate date);

    // все сделки, начатые до определённой даты
    List<Deal> findByStartDateBefore(LocalDate date);

    // сделки, закрытые в определённом диапазоне
    List<Deal> findByCloseDateBetween(LocalDate start, LocalDate end);

    // сделки, у которых дата закрытия отсутствует (ещё активные)
    List<Deal> findByCloseDateIsNull();

    // сделки, у которых дата закрытия есть (завершённые)
    List<Deal> findByCloseDateIsNotNull();

    List<Deal> findByOwnerId(Long ownerId);

    List<Deal> findByOwnerIdAndStage(Long ownerId, DealStage stage);

    List<Deal> findByOwnerIdAndCloseDateIsNull(Long ownerId); // активные сделки
}

