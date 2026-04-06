package com.techmatrix18.repository;

import com.techmatrix18.model.Symbol;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing Symbol entities, providing CRUD operations and custom queries.
 *
 * @author Alexander Kuziv
 * @since 05.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Repository
public interface SymbolRepository extends JpaRepository<Symbol, Long> {

    // Поиск конкретного символа на конкретной бирже (согласно UK в миграции)
    Optional<Symbol> findByExchangeIdAndSymbolAndMarketType(Integer exchangeId, String symbol, String marketType);

    // Получение всех активных символов для конкретной биржи
    List<Symbol> findAllByExchangeIdAndIsActiveTrue(Integer exchangeId);

    // Поиск по внутреннему тикеру (например, 'BTCUSDT')
    Optional<Symbol> findBySymbol(String symbol);

    // Проверка существования перед вставкой
    boolean existsByExchangeIdAndSymbolAndMarketType(Integer exchangeId, String symbol, String marketType);

    Optional<Symbol> findById(Long id);

    List<Symbol> findAll();

    // метод для обновления только времени начала (Start Time)
    @Transactional
    @Modifying
    @Query(value = "UPDATE symbols SET history_start_time = :startTime WHERE id = :id", nativeQuery = true)
    int updateStartTime(@Param("id") Long id, @Param("startTime") long startTime);

    // метод для обновления только времени конца (End Time)
    @Transactional
    @Modifying
    @Query(value = "UPDATE symbols SET history_end_time = :endTime WHERE id = :id", nativeQuery = true)
    int updateEndTime(@Param("id") Long id, @Param("endTime") long endTime);

}

