package com.techmatrix18.repository;

import com.techmatrix18.model.Symbol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
}

