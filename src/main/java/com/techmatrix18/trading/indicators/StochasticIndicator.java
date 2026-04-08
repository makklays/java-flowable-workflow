package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
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
    public StochasticIndicator() { super(14); } // Стандартный период 14

    @Override
    public Double calculate(List<Candle> candles) {
        if (!hasEnoughData(candles)) return 0.0;

        List<Candle> window = getCurrentWindow(candles);
        double currentClose = candles.get(0).getClose().doubleValue();

        double lowMin = window.stream().map(Candle::getLow).mapToDouble(BigDecimal::doubleValue).min().orElse(0.0);
        double highMax = window.stream().map(Candle::getHigh).mapToDouble(BigDecimal::doubleValue).max().orElse(0.0);

        if (highMax == lowMin) return 50.0;

        // Формула %K
        return ((currentClose - lowMin) / (highMax - lowMin)) * 100;
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
    telegramService.sendMessage("🚀 Стохастик подтвердил разворот по тренду!");
}

*/

