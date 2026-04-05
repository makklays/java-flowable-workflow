package com.techmatrix18.repository;

import com.techmatrix18.model.Activity;
import com.techmatrix18.model.Candle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing Candle entities, providing CRUD operations and custom queries.
 *
 * @author Alexander Kuziv
 * @since 05.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Repository
public interface CandleRepository extends JpaRepository<Candle, Long> {

    // Поиск свечей для конкретного символа и таймфрейма (например, для графиков)
    List<Candle> findAllBySymbolIdAndTimeframeOrderByOpenTimeDesc(Long symbolId, String timeframe);

    // Проверка существования конкретной свечи
    boolean existsByExchangeIdAndSymbolIdAndTimeframeAndOpenTime(Integer exchangeId, Long symbolId, String timeframe, Long openTime);

    Optional<Candle> findById(Long id);

    List<Candle> findAll();
}

