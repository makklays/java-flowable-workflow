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
        // Выводим все ключи, которые сейчас есть в памяти
        System.out.println("DEBUG: All keys in storage: " + priceStorage.getAllPrices().keySet());

        List<Trade> openTrades = tradeService.getByStatus(TradeStatus.OPEN);

        System.out.println("DEBUG PriceStorage keys: " + priceStorage.getAllPrices().keySet());

        for (Trade trade : openTrades) {
            String symbol = trade.getSymbol(); // Получаем символ из БД (например, "SOLUSDT")
            BigDecimal currentPrice = priceStorage.getPrice(symbol);

            if (currentPrice == null) {
                System.out.println("WARN: Price not found for [" + symbol + "]. Check if key matches!");
            } else {
                tradeService.updateLiveMetrics(trade.getId(), currentPrice);
            }
        }
    }
}

