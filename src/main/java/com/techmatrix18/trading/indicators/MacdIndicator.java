package com.techmatrix18.trading.indicators;

import com.techmatrix18.model.Candle;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * MacdIndicator is a placeholder for the actual implementation of the MACD (Moving Average Convergence Divergence) indicator.
 * MACD (Moving Average Convergence Divergence)
 * MACD состоит из трех компонентов:
 *     MACD Line: (EMA 12 - EMA 26).
 *     Signal Line: EMA 9 от самой линии MACD.
 *     Histogram: Разница между Линией и Сигналом.
 *
 * MACD — это уникальный «гибридный» индикатор, который сочетает в себе свойства трендового индикатора и осциллятора.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class MacdIndicator {
    private final EmaIndicator fastEma;
    private final EmaIndicator slowEma;
    private final int signalPeriod;

    // Конструктор позволяет задать любые периоды
    public MacdIndicator(int fastPeriod, int slowPeriod, int signalPeriod) {
        this.fastEma = new EmaIndicator(fastPeriod);
        this.slowEma = new EmaIndicator(slowPeriod);
        this.signalPeriod = signalPeriod;
    }

    public Map<String, Double> calculate(List<Candle> candles) {
        // Минимально нужно свечей столько, сколько период самой длинной EMA + период сигнала
        if (candles.size() < 35) return Collections.emptyMap();

        // 1. MACD Line
        double macdLine = fastEma.calculate(candles) - slowEma.calculate(candles);

        // 2. Рассчитываем историю MACD для построения Signal Line
        List<Double> macdHistory = new ArrayList<>();
        for (int i = 0; i < signalPeriod; i++) {
            List<Candle> subList = candles.subList(i, candles.size());
            double historicMacd = fastEma.calculate(subList) - slowEma.calculate(subList);
            macdHistory.add(historicMacd);
        }

        // Signal Line (обычно это EMA от MACD, но для простоты возьмем SMA)
        double signalLine = macdHistory.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);

        return Map.of(
            "macdLine", macdLine,
            "signalLine", signalLine,
            "histogram", macdLine - signalLine
        );
    }
}

/*
Как использовать:

// Создаем нужные версии индикатора прямо в полях или конструкторе
private final MacdIndicator standardMacd = new MacdIndicator(12, 26, 9);
private final MacdIndicator fastMacd = new MacdIndicator(5, 13, 6);

public void check(List<Candle> candles) {
    var fastData = fastMacd.calculate(candles);

    if (fastData.get("histogram") > 0) {
        // Логика для быстрого MACD
    }
}

1. Тренд по нулевой линии (Самый простой)
// В StrategyService:
var macdData = macdIndicator.calculate(candles);
double macdLine = macdData.get("macdLine");
if (macdLine > 0) {
    // Сильный бычий тренд (краткосрочная средняя выше долгосрочной)
} else {
    // Медвежий тренд
}

2. Тренд по гистограмме (Импульс)
// Правило для бычьего тренда по гистограмме:
Rule macdBullish = new OverIndicatorRule(
    (c) -> macdIndicator.calculate(c).get("histogram"), 0.0
);
if (macdBullish.isSatisfied(candles)) {
    // Импульс направлен вверх
}

3. Комбинированный пример (Momentum + Trend)
// Для более надежного входа часто ждут, когда MACD Line выше нуля (общий тренд вверх) И Histogram пересекает ноль
// снизу вверх (локальный импульс возобновился).
public void checkMacdTrend(String symbol, List<Candle> candles) {
    var data = macdIndicator.calculate(candles);
    double macdLine = data.get("macdLine");
    double histogram = data.get("histogram");

    // Получаем предыдущее значение гистограммы для определения пробоя
    var prevData = macdIndicator.calculate(candles.subList(1, candles.size()));
    double prevHistogram = prevData.get("histogram");

    // ЛОГИКА: Тренд глобально бычий И гистограмма только что пробила ноль вверх
    if (macdLine > 0 && prevHistogram <= 0 && histogram > 0) {
        telegramService.sendMessage("🚀 " + symbol + ": Подтверждение бычьего тренда по MACD!");
    }
}

4. Дивергенция (Продвинутый уровень)
// Если цена ставит новый максимум, а MACD — нет, это «медвежья дивергенция» и сигнал о скором развороте тренда вниз.
// Это сложнее реализовать кодом (нужно хранить пики индикатора), но MACD для этого — лучший инструмент.

*/

