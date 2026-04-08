package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * EmaIndicator calculates the Exponential Moving Average (EMA) for a given period.
 * Индикатор тренда (Trend Indicators) - показывает силу и направление тренда.
 *
 * EMA придает больше веса последним ценам, что делает его более чувствительным к новым данным по сравнению с SMA.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class EmaIndicator extends AbstractOscillator {
    public EmaIndicator(int period) { super(period); }

    @Override
    public Double calculate(List<Candle> candles) {
        if (!hasEnoughData(candles)) return 0.0;

        // Коэффициент (multiplier) обычно равен 2 / (period + 1)
        double multiplier = 2.0 / (period + 1);
        // Для первой точки EMA обычно берется SMA
        double ema = candles.get(candles.size() - period).getClose().doubleValue();

        // Проходим от старых цен к новым (нужно изменить порядок в списке, если он DESC)
        for (int i = candles.size() - period; i < candles.size(); i++) {
            double close = candles.get(i).getClose().doubleValue();
            ema = (close - ema) * multiplier + ema;
        }
        return ema;
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

