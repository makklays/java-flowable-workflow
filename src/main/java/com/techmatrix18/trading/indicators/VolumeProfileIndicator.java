package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * VolumeProfileIndicator is a technical analysis tool that displays trading activity over a specified time period at specified price levels.
 * Volume Profile - рассчитает распределение объема по ценовым уровням.
 * POC (Point of Control) - ценовой уровень с наибольшим объемом торгов, который может служить важным уровнем поддержки или сопротивления.
 *
 * Volume Profile помогает трейдерам понять, на каких ценовых уровнях был сосредоточен объем торгов, что может указывать на важные уровни поддержки и сопротивления.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Component
public class VolumeProfileIndicator {

    public List<VolumeBin> calculateProfile(List<Candle> candles, int binCount) {
        if (candles.isEmpty()) return Collections.emptyList();

        // 1. Находим границы всего диапазона
        double minPrice = candles.stream().mapToDouble(c -> c.getLow().doubleValue()).min().orElse(0);
        double maxPrice = candles.stream().mapToDouble(c -> c.getHigh().doubleValue()).max().orElse(0);
        double step = (maxPrice - minPrice) / binCount;

        // 2. Инициализируем корзины
        Map<Integer, Double> profileMap = new HashMap<>();
        for (int i = 0; i < binCount; i++) profileMap.put(i, 0.0);

        // 3. Распределяем объем каждой свечи
        for (Candle candle : candles) {
            double price = candle.getClose().doubleValue();
            double volume = candle.getVolume().doubleValue();

            int binIndex = (int) ((price - minPrice) / step);
            if (binIndex >= binCount) binIndex = binCount - 1;

            profileMap.put(binIndex, profileMap.get(binIndex) + volume);
        }

        // 4. Формируем список для фронтенда
        List<VolumeBin> result = new ArrayList<>();
        for (int i = 0; i < binCount; i++) {
            double binPrice = minPrice + (i * step);
            result.add(new VolumeBin(binPrice, profileMap.get(i)));
        }
        return result;
    }

    // Метод поиска POC в VolumeProfileIndicator - возвращает ценовой уровень с наибольшим объемом торгов
    public double findPOC(List<Candle> candles, int binCount) {
        List<VolumeBin> bins = calculateProfile(candles, binCount);

        // Находим корзину с максимальным объемом
        return bins.stream()
                .max(Comparator.comparingDouble(VolumeBin::getVolume))
                .map(VolumeBin::getPrice)
                .orElse(0.0);
    }

    public static class VolumeBin {
        private double price;
        private double volume;
        public VolumeBin(double price, double volume) { this.price = price; this.volume = volume; }
        public double getPrice() { return price; }
        public double getVolume() { return volume; }
    }
}

/*
Как использовать:

1. Поиск Point of Control (POC) — уровня максимального объема
// Находим уровень максимального объема за последние 200 свечей, разделив диапазон на 50 уровней
double pocLevel = volumeProfileIndicator.findPOC(candles, 50);
// Пример использования: цена пробила уровень максимального объема вверх
Rule priceAbovePOC = new OverIndicatorRule((c) -> volumeProfileIndicator.findPOC(c, 50), 0.0);

2. Определение зон поддержки и сопротивления (PriceNearPOCRule)
// Создаем правило: цена находится в зоне POC (±0.2% от уровня)
Rule atPOCZone = new PriceNearPOCRule(volumeProfileIndicator, 50);
if (atPOCZone.isSatisfied(candles)) {
    telegramService.sendMessage("📊 Цена подошла к уровню максимального объема (POC). Ожидаем реакцию рынка!");
}

3. Комбинирование с осцилляторами (Подтвержденный отскок)
// Покупаем, если цена у POC И RSI < 30
Rule buyAtValueArea = new PriceNearPOCRule(volumeProfileIndicator, 50)
                      .and(new UnderIndicatorRule(rsiIndicator, 30.0));
if (buyAtValueArea.isSatisfied(candles)) {
    telegramService.sendMessage("🎯 СИГНАЛ: Отскок от объема подтвержден RSI!");
}

4. Подготовка данных для фронтенда
@GetMapping("/volume-profile")
public List<VolumeProfileIndicator.VolumeBin> getProfile(@RequestParam String symbol) {
    List<Candle> candles = repository.findTop200BySymbolOrderByTimestampDesc(symbol);
    // Возвращаем 30 горизонтальных корзин объема для отрисовки гистограммы
    return volumeProfileIndicator.calculateProfile(candles, 30);
}

*/

