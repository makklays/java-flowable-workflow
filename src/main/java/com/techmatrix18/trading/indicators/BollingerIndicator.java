package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * BollingerIndicator calculates the middle band (SMA) of the Bollinger Bands based on a list of candles.
 * Индикатор тренда (Trend Indicators) - показывает силу и направление тренда.
 *
 * Средняя линия полос Боллинджера (фактически является SMA с периодом 20).
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Component
public class BollingerIndicator extends AbstractOscillator {

    public BollingerIndicator() {
        super(20); // Стандартный период для Боллинджера
    }

    @Override
    public Double calculate(List<Candle> candles) {
        if (!hasEnoughData(candles)) return 0.0;

        List<Candle> window = getCurrentWindow(candles);

        // Средняя линия (SMA) — это просто среднее арифметическое Close цен
        return window.stream()
            .map(Candle::getClose)
            .mapToDouble(BigDecimal::doubleValue)
            .average()
            .orElse(0.0);
    }
}

