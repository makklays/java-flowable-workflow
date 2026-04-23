package com.techmatrix18.scheduler;

import com.techmatrix18.enums.TradeStatus;
import com.techmatrix18.model.Trade;
import com.techmatrix18.service.PriceStorage;
import com.techmatrix18.service.TradeService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * Trade Scheduler - планировщик для обновления открытых сделок
 *
 * @author Alexander Kuziv
 * @since 23.04.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
@Component
public class TradeScheduler {

    private TradeService tradeService;
    private PriceStorage priceStorage; // Ваш сервис получения цен

    public TradeScheduler(TradeService tradeService, PriceStorage priceStorage) {
        this.tradeService = tradeService;
        this.priceStorage = priceStorage;
    }

    @Scheduled(fixedDelay = 5000) // Каждые 5 секунд
    public void refreshOpenTrades() {
        List<Trade> openTrades = tradeService.getByStatus(TradeStatus.OPEN);

        for (Trade trade : openTrades) {
            BigDecimal currentPrice = priceStorage.getPrice(trade.getSymbol());

            if (currentPrice != null) {
                tradeService.updateLiveMetrics(trade.getId(), currentPrice);
            }
        }
    }
}

