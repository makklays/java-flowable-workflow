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

    // Добавляем поля для хранения состояния
    private double lastAvgGain = 0;
    private double lastAvgLoss = 0;

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
                history.add(50.0);
                continue;
            }

            double diff = series.getClose(i) - series.getClose(i - 1);
            double gain = Math.max(0, diff);
            double loss = Math.max(0, -diff);

            if (i < period) {
                avgGain += gain;
                avgLoss += loss;
                history.add(50.0);
            } else if (i == period) {
                avgGain = (avgGain + gain) / period;
                avgLoss = (avgLoss + loss) / period;
                double rs = (avgLoss == 0) ? 0 : avgGain / avgLoss;
                history.add(100 - (100 / (1 + rs)));
            } else {
                avgGain = (avgGain * (period - 1) + gain) / period;
                avgLoss = (avgLoss * (period - 1) + loss) / period;
                if (avgLoss == 0) {
                    history.add(100.0);
                } else {
                    double rs = avgGain / avgLoss;
                    history.add(100 - (100 / (1 + rs)));
                }
            }
        }

        // 2. ЗАПОМИНАЕМ последние значения для инкрементального расчета
        this.lastAvgGain = avgGain;
        this.lastAvgLoss = avgLoss;
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

    // Метод для инкрементального расчета RSI при добавлении новой свечи - в реальном времени
    public Double calculateIncremental(CandleSeries series) {
        int lastIndex = series.size() - 1;

        if (history.isEmpty()) {
            prepare(series);
            return history.get(history.size() - 1);
        }

        if (lastIndex >= history.size()) {
            double diff = series.getClose(lastIndex) - series.getClose(lastIndex - 1);
            double gain = Math.max(0, diff);
            double loss = Math.max(0, -diff);

            // 3. ТЕПЕРЬ эти поля доступны и обновляются
            this.lastAvgGain = (this.lastAvgGain * (period - 1) + gain) / period;
            this.lastAvgLoss = (this.lastAvgLoss * (period - 1) + loss) / period;

            double rs = (this.lastAvgLoss == 0) ? 0 : this.lastAvgGain / this.lastAvgLoss;
            double rsi = 100 - (100 / (1 + rs));

            history.add(rsi);
            return rsi;
        }

        return history.get(lastIndex);
    }

    // Метод для расчета RSI на основе текущей цены без изменения состояния (для оценки потенциального значения)
    // Используется для оценки RSI в реальном времени, когда новая свеча еще не добавлена в серию
    // для frontend отображения спидометра
    public Double calculateTemporary(CandleSeries series, double currentClose) {
        if (history.isEmpty()) return 50.0;

        double diff = currentClose - series.getClose(series.size() - 1);
        double gain = Math.max(0, diff);
        double loss = Math.max(0, -diff);

        // Считаем временные средние на основе последних сохраненных
        double tempAvgGain = (this.lastAvgGain * (period - 1) + gain) / period;
        double tempAvgLoss = (this.lastAvgLoss * (period - 1) + loss) / period;

        if (tempAvgLoss == 0) return 100.0;
        double rs = tempAvgGain / tempAvgLoss;
        return 100 - (100 / (1 + rs));
    }
}

