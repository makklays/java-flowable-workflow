package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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
@Component
public class FibonacciIndicator implements Indicator<Map<String, Double>> {

    @Override
    public Map<String, Double> calculate(List<Candle> candles) {
        if (candles == null || candles.isEmpty()) return Collections.emptyMap();

        double high = candles.stream()
            .map(Candle::getHigh)
            .mapToDouble(BigDecimal::doubleValue)
            .max().orElse(0.0);

        double low = candles.stream()
            .map(Candle::getLow)
            .mapToDouble(BigDecimal::doubleValue)
            .min().orElse(0.0);

        double diff = high - low;

        // Используем строковые ключи, которые легко мапятся на фронтенде в объекты или графики
        return Map.of(
            "level_0",    high,
            "level_236",  high - (diff * 0.236),
            "level_382",  high - (diff * 0.382),
            "level_500",  high - (diff * 0.5),
            "level_618",  high - (diff * 0.618),
            "level_786",  high - (diff * 0.786),
            "level_100",  low
        );
    }
}

/*
// Бот проверяет:
if (currentPrice <= fibLevels.get("level_618")) {
    // Цена коснулась "золотого сечения" 61.8%
    // Логика: выставить ордер на покупку или отправить уведомление
}
*/

