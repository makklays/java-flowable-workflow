package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * SupportResistanceIndicator is a placeholder for an indicator that identifies support and resistance levels in price data.
 * Индикатор уровней поддержки и сопротивления (Support and Resistance Indicators) - помогает выявить ключевые уровни, где цена может отскочить или пробиться.
 *
 * Индикатор ищет уровни, объединяет их в «зоны» и считает количество подтверждений (касаний).
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Component
public class SupportResistanceIndicator {

    // sensitivity — процент отклонения (например, 0.5%), при котором уровни считаются одним и тем же
    public List<Level> findStrongLevels(List<Candle> candles, double sensitivity) {
        List<Double> allPoints = new ArrayList<>();

        // 1. Находим все фракталы (минимумы и максимумы)
        for (int i = 2; i < candles.size() - 2; i++) {
            if (isLowFractal(candles, i)) allPoints.add(candles.get(i).getLow().doubleValue());
            if (isHighFractal(candles, i)) allPoints.add(candles.get(i).getHigh().doubleValue());
        }

        // 2. Группируем близкие точки в уровни
        List<Level> strongLevels = new ArrayList<>();
        for (Double price : allPoints) {
            boolean found = false;
            for (Level level : strongLevels) {
                // Если цена близка к уже существующему уровню (в пределах sensitivity %)
                if (Math.abs(level.getPrice() - price) / price * 100 < sensitivity) {
                    level.addTouch(); // Добавляем касание
                    found = true;
                    break;
                }
            }
            if (!found) {
                strongLevels.add(new Level(price));
            }
        }

        // 3. Оставляем только те, у которых > 2 касаний
        return strongLevels.stream()
            .filter(l -> l.getTouches() >= 2)
            .sorted(Comparator.comparingDouble(Level::getPrice))
            .collect(Collectors.toList());
    }

    private boolean isLowFractal(List<Candle> candles, int i) {
        double p = candles.get(i).getLow().doubleValue();
        return p < candles.get(i-1).getLow().doubleValue() && p < candles.get(i-2).getLow().doubleValue() &&
            p < candles.get(i+1).getLow().doubleValue() && p < candles.get(i+2).getLow().doubleValue();
    }

    private boolean isHighFractal(List<Candle> candles, int i) {
        double p = candles.get(i).getHigh().doubleValue();
        return p > candles.get(i-1).getHigh().doubleValue() && p > candles.get(i-2).getHigh().doubleValue() &&
            p > candles.get(i+1).getHigh().doubleValue() && p > candles.get(i+2).getHigh().doubleValue();
    }

    // Вспомогательный класс
    public static class Level {
        private double price;
        private int touches = 1;

        public Level(double price) { this.price = price; }
        public void addTouch() { this.touches++; }
        public double getPrice() { return price; }
        public int getTouches() { return touches; }
    }
}

/*
Как использовать:

Автоматические уровни позволяют создать очень мощное правило:
«Покупать только если цена пробила среднюю Боллинджера И находится прямо над сильным уровнем поддержки».

List<Level> levels = srIndicator.findStrongLevels(candles, 0.5);
double currentPrice = candles.get(0).getClose().doubleValue();

// Проверка: есть ли сильный уровень прямо под нами (в пределах 0.3%)
boolean onSupport = levels.stream()
    .anyMatch(l -> currentPrice > l.getPrice() && (currentPrice - l.getPrice()) / l.getPrice() * 100 < 0.3);

*/

