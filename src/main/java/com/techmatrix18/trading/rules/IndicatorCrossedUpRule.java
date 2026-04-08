package com.techmatrix18.trading.rules;

import com.techmatrix18.model.Candle;
import com.techmatrix18.trading.indicators.Indicator;

import java.util.List;

/**
 * IndicatorCrossedUpRule checks if one indicator has crossed above another indicator.
 * Правило только для пересечения скользящих средних (CrossedUpRule)
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class IndicatorCrossedUpRule implements Rule {
    private final Indicator<Double> fast;
    private final Indicator<Double> slow;

    public IndicatorCrossedUpRule(Indicator<Double> fast, Indicator<Double> slow) {
        this.fast = fast;
        this.slow = slow;
    }

    @Override
    public boolean isSatisfied(List<Candle> candles) {
        if (candles.size() < 2) return false;

        // Значения сейчас
        double currentFast = fast.calculate(candles);
        double currentSlow = slow.calculate(candles);

        // Значения на предыдущей свече
        List<Candle> previousCandles = candles.subList(1, candles.size());
        double prevFast = fast.calculate(previousCandles);
        double prevSlow = slow.calculate(previousCandles);

        // Условие: раньше быстрая была под медленной, теперь — над ней
        return prevFast <= prevSlow && currentFast > currentSlow;
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

