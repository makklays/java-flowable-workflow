package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

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
    public void prepare(CandleSeries series) {
        history.clear();
        if (series.size() == 0) return;

        double sum = 0;
        for (int i = 0; i < series.size(); i++) {
            // Добавляем текущую цену
            sum += series.getClose(i);

            // Если окно полностью заполнено, вычитаем цену, которая "выходит" из окна
            if (i >= period) {
                sum -= series.getClose(i - period);
            }

            // Записываем среднее значение в кэш
            if (i < period - 1) {
                // На этапе прогрева делим на фактическое количество свечей
                history.add(sum / (i + 1));
            } else {
                // Когда окно заполнено, делим на период
                history.add(sum / period);
            }
        }
    }

    @Override
    public Double calculate(CandleSeries series, int index) {
        if (index < 0) return 0.0;

        // Если значение уже в кэше — возвращаем мгновенно
        if (index < history.size()) {
            return history.get(index);
        }

        // Если кэша нет (одиночный расчет), считаем только для текущего окна
        if (index < period - 1) return 0.0;

        double sum = 0;
        for (int i = index; i > index - period; i--) {
            sum += series.getClose(i);
        }
        return sum / period;
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
    telegramService.sendMessageForAll("🚀 Цена пробила SMA-20 снизу вверх — потенциальный вход!");
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
    telegramService.sendMessageForAll("🎯 Подтвержденный вход по тренду!");
}

*/

