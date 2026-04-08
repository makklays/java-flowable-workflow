package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * ATR (Average True Range) - это индикатор, который измеряет волатильность рынка, показывая среднее значение истинного
 * диапазона за определенный период времени. ATR помогает трейдерам оценить уровень риска и определить оптимальные уровни стоп-лоссов.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class AtrIndicator extends AbstractOscillator {
    public AtrIndicator(int period) { super(period); }

    @Override
    public Double calculate(List<Candle> candles) {
        if (candles.size() < period + 1) return 0.0;

        double sumTR = 0;
        // Считаем TR для каждой свечи в окне
        for (int i = 0; i < period; i++) {
            double high = candles.get(i).getHigh().doubleValue();
            double low = candles.get(i).getLow().doubleValue();
            double prevClose = candles.get(i + 1).getClose().doubleValue();

            double tr = Math.max(high - low,
                    Math.max(Math.abs(high - prevClose), Math.abs(low - prevClose)));
            sumTR += tr;
        }
        return sumTR / period; // Простой ATR (SMA от True Range)
    }
}

/*
Как использовать:

Трейдеры часто ставят стоп на расстоянии 2 * ATR от цены входа. Теперь вы можете это автоматизировать:
double currentAtr = atr.calculate(candles);
double entryPrice = candles.get(0).getClose().doubleValue();

// Динамический стоп-лосс (на 2 волатильности ниже входа)
double stopPrice = entryPrice - (currentAtr * 2);

*/

