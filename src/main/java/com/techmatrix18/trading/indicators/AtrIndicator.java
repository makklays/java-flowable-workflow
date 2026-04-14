package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

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
    public AtrIndicator(int period) {
        super(period);
    }

    @Override
    public Double calculate(CandleSeries series, int index) {
        // Нам нужно минимум (period) предыдущих свечей + 1 для prevClose
        if (index < period) {
            return 0.0;
        }

        double sumTR = 0;

        // Считаем True Range для окна размером period, заканчивающегося на index
        for (int i = index; i > index - period; i--) {
            double high = series.getHigh(i);
            double low = series.getLow(i);
            double prevClose = series.getClose(i - 1);

            // Формула True Range
            double tr = Math.max(high - low,
                    Math.max(Math.abs(high - prevClose), Math.abs(low - prevClose)));
            sumTR += tr;
        }

        return sumTR / period;
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

