package com.techmatrix18.repository;

import com.techmatrix18.dto.DealInfoDto;
import com.techmatrix18.model.enums.DealStage;
import com.techmatrix18.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    // search by a specific start date
    List<Deal> findByStartDate(LocalDate startDate);

    // search by a specific closing date
    List<Deal> findByCloseDate(LocalDate closeDate);

    // all transactions started after a certain date
    List<Deal> findByStartDateAfter(LocalDate date);

    // all transactions started before a certain date
    List<Deal> findByStartDateBefore(LocalDate date);

    // trades closed within a certain range
    List<Deal> findByCloseDateBetween(LocalDate start, LocalDate end);

    // transactions that do not have a closing date (still active)
    List<Deal> findByCloseDateIsNull();

    // transactions that have a closing date (completed)
    List<Deal> findByCloseDateIsNotNull();

    List<Deal> findByOwnerId(Long ownerId);

    List<Deal> findByOwnerIdAndStage(Long ownerId, DealStage stage);

    List<Deal> findByOwnerIdAndCloseDateIsNull(Long ownerId); // active transactions

    @Query(value = """
        SELECT d.id AS deal_id,
               d.name AS deal_name,
               d.amount,
               d.currency,
               c.firstname AS client_firstname,
               c.lastname AS client_lastname
        FROM deals d
        JOIN clients c ON d.client_id = c.id
        WHERE d.owner_id = :ownerId
    """, nativeQuery = true)
    List<DealInfoDto> findDealsByOwner(@Param("ownerId") Long ownerId);
}

