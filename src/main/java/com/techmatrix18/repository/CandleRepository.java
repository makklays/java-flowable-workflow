package com.techmatrix18.repository;

import com.techmatrix18.model.Activity;
import com.techmatrix18.model.Candle;
import com.techmatrix18.model.Symbol;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    // Ищем по symbolId и сортируем по openTime
    List<Candle> findTop50BySymbolIdOrderByOpenTimeDesc(Long symbolId);

    // Если нужно больше свечей для MACD/ATR:
    List<Candle> findTop200BySymbolIdOrderByOpenTimeDesc(Long symbolId);

    List<Candle> findBySymbolIdAndTimeframeAndOpenTimeBetween(Long symbolId, String timeframe, Long start, Long end);

    Optional<Candle> findById(Long id);

    List<Candle> findAll();

    @Query("SELECT c FROM Candle c WHERE c.symbolId = :symbolId " +
            "AND c.timeframe = :timeframe " +
            "AND c.openTime BETWEEN :start AND :end " +
            "ORDER BY c.openTime ASC")
    List<Candle> findByPeriod(
        @Param("symbolId") Long symbolId,
        @Param("timeframe") String timeframe,
        @Param("start") Long start,
        @Param("end") Long end
    );

    @Query("SELECT c FROM Candle c JOIN Symbol s ON c.symbolId = s.id WHERE " +
            "CAST(c.id AS string) LIKE CONCAT('%', :search, '%') OR " +
            "LOWER(s.symbol) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Candle> searchCandles(@Param("search") String search, Pageable pageable);

    @Query("SELECT c.openTime FROM Candle c WHERE c.symbolId = :symbolId " +
        "AND c.exchangeId = :exchangeId AND c.timeframe = :timeframe " +
        "AND c.openTime BETWEEN :start AND :end")
    Set<Long> findAllOpenTimesBySymbolAndRange(
        @Param("symbolId") Long symbolId,
        @Param("exchangeId") Integer exchangeId,
        @Param("timeframe") String timeframe,
        @Param("start") Long start,
        @Param("end") Long end
    );

    @Modifying
    @Transactional
    @Query(value = "INSERT IGNORE INTO candles (exchange_id, symbol_id, timeframe, open_time, open, high, low, close, volume, quote_asset_volume, trades_count) " +
        "VALUES (:#{#c.exchangeId}, :#{#c.symbolId}, :#{#c.timeframe}, :#{#c.openTime}, :#{#c.open}, :#{#c.high}, :#{#c.low}, :#{#c.close}, :#{#c.volume}, :#{#c.quoteAssetVolume}, :#{#c.tradesCount})",
        nativeQuery = true)
    void insertIgnore(@Param("c") Candle candle);

}

