package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

import java.util.*;

/**
 * FibonacciIndicator calculates Fibonacci retracement levels based on the high and low of a given list of candles.
 * Канальный и уровневый инструмент - показывает ключевые уровни поддержки и сопротивления, основанные на соотношениях Фибоначчи.
 *
 * Уровни коррекции Фибоначчи. Рассчитывает сетку уровней (0.236, 0.382, 0.5, 0.618, 0.786) на основе локальных максимумов и минимумов
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class FibonacciIndicator implements Indicator<Map<String, Double>> {
    private List<Map<String, Double>> history = new ArrayList<>();
    private final int period;

    public FibonacciIndicator(int period) {
        this.period = period;
    }

    public void prepare(CandleSeries series) {
        history.clear();


        for (int i = 0; i < series.size(); i++) {
            // Теперь передаем серию и текущий индекс
            history.add(calculate(series, i));
        }
    }

    @Override
    public Map<String, Double> getValue(int index) {
        if (index < 0 || index >= history.size()) return Collections.emptyMap();
        return history.get(index);
    }

    @Override
    public Map<String, Double> calculate(CandleSeries series, int index) {
        if (series.size() == 0 || index < 0) return Collections.emptyMap();

        // 1. Находим High и Low за период [index - period + 1, index]
        int start = Math.max(0, index - period + 1);
        double high = series.getHigh(start);
        double low = series.getLow(start);

        for (int i = start + 1; i <= index; i++) {
            double currentHigh = series.getHigh(i);
            double currentLow = series.getLow(i);
            if (currentHigh > high) high = currentHigh;
            if (currentLow < low) low = currentLow;
        }

        double diff = high - low;

        // 2. Рассчитываем уровни
        Map<String, Double> levels = new HashMap<>();
        levels.put("level_0", high);
        levels.put("level_236", high - (diff * 0.236));
        levels.put("level_382", high - (diff * 0.382));
        levels.put("level_500", high - (diff * 0.5));
        levels.put("level_618", high - (diff * 0.618));
        levels.put("level_786", high - (diff * 0.786));
        levels.put("level_100", low);

        return levels;
    }
}

/*
// Бот проверяет:
if (currentPrice <= fibLevels.get("level_618")) {
    // Цена коснулась "золотого сечения" 61.8%
    // Логика: выставить ордер на покупку или отправить уведомление
}
*/

