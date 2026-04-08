package com.techmatrix18.trading.rules;

import com.techmatrix18.model.Candle;
import com.techmatrix18.trading.indicators.Indicator;

import java.util.List;

/**
 * CrossedUpRule checks if the closing price of the current candle has crossed above a specified indicator level.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class CrossedUpRule implements Rule {
    private final Indicator<Double> indicator;
    private final Double constantThreshold;

    public CrossedUpRule(Indicator<Double> indicator) {
        this.indicator = indicator;
        this.constantThreshold = null;
    }

    public CrossedUpRule(Indicator<Double> indicator, double threshold) {
        this.indicator = indicator;
        this.constantThreshold = threshold;
    }

    @Override
    public boolean isSatisfied(List<Candle> candles) {
        // Простая проверка: если свечей совсем мало (меньше 2), пересечение невозможно
        if (candles.size() < 2) return false;

        double currentIndicator = indicator.calculate(candles);

        // Получаем предыдущее значение индикатора (без последней свечи)
        List<Candle> previousCandles = candles.subList(1, candles.size());
        double prevIndicator = indicator.calculate(previousCandles);

        if (constantThreshold == null) {
            // Цена пересекает индикатор вверх
            double currentPrice = candles.get(0).getClose().doubleValue();
            double prevPrice = candles.get(1).getClose().doubleValue();
            return prevPrice <= prevIndicator && currentPrice > currentIndicator;
        } else {
            // Индикатор пересекает число вверх (например, RSI > 50)
            return prevIndicator <= constantThreshold && currentIndicator > constantThreshold;
        }
    }
}

/*
Как использовать:

// --- ПЕРЕСЕЧЕНИЕ ВВЕРХ (CrossedUpRule) ---
Rule buyRule = new CrossedUpRule(bollinger).and(new UnderIndicatorRule(rsi, 40.0));

// Цена пересекает индикатор вверх (например, пробой средней линии Боллинджера)
Rule buyPriceCrossBB = new CrossedUpRule(bollinger);

// Сам индикатор пересекает уровень (например, RSI выходит из зоны перепроданности 30)
Rule rsiLeavesBottom = new CrossedUpRule(rsi, 30.0);

// ПРИМЕР "Консервативный вход":
// Цена пробила Боллинджер вверх И при этом RSI все еще низкий (не перекуплен)
Rule conservativeBuy = new CrossedUpRule(bollinger).and(new UnderIndicatorRule(rsi, 50.0));

*/

