package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import java.util.List;

/**
 * Interface for indicators, which calculates values based on a list of candles.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 *
 * @param <T>
 */
public interface Indicator<T> {
    T calculate(List<Candle> candles);
}

