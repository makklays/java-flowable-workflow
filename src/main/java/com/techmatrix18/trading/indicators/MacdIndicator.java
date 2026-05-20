package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

import java.util.*;

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
public class MacdIndicator implements Indicator<Map<String, Double>> {
    private final EmaIndicator fastEma;
    private final EmaIndicator slowEma;
    private final int signalPeriod;

    private List<Map<String, Double>> history = new ArrayList<>();

    public MacdIndicator(int fastPeriod, int slowPeriod, int signalPeriod) {
        this.fastEma = new EmaIndicator(fastPeriod);
        this.slowEma = new EmaIndicator(slowPeriod);
        this.signalPeriod = signalPeriod;
    }

    public void prepare(CandleSeries series) {
        history.clear();
        if (series.size() == 0) return;

        // 1. Подготавливаем базовые EMA линии (они уже работают с CandleSeries)
        fastEma.prepare(series);
        slowEma.prepare(series);

        // 2. Рассчитываем MACD Line и Signal Line
        double multiplier = 2.0 / (signalPeriod + 1);

        // Начальное значение Signal Line (первая разница EMA)
        double currentSignalLine = fastEma.getValue(0) - slowEma.getValue(0);

        for (int i = 0; i < series.size(); i++) {
            double macdLine = fastEma.getValue(i) - slowEma.getValue(i);

            // Signal Line — это EMA от самой MACD Line
            currentSignalLine = (macdLine - currentSignalLine) * multiplier + currentSignalLine;

            Map<String, Double> point = new HashMap<>();
            point.put("macdLine", macdLine);
            point.put("signalLine", currentSignalLine);
            point.put("histogram", macdLine - currentSignalLine);

            history.add(point);
        }
    }

    @Override
    public Map<String, Double> getValue(int index) {
        if (index < 0 || index >= history.size()) return Collections.emptyMap();
        return history.get(index);
    }

    @Override
    public Map<String, Double> calculate(CandleSeries series, int index) {
        // Если данных в кэше нет для этого индекса, запускаем подготовку
        if (history.size() <= index) {
            prepare(series);
        }
        return getValue(index);
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
        telegramService.sendMessageForAll("🚀 " + symbol + ": Подтверждение бычьего тренда по MACD!");
    }
}

4. Дивергенция (Продвинутый уровень)
// Если цена ставит новый максимум, а MACD — нет, это «медвежья дивергенция» и сигнал о скором развороте тренда вниз.
// Это сложнее реализовать кодом (нужно хранить пики индикатора), но MACD для этого — лучший инструмент.

*/

