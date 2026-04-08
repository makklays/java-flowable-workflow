package com.techmatrix18.trading.rules;

import com.techmatrix18.model.Candle;
import com.techmatrix18.trading.indicators.Indicator;

import java.util.List;

/**
 * UnderIndicatorRule checks if the value of a specified indicator is below a certain threshold.
 * Ниже уровня (UnderIndicatorRule)
 * Проверка на то, что цена или индикатор находится в определенной зоне.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class UnderIndicatorRule implements Rule {
    private final Indicator<Double> indicator;
    private final double threshold;

    public UnderIndicatorRule(Indicator<Double> indicator, double threshold) {
        this.indicator = indicator;
        this.threshold = threshold;
    }

    @Override
    public boolean isSatisfied(List<Candle> candles) {
        return !candles.isEmpty() && indicator.calculate(candles) < threshold;
    }
}

/*
Как использовать:

// --- НИЖЕ УРОВНЯ (UnderIndicatorRule) ---
// RSI находится в зоне перепроданности (ниже 30)
Rule rsiIsLow = new UnderIndicatorRule(rsi, 30.0);

// Цена находится ниже средней линии Боллинджера
Rule priceUnderBB = new UnderIndicatorRule(bollinger, 0.0);

*/

