package com.techmatrix18.service;

import com.techmatrix18.controller.api.RoleController;
import com.techmatrix18.enums.TradeSide;
import com.techmatrix18.enums.TradeStatus;
import com.techmatrix18.repository.TradeRepository;
import org.springframework.stereotype.Service;
import com.techmatrix18.model.Trade;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

/**
 * Service for add trades in the system.
 *
 * @author Alexander Kuziv
 * @since 19.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class TradeService {
    private final TradeRepository tradeRepository;

    private static final Logger log = Logger.getLogger(TradeService.class.getName());

    public TradeService(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }

    // Open a new trade
    @Transactional
    public Trade openTrade(Trade trade) {
        log.info("Opening new trade for user: " + trade.getUserId() + ", symbol: " + trade.getSymbol());

        trade.setStatus(TradeStatus.OPEN);
        trade.setOpenedAt(LocalDateTime.now());

        // Устанавливаем начальные значения, если они не присланы
        if (trade.getFeeEntry() == null) trade.setFeeEntry(BigDecimal.ZERO);
        if (trade.getLeverage() == null) trade.setLeverage(1);

        return tradeRepository.save(trade);
    }

    // Close an existing trade and calculate PnL
    @Transactional
    public Trade closeTrade(Long tradeId, BigDecimal closePrice, String reason) {
        log.info("Closing trade ID: " + tradeId + " at price: " + closePrice);

        Trade trade = tradeRepository.findById(tradeId)
            .orElseThrow(() -> new RuntimeException("Trade not found with id: " + tradeId));

        if (trade.getStatus() == TradeStatus.CLOSED) {
            throw new IllegalStateException("Trade is already closed");
        }

        trade.setClosePrice(closePrice);
        trade.setCloseReason(reason);
        trade.setClosedAt(LocalDateTime.now());
        trade.setStatus(TradeStatus.CLOSED);

        // Расчет профита/убытка
        BigDecimal pnl = calculatePnL(trade);
        trade.setProfitLoss(pnl);

        return tradeRepository.save(trade);
    }

    // Логика расчета прибыли/убытка
    private BigDecimal calculatePnL(Trade trade) {
        BigDecimal priceDiff;
        if (trade.getSide() == TradeSide.BUY) {
            priceDiff = trade.getClosePrice().subtract(trade.getOpenPrice());
        } else {
            priceDiff = trade.getOpenPrice().subtract(trade.getClosePrice());
        }

        return priceDiff.multiply(trade.getQuantity())
            .subtract(trade.getFeeEntry())
            .subtract(trade.getFeeExit())
            .setScale(10, RoundingMode.HALF_UP);
    }

    // Получить активные сделки пользователя
    public List<Trade> getActiveTrades(Long userId) {
        return tradeRepository.findByUserIdAndStatus(userId, TradeStatus.OPEN);
    }

    // Получить закрытые (исторические) сделки пользователя
    public List<Trade> getClosedTrades(Long userId) {
        return tradeRepository.findByUserIdAndStatus(userId, TradeStatus.CLOSED);
    }

    // Получить все сделки пользователя
    public List<Trade> getTradesByUserId(Long userId) {
        return tradeRepository.findByUserId(userId);
    }

    // Получить все сделки
    public List<Trade> getAll() {
        return tradeRepository.findAll();
    }
}

