package com.techmatrix18.trading.rules;

import com.techmatrix18.model.Candle;
import com.techmatrix18.trading.indicators.VolumeProfileIndicator;

import java.util.List;

/**
 * PriceNearPOCRule checks if the current price is near the Point of Control (POC) level.
 *
 * Уровень POC — это психологическая отметка, где в прошлом было совершено больше всего сделок.
 * Те, кто не успел купить там раньше, часто выставляют свои лимитные ордера на покупку именно на этот уровень
 * при его повторном тестировании.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class PriceNearPOCRule implements Rule {
    private final VolumeProfileIndicator volumeProfile;
    private final int binCount;

    public PriceNearPOCRule(VolumeProfileIndicator volumeProfile, int binCount) {
        this.volumeProfile = volumeProfile;
        this.binCount = binCount;
    }

    @Override
    public boolean isSatisfied(List<Candle> candles) {
        if (candles.isEmpty()) return false;

        double currentPrice = candles.get(0).getClose().doubleValue();
        double pocPrice = volumeProfile.findPOC(candles, binCount);

        // Условие: цена в пределах 0.2% от уровня максимального объема
        return Math.abs(currentPrice - pocPrice) / pocPrice * 100 < 0.2;
    }
}

/*
Как использовать:

// В PriceNearPOCRule мы передаем 50. Это значит, что бот разделит весь ценовой диапазон (от High до Low за
// выбранный период) на 50 горизонтальных уровней. Чем больше это число, тем точнее, но медленнее расчет.
Rule atPOC = new PriceNearPOCRule(volumeProfileIndicator, 50);

*/

