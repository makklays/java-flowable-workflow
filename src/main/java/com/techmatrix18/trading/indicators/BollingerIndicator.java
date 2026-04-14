package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

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
public class BollingerIndicator extends AbstractOscillator {
    private final double standardDeviation;
    private final String lineType; // "UPPER", "MIDDLE", "LOWER"

    public BollingerIndicator(int period, double deviation, String lineType) {
        super(period);
        this.standardDeviation = deviation;
        this.lineType = lineType;
    }

    @Override
    public Double calculate(CandleSeries series, int index) {
        // Проверка: достаточно ли свечей слева от текущего индекса
        if (index < period - 1) {
            return 0.0;
        }

        // 1. Считаем Среднюю линию (SMA) за период
        double sum = 0;
        for (int i = index; i > index - period; i--) {
            sum += series.getClose(i);
        }
        double sma = sum / period;

        if ("MIDDLE".equals(lineType)) {
            return sma;
        }

        // 2. Считаем Стандартное Отклонение (Sigma)
        double sumOfSquares = 0;
        for (int i = index; i > index - period; i--) {
            double diff = series.getClose(i) - sma;
            sumOfSquares += diff * diff;
        }
        double sigma = Math.sqrt(sumOfSquares / period);

        // 3. Возвращаем нужную линию
        return switch (lineType) {
            case "UPPER" -> sma + (standardDeviation * sigma);
            case "LOWER" -> sma - (standardDeviation * sigma);
            default -> sma;
        };
    }
}

