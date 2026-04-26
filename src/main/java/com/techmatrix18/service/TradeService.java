package com.techmatrix18.service;

import com.techmatrix18.dto.OpenTradeDto;
import com.techmatrix18.enums.TradeSide;
import com.techmatrix18.enums.TradeStatus;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.repository.TradeRepository;
import jakarta.persistence.EntityNotFoundException;
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

    /**
     * Find a trade by id
     *
     * @param id Trade ID
     * @return found trade
     * @throws EntityNotFoundException if the trade is not found
     */
    public Trade getById(Long id) {
        return tradeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("The trade didn't find"));
    }

    // Open a new trade
    @Transactional
    public Trade openTrade(OpenTradeDto dto) {
        log.info("Opening new trade for user: " + dto.getUserId() + ", symbol: " + dto.getSymbol());

        Trade trade = new Trade();

        // Переносим данные из DTO в Entity
        trade.setUserId(dto.getUserId());
        trade.setExchangeId(dto.getExchangeId());
        trade.setExchange(dto.getExchange());
        trade.setSymbolId(dto.getSymbolId());
        trade.setSymbol(dto.getSymbol());
        // Если в Entity это Enum, используйте TradeSide.valueOf(dto.getSide())
        trade.setSide(TradeSide.valueOf(dto.getSide()));
        trade.setQuantity(dto.getQuantity());
        trade.setOpenPrice(dto.getOpenPrice());
        trade.setStopLoss(dto.getStopLoss());
        trade.setTakeProfit(dto.getTakeProfit());
        trade.setTradeComment(dto.getTradeComment());

        // Логика по умолчанию
        trade.setStatus(TradeStatus.OPEN);
        trade.setOpenedAt(LocalDateTime.now());

        // Проверки на null
        trade.setFeeEntry(BigDecimal.ZERO);
        trade.setLeverage(dto.getLeverage() != null ? dto.getLeverage() : 1);

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

    public List<Trade> getByStatus(TradeStatus status) {
        return tradeRepository.findByStatus(status);
    }

    @Transactional
    public void updateLiveMetrics(Long tradeId, BigDecimal currentPrice) {
        Trade trade = tradeRepository.findById(tradeId).orElseThrow();

        // 1. Инициализация и обновление High/Low
        if (trade.getHighPriceReached() == null) trade.setHighPriceReached(trade.getOpenPrice());
        if (trade.getLowPriceReached() == null) trade.setLowPriceReached(trade.getOpenPrice());

        if (currentPrice.compareTo(trade.getHighPriceReached()) > 0) {
            trade.setHighPriceReached(currentPrice);
        }
        if (currentPrice.compareTo(trade.getLowPriceReached()) < 0) {
            trade.setLowPriceReached(currentPrice);
        }

        // 2. Расчет MFE и MAE
        BigDecimal mfeRaw, maeRaw;
        if (TradeSide.BUY.equals(trade.getSide())) {
            mfeRaw = trade.getHighPriceReached().subtract(trade.getOpenPrice());
            maeRaw = trade.getOpenPrice().subtract(trade.getLowPriceReached());
        } else {
            mfeRaw = trade.getOpenPrice().subtract(trade.getLowPriceReached());
            maeRaw = trade.getHighPriceReached().subtract(trade.getOpenPrice());
        }

        // Защита от отрицательных (берем max между 0 и расчетом)
        trade.setMfe(mfeRaw.max(BigDecimal.ZERO));
        trade.setMae(maeRaw.max(BigDecimal.ZERO));

        // 3. Расчет Max Drawdown (%)
        BigDecimal drawdown = trade.getMae()
            .divide(trade.getOpenPrice(), 4, RoundingMode.HALF_UP) // 4 знака (например 0.0153)
            .multiply(new BigDecimal(100)); // превращаем в 1.53%

        // КРИТИЧНО: проверка на null перед compareTo
        if (trade.getMaxDrawdown() == null || drawdown.compareTo(trade.getMaxDrawdown()) > 0) {
            trade.setMaxDrawdown(drawdown.stripTrailingZeros());
        }

        // Дебаг с красивым форматированием
        System.out.format(
            "DEBUG [%d] %s | P: %s | MFE: %s | MAE: %s | MaxDD: %s%%%n",
            tradeId, trade.getSide(), currentPrice,
            trade.getMfe().stripTrailingZeros().toPlainString(),
            trade.getMae().stripTrailingZeros().toPlainString(),
            trade.getMaxDrawdown().toPlainString()
        );

        tradeRepository.save(trade);
    }
}

