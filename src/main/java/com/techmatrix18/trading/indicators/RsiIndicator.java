package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

/**
 * RsiIndicator calculates the Relative Strength Index (RSI) based on a list of candles.
 * Осциллятор (Oscillator) - от 0 до 100, показывает перекупленность/перепроданность актива.
 *
 * Используются для поиска зон перекупленности/перепроданности и моментов разворота тренда.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class RsiIndicator extends AbstractOscillator {

    public RsiIndicator() {
        super(14); // Стандартный период 14
    }

    @Override
    public void prepare(CandleSeries series) {
        history.clear();
        if (series.size() < 2) return;

        double avgGain = 0;
        double avgLoss = 0;
        for (int i = 0; i < series.size(); i++) {
            if (i == 0) {
                history.add(50.0); // Нейтральное значение для первой свечи
                continue;
            }

            // Вычисляем разницу цен закрытия текущей и предыдущей свечи
            double diff = series.getClose(i) - series.getClose(i - 1);

            double gain = Math.max(0, diff);
            double loss = Math.max(0, -diff);

            if (i <= period) {
                // Начальный этап: простое среднее для накопления базы
                avgGain += gain / period;
                avgLoss += loss / period;
            } else {
                // Классическое сглаживание Уайлдера (Wilder's Smoothing)
                avgGain = (avgGain * (period - 1) + gain) / period;
                avgLoss = (avgLoss * (period - 1) + loss) / period;
            }

            // Добавляем значения в кэш
            if (i < period) {
                history.add(50.0);
            } else {
                if (avgLoss == 0) {
                    history.add(100.0);
                } else {
                    double rs = avgGain / avgLoss;
                    history.add(100 - (100 / (1 + rs)));
                }
            }
        }
    }

    @Override
    public Double calculate(CandleSeries series, int index) {
        // Если значение для этого индекса уже есть в кэше — возвращаем его
        if (index < history.size()) {
            return getValue(index);
        }

        // В противном случае пересчитываем историю до этого индекса
        // (Обычно вызывается один раз при инициализации)
        prepare(series);
        return getValue(index);
    }
}

