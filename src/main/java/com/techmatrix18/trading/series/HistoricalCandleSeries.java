package com.techmatrix18.trading.series;

import com.techmatrix18.model.Candle;

import java.util.List;

/**
 * Historical Candle Series -
 *
 * @author Alexander Kuziv
 * @since 14.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class HistoricalCandleSeries implements CandleSeries {
    private final List<Candle> candles;

    public HistoricalCandleSeries(List<Candle> candles) {
        this.candles = candles;
    }

    @Override public Candle getCandle(int index) { return candles.get(index); }
    @Override public int size() { return candles.size(); }

    @Override public double getClose(int index) { return candles.get(index).getClose().doubleValue(); }
    @Override public double getHigh(int index) { return candles.get(index).getHigh().doubleValue(); }
    @Override public double getLow(int index) { return candles.get(index).getLow().doubleValue(); }
}

