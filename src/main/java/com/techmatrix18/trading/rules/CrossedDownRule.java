package com.techmatrix18.trading.rules;

import com.techmatrix18.model.Candle;
import com.techmatrix18.trading.indicators.Indicator;

import java.util.List;

/**
 * CrossedDownRule checks if an indicator has crossed down either another indicator or a constant threshold.
 * Пробой вниз (CrossedDownRule)
 * Противоположность пробою вверх. Используется для сигналов на продажу (Short) или фиксацию прибыли.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class CrossedDownRule implements Rule {
    private final Indicator<Double> indicator;
    private final Double constantThreshold;

    public CrossedDownRule(Indicator<Double> indicator) {
        this.indicator = indicator;
        this.constantThreshold = null;
    }

    public CrossedDownRule(Indicator<Double> indicator, double threshold) {
        this.indicator = indicator;
        this.constantThreshold = threshold;
    }

    @Override
    public boolean isSatisfied(List<Candle> candles) {
        if (candles.size() < 2) return false;

        double currentIndicator = indicator.calculate(candles);
        double prevIndicator = indicator.calculate(candles.subList(1, candles.size()));

        if (constantThreshold == null) {
            // Цена пробила индикатор СВЕРХУ ВНИЗ
            double currentPrice = candles.get(0).getClose().doubleValue();
            double prevPrice = candles.get(1).getClose().doubleValue();
            return prevPrice >= prevIndicator && currentPrice < currentIndicator;
        } else {
            // Индикатор пробил число СВЕРХУ ВНИЗ (например, RSI выходит из зоны 70)
            return prevIndicator >= constantThreshold && currentIndicator < constantThreshold;
        }
    }
}

/*
Как использовать:

// --- РАБОТА С RSI ---
// Индикатор пробил число 70 сверху вниз (Выход из зоны перекупленности)
Rule rsiExitsTop = new CrossedDownRule(rsi, 70.0);

// --- РАБОТА С БОЛЛИНДЖЕРОМ ---
// Цена пробила среднюю линию Боллинджера сверху вниз (Медвежий сигнал)
Rule priceDropsBelowBasis = new CrossedDownRule(bollinger);

// ПРИМЕР "Агрессивный выход":
// Цена упала ниже Боллинджера ИЛИ RSI пробил 70 вниз
Rule aggressiveExit = new CrossedDownRule(bollinger).or(new CrossedDownRule(rsi, 70.0));

*/

