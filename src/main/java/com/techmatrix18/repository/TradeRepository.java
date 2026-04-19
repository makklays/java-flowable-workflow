package com.techmatrix18.repository;

import com.techmatrix18.enums.TradeStatus;
import com.techmatrix18.model.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Trade Repository -
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 19.04.2026
 * @version 0.0.1
 */
@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
    // Поиск по Symbol ID
    Optional<Trade> findBySymbolId(Long symbolId);

    // Поиск по ID
    Optional<Trade> findById(Long id);

    // List of Trades
    List<Trade> findAll();

    /**
     * Поиск сделок по ID пользователя и статусу.
     * Spring Data автоматически сформирует SQL:
     * SELECT * FROM trades WHERE user_id = ? AND status = ?
     */
    List<Trade> findByUserIdAndStatus(Long userId, TradeStatus status);

    List<Trade> findByUserId(Long userId);
}

