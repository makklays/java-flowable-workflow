package com.techmatrix18.service;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Price Storage - сервис для хранения текущих цен на криптовалюты.
 *
 * @author Alexander Kuziv
 * @since 23.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Component
public class PriceStorage {
    // Храним: Ключ = "BTCUSDT", Значение = 65000.00
    private final Map<String, BigDecimal> currentPrices = new ConcurrentHashMap<>();

    public void updatePrice(String symbol, BigDecimal price) {
        if (symbol != null) {
            currentPrices.put(symbol.toUpperCase(), price);
        }
    }

    public BigDecimal getPrice(String symbol) {
        if (symbol == null) return null;
        return currentPrices.get(symbol.toUpperCase());
    }

    public Map<String, BigDecimal> getAllPrices() {
        return currentPrices;
    }
}

