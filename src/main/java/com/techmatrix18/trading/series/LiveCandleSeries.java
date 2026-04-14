package com.techmatrix18.trading.series;

import com.techmatrix18.model.Candle;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Live Candle Series -
 *
 * @author Alexander Kuziv
 * @since 14.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class LiveCandleSeries implements CandleSeries {
    // Используем ArrayList для быстрого доступа по индексу O(1)
    private final List<Candle> buffer = new ArrayList<>();
    private final int maxSize;

    public LiveCandleSeries(int maxSize) {
        this.maxSize = maxSize;
    }

    public void addCandle(Candle candle) {
        if (buffer.size() >= maxSize) {
            buffer.remove(0); // Удаляем самую старую свечу
        }
        buffer.add(candle);
    }

    @Override public Candle getCandle(int index) { return buffer.get(index); }
    @Override public int size() { return buffer.size(); }

    @Override public double getClose(int index) { return buffer.get(index).getClose().doubleValue(); }
    @Override public double getHigh(int index) { return buffer.get(index).getHigh().doubleValue(); }
    @Override public double getLow(int index) { return buffer.get(index).getLow().doubleValue(); }
}

