package com.techmatrix18.trading.indicators;

import com.techmatrix18.trading.series.CandleSeries;

import java.util.*;

/**
 * VolumeProfileIndicator is a technical analysis tool that displays trading activity over a specified time period at specified price levels.
 * Volume Profile - рассчитает распределение объема по ценовым уровням.
 * POC (Point of Control) - ценовой уровень с наибольшим объемом торгов, который может служить важным уровнем поддержки или сопротивления.
 *
 * Volume Profile помогает трейдерам понять, на каких ценовых уровнях был сосредоточен объем торгов, что может указывать на важные уровни поддержки и сопротивления.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class VolumeProfileIndicator implements Indicator<Double> {
    private final int lookbackPeriod;
    private final int binCount;
    private List<Double> pocHistory = new ArrayList<>();

    public VolumeProfileIndicator(int lookbackPeriod, int binCount) {
        this.lookbackPeriod = lookbackPeriod;
        this.binCount = binCount;
    }

    // Метод расчета профиля для конкретного окна индексов
    public List<VolumeBin> calculateProfile(CandleSeries series, int start, int end) {
        if (series.size() == 0 || start > end) return Collections.emptyList();

        // 1. Находим границы диапазона в окне
        double minPrice = series.getLow(start);
        double maxPrice = series.getHigh(start);
        for (int i = start + 1; i <= end; i++) {
            if (series.getLow(i) < minPrice) minPrice = series.getLow(i);
            if (series.getHigh(i) > maxPrice) maxPrice = series.getHigh(i);
        }

        double range = maxPrice - minPrice;
        if (range <= 0) return Collections.emptyList();
        double step = range / binCount;

        // 2. Группируем объемы по корзинам (Bins)
        double[] profile = new double[binCount];
        for (int i = start; i <= end; i++) {
            double price = series.getClose(i);
            double volume = series.getCandle(i).getVolume().doubleValue();

            int binIndex = (int) ((price - minPrice) / step);
            if (binIndex >= binCount) binIndex = binCount - 1;
            if (binIndex < 0) binIndex = 0;
            profile[binIndex] += volume;
        }

        // 3. Формируем результат
        List<VolumeBin> result = new ArrayList<>();
        for (int i = 0; i < binCount; i++) {
            // Возвращаем середину корзины для точности POC
            double binPrice = minPrice + (i * step) + (step / 2);
            result.add(new VolumeBin(binPrice, profile[i]));
        }
        return result;
    }

    public double findPOC(CandleSeries series, int start, int end) {
        List<VolumeBin> bins = calculateProfile(series, start, end);
        return bins.stream()
            .max(Comparator.comparingDouble(VolumeBin::getVolume))
            .map(VolumeBin::getPrice)
            .orElse(0.0);
    }

    public void prepare(CandleSeries series) {
        pocHistory.clear();
        for (int i = 0; i < series.size(); i++) {
            int start = Math.max(0, i - lookbackPeriod + 1);
            // Считаем POC для окна [start, i]
            pocHistory.add(findPOC(series, start, i));
        }
    }

    @Override
    public Double calculate(CandleSeries series, int index) {
        int start = Math.max(0, index - lookbackPeriod + 1);
        return findPOC(series, start, index);
    }

    @Override
    public Double getValue(int index) {
        if (index < 0 || index >= pocHistory.size()) return 0.0;
        return pocHistory.get(index);
    }

    public static class VolumeBin {
        private final double price;
        private final double volume;
        public VolumeBin(double price, double volume) { this.price = price; this.volume = volume; }
        public double getPrice() { return price; }
        public double getVolume() { return volume; }
    }
}

/*
Как использовать:

1. Поиск Point of Control (POC) — уровня максимального объема
// Находим уровень максимального объема за последние 200 свечей, разделив диапазон на 50 уровней
double pocLevel = volumeProfileIndicator.findPOC(candles, 50);
// Пример использования: цена пробила уровень максимального объема вверх
Rule priceAbovePOC = new OverIndicatorRule((c) -> volumeProfileIndicator.findPOC(c, 50), 0.0);

2. Определение зон поддержки и сопротивления (PriceNearPOCRule)
// Создаем правило: цена находится в зоне POC (±0.2% от уровня)
Rule atPOCZone = new PriceNearPOCRule(volumeProfileIndicator, 50);
if (atPOCZone.isSatisfied(candles)) {
    telegramService.sendMessage("📊 Цена подошла к уровню максимального объема (POC). Ожидаем реакцию рынка!");
}

3. Комбинирование с осцилляторами (Подтвержденный отскок)
// Покупаем, если цена у POC И RSI < 30
Rule buyAtValueArea = new PriceNearPOCRule(volumeProfileIndicator, 50)
                      .and(new UnderIndicatorRule(rsiIndicator, 30.0));
if (buyAtValueArea.isSatisfied(candles)) {
    telegramService.sendMessage("🎯 СИГНАЛ: Отскок от объема подтвержден RSI!");
}

4. Подготовка данных для фронтенда
@GetMapping("/volume-profile")
public List<VolumeProfileIndicator.VolumeBin> getProfile(@RequestParam String symbol) {
    List<Candle> candles = repository.findTop200BySymbolOrderByTimestampDesc(symbol);
    // Возвращаем 30 горизонтальных корзин объема для отрисовки гистограммы
    return volumeProfileIndicator.calculateProfile(candles, 30);
}

*/

