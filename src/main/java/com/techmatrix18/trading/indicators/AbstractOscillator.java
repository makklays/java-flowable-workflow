package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import java.util.List;

/**
 * AbstractOscillator serves as a base class for all oscillator indicators,
 * providing common functionality such as data validation and windowing.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public abstract class AbstractOscillator implements Indicator<Double> {
    protected final int period;

    protected AbstractOscillator(int period) {
        this.period = period;
    }

    // Метод для проверки, достаточно ли данных в БД/списке для расчета
    protected boolean hasEnoughData(List<Candle> candles) {
        return candles != null && candles.size() >= period;
    }

    // Метод получения подмножества свечей для текущего расчета
    protected List<Candle> getCurrentWindow(List<Candle> candles) {
        return candles.subList(candles.size() - period, candles.size());
    }

    // Главный метод, который реализует каждый конкретный индикатор
    public abstract Double calculate(List<Candle> candles);
}

