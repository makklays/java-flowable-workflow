package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

import java.util.ArrayList;
import java.util.List;

/**
 * StochasticIndicator calculates the Stochastic Oscillator, which is a momentum indicator comparing a particular
 * closing price of a security to a range of its prices over a certain period of time.
 * Осциллятор (Oscillator) - от 0 до 100, показывает перекупленность/перепроданность актива.
 *
 * Показывает перекупленность/перепроданность актива, помогает находить точки разворота тренда.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class StochasticIndicator extends AbstractOscillator {
    private List<Double> dLineHistory = new ArrayList<>(); // Линия %D (сигнальная)
    private final int dPeriod = 3; // Период сглаживания для %D

    public StochasticIndicator() { super(14); }

    @Override
    public void prepare(CandleSeries series) {
        history.clear();
        dLineHistory.clear();

        // 1. Считаем быструю линию %K
        for (int i = 0; i < series.size(); i++) {

            if (i < period - 1) {
                history.add(50.0); // Нейтральное значение на этапе прогрева
                continue;
            }

            // Поиск Min Low и Max High за период напрямую через серию
            double lowMin = series.getLow(i);
            double highMax = series.getHigh(i);

            for (int j = i; j > i - period; j--) {
                double currentLow = series.getLow(j);
                double currentHigh = series.getHigh(j);
                if (currentLow < lowMin) lowMin = currentLow;
                if (currentHigh > highMax) highMax = currentHigh;
            }

            double currentClose = series.getClose(i);

            if (highMax == lowMin) {
                history.add(50.0);
            } else {
                double kLine = ((currentClose - lowMin) / (highMax - lowMin)) * 100;
                history.add(kLine);
            }
        }

        // 2. Считаем сигнальную линию %D (SMA от линии %K)
        for (int i = 0; i < history.size(); i++) {
            if (i < dPeriod - 1) {
                dLineHistory.add(50.0);
            } else {
                double sum = 0;
                for (int j = 0; j < dPeriod; j++) {
                    sum += history.get(i - j);
                }
                dLineHistory.add(sum / dPeriod);
            }
        }
    }

    // Получение значения сигнальной линии %D по индексу
    public Double getDValue(int index) {
        if (index < 0 || index >= dLineHistory.size()) return 50.0;
        return dLineHistory.get(index);
    }

    @Override
    public Double calculate(CandleSeries series, int index) {
        // Если кэш пуст или меньше нужного индекса — готовим данные
        if (history.size() <= index) {
            prepare(series);
        }
        return getValue(index);
    }
}

/*
Как использовать:

1. Зоны перекупленности и перепроданности
// Инициализируем индикатор
StochasticIndicator stoch = new StochasticIndicator();
// Правило: Стохастик ниже 20 (Цена слишком низко относительно недавнего диапазона — пора покупать)
Rule isOversold = new UnderIndicatorRule(stoch, 20.0);
// Правило: Стохастик выше 80 (Цена слишком высоко — пора продавать)
Rule isOverbought = new OverIndicatorRule(stoch, 80.0);

2. Выход из зоны (Сигнал на разворот)
// Правило: Стохастик пробил уровень 20 снизу вверх (выход из перепроданности)
Rule exitOversold = new CrossedUpRule(stoch, 20.0);
// Правило: Стохастик пробил уровень 80 сверху вниз (выход из перекупленности)
Rule exitOverbought = new CrossedDownRule(stoch, 80.0);

3. Комбинированная стратегия (Stoch + Trend)
// Покупаем, только если глобальный тренд вверх (Цена > SMA 200)
// И Стохастик дает сигнал на выход из перепроданности
Rule smartBuy = new OverIndicatorRule(new SmaIndicator(200), 0.0)
                .and(new CrossedUpRule(stoch, 20.0));
if (smartBuy.isSatisfied(candles)) {
    telegramService.sendMessageForAll("🚀 Стохастик подтвердил разворот по тренду!");
}

*/

