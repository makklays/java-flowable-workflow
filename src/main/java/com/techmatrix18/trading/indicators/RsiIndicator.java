package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

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
@Component
public class RsiIndicator extends AbstractOscillator {

    public RsiIndicator() {
        super(14); // Стандартный период RSI
    }

    @Override
    public Double calculate(List<Candle> candles) {
        if (!hasEnoughData(candles)) return 0.0;

        List<Candle> window = getCurrentWindow(candles);

        // Инициализируем переменные как BigDecimal
        BigDecimal gains = BigDecimal.ZERO;
        BigDecimal losses = BigDecimal.ZERO;

        for (int i = 1; i < window.size(); i++) {
            BigDecimal currentClose = window.get(i).getClose();
            BigDecimal previousClose = window.get(i - 1).getClose();

            BigDecimal difference = currentClose.subtract(previousClose);

            if (difference.compareTo(BigDecimal.ZERO) > 0) {
                // ПРИСВАИВАЕМ результат обратно: gains = gains.add(...)
                gains = gains.add(difference);
            } else {
                losses = losses.add(difference.abs());
            }
        }

        // Если убытков нет, RSI равен 100
        if (losses.compareTo(BigDecimal.ZERO) == 0) return 100.0;

        // Конвертируем в double только в самом конце для финальной формулы
        double avgGain = gains.doubleValue() / period;
        double avgLoss = losses.doubleValue() / period;

        double rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }
}

