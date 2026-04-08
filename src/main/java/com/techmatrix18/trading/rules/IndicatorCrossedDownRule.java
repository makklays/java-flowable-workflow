package com.techmatrix18.trading.rules;

import com.techmatrix18.model.Candle;
import com.techmatrix18.trading.indicators.Indicator;

import java.util.List;

/**
 * IndicatorCrossedDownRule checks if one indicator has crossed below another indicator.
 * Правило только для пересечения скользящих средних (CrossedDownRule)
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class IndicatorCrossedDownRule implements Rule {
    private final Indicator<Double> fast;
    private final Indicator<Double> slow;

    public IndicatorCrossedDownRule(Indicator<Double> fast, Indicator<Double> slow) {
        this.fast = fast;
        this.slow = slow;
    }

    @Override
    public boolean isSatisfied(List<Candle> candles) {
        if (candles.size() < 2) return false;

        double currentFast = fast.calculate(candles);
        double currentSlow = slow.calculate(candles);

        List<Candle> previousCandles = candles.subList(1, candles.size());
        double prevFast = fast.calculate(previousCandles);
        double prevSlow = slow.calculate(previousCandles);

        // Условие: раньше быстрая была над медленной, теперь — под ней
        return prevFast >= prevSlow && currentFast < currentSlow;
    }
}

/*
Как использовать:

// Инициализируем индикаторы
EmaIndicator ema9 = new EmaIndicator(9);
EmaIndicator ema21 = new EmaIndicator(21);

// 1. Золотой крест (EMA 9 пересекает EMA 21 вверх)
Rule goldenCross = new IndicatorCrossedUpRule(ema9, ema21);

// 2. Смертельный крест (EMA 9 пересекает EMA 21 вниз)
Rule deathCross = new IndicatorCrossedDownRule(ema9, ema21);

if (goldenCross.isSatisfied(candles)) {
    telegramService.sendMessage("🚀 Golden Cross! Быстрая EMA 9 пробила медленную EMA 21 вверх.");
}

*/

