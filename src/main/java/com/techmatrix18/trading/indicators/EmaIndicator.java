package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

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
    public void prepare(CandleSeries series) {
        history.clear();
        if (series.size() == 0) return;

        double multiplier = 2.0 / (period + 1);
        // Начальное значение EMA обычно берется равным цене первой свечи
        double ema = series.getClose(0);

        for

        (int i = 0; i < series.size(); i++) {
            double close = series.getClose(i);

            // Рекуррентная формула EMA
            ema = (close - ema) * multiplier + ema;

            history.add(ema);
        }
    }

    @Override
    public Double calculate(CandleSeries series, int index) {
        if (index < 0) return 0.0;

        // Если значение уже есть в кэше history, берем его (для скорости)
        if (index < history.size()) {
            return history.get(index);
        }

        // Если кэша нет (например, одиночный расчет), считаем по всей цепочке от 0 до index
        double multiplier = 2.0 / (period + 1);
        double ema = series.getClose(0);
        for (int i = 1; i <= index; i++) {
            ema = (series.getClose(i) - ema) * multiplier + ema;
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
    telegramService.sendMessageForAll("🚀 Golden Cross! Быстрая EMA 9 пробила медленную EMA 21 вверх.");
}

*/

