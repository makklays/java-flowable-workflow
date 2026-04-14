package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

import java.util.ArrayList;
import java.util.Collections;
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
public class SupportResistanceIndicator {

    // Кэшируем список уровней для каждой точки истории
    private List<List<Level>> history = new ArrayList<>();

    public void prepare(CandleSeries series, double sensitivity) {
        history.clear();
        List<Double> fractalPoints = new ArrayList<>();
        List<Level> currentLevels = new ArrayList<>();

        for (int i = 0; i < series.size(); i++) {

            // Фрактал (с плечом 2) подтверждается только через 2 свечи после экстремума.
            // Проверяем свечу на индексе (i - 2)
            int fractalIdx = i - 2;
            if (fractalIdx >= 2 && fractalIdx < series.size() - 2) {
                if (isLowFractal(series, fractalIdx)) {
                    addPointToLevels(currentLevels, series.getLow(fractalIdx), sensitivity);
                }
                if (isHighFractal(series, fractalIdx)) {
                    addPointToLevels(currentLevels, series.getHigh(fractalIdx), sensitivity);
                }
            }

            // Сохраняем копию текущих уровней (только те, что имеют >= 2 касаний)
            List<Level> confirmedLevels = currentLevels.stream()
                    .filter(l -> l.getTouches() >= 2)
                    .map(Level::copy) // Глубокое копирование, чтобы история не менялась
                    .collect(Collectors.toList());

            history.add(confirmedLevels);
        }
    }

    private void addPointToLevels(List<Level> levels, double price, double sensitivity) {
        boolean found = false;
        for (Level l : levels) {
            if (Math.abs(l.getPrice() - price) / price * 100 < sensitivity) {
                l.addTouch();
                found = true;
                break;
            }
        }
        if (!found) {
            levels.add(new Level(price));
        }
    }

    public List<Level> getLevels(int index) {
        if (index < 0 || index >= history.size()) return Collections.emptyList();
        return history.get(index);
    }

    private boolean isLowFractal(CandleSeries series, int i) {
        double p = series.getLow(i);
        return p < series.getLow(i-1) && p < series.getLow(i-2) &&
                p < series.getLow(i+1) && p < series.getLow(i+2);
    }

    private boolean isHighFractal(CandleSeries series, int i) {
        double p = series.getHigh(i);
        return p > series.getHigh(i-1) && p > series.getHigh(i-2) &&
                p > series.getHigh(i+1) && p > series.getHigh(i+2);
    }

    public static class Level {
        private double price;
        private int touches;

        public Level(double price) { this.price = price; this.touches = 1; }
        public Level(double price, int touches) { this.price = price; this.touches = touches; }

        public void addTouch() { this.touches++; }
        public double getPrice() { return price; }
        public int getTouches() { return touches; }

        public Level copy() { return new Level(this.price, this.touches); }
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

