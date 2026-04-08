package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * SmaIndicator calculates the Simple Moving Average (SMA) for a given period.
 * Индикатор тренда (Trend Indicators) - показывает силу и направление тренда.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class SmaIndicator extends AbstractOscillator {
    public SmaIndicator(int period) { super(period); }

    @Override
    public Double calculate(List<Candle> candles) {
        if (!hasEnoughData(candles)) return 0.0;
        return getCurrentWindow(candles).stream()
            .map(Candle::getClose)
            .mapToDouble(BigDecimal::doubleValue)
            .average().orElse(0.0);
    }
}

/*
Как использовать:

1. Простое положение цены относительно SMA
// Инициализируем 50-периодную среднюю (часто используется как граница тренда)
SmaIndicator sma50 = new SmaIndicator(50);
// Правило: Текущая цена ВЫШЕ средней линии
Rule priceAboveSma = new OverIndicatorRule(sma50, 0.0);
// Правило: Текущая цена НИЖЕ средней линии
Rule priceUnderSma = new UnderIndicatorRule(sma50, 0.0);

2. Пересечение цены и SMA (Сигнал на вход/выход)
// Создаем правило пробоя 20-периодной SMA вверх
Rule crossUpSma = new CrossedUpRule(new SmaIndicator(20));
if (crossUpSma.isSatisfied(candles)) {
    telegramService.sendMessage("🚀 Цена пробила SMA-20 снизу вверх — потенциальный вход!");
}

3. Пересечение двух SMA («Золотой крест»)
SmaIndicator fastSma = new SmaIndicator(50);
SmaIndicator slowSma = new SmaIndicator(200);
// Золотой крест: 50-я пробивает 200-ю вверх
Rule goldenCross = new IndicatorCrossedUpRule(fastSma, slowSma);
// Смертельный крест: 50-я пробивает 200-ю вниз
Rule deathCross = new IndicatorCrossedDownRule(fastSma, slowSma);

4. Использование как фильтр в сложной стратегии
Rule trendFilter = new OverIndicatorRule(new SmaIndicator(200), 0.0);
Rule buyEntry = new MacdRule(macd, MacdRule.MacdCondition.CROSS_UP);
// Итоговая стратегия: Покупаем по MACD только если глобальный тренд (SMA-200) направлен вверх
if (trendFilter.and(buyEntry).isSatisfied(candles)) {
    telegramService.sendMessage("🎯 Подтвержденный вход по тренду!");
}

*/

