package com.techmatrix18.trading;

import com.techmatrix18.model.Candle;
import com.techmatrix18.service.TelegramService;
import com.techmatrix18.trading.indicators.BollingerIndicator;
import com.techmatrix18.trading.indicators.FibonacciIndicator;
import com.techmatrix18.trading.indicators.RsiIndicator;
import com.techmatrix18.trading.rules.CrossedUpRule;
import com.techmatrix18.trading.rules.PriceNearFibRule;
import com.techmatrix18.trading.rules.Rule;
import com.techmatrix18.trading.rules.UnderIndicatorRule;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * SignalService is responsible for analyzing price movements and generating trading signals.
 * SignalService — это «глаза», которые видят технические факты
 * Используя правила и индикаторы - генерирую сигналы для входа и выхода из сделок, которые отправляются в Telegram.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class SignalService {

    private final RsiIndicator rsiIndicator;
    private final FibonacciIndicator fibonacciIndicator;
    private final BollingerIndicator bollingerIndicator;
    private final TelegramService telegramService;

    public SignalService(RsiIndicator rsiIndicator,
                         FibonacciIndicator fibonacciIndicator,
                         BollingerIndicator bollingerIndicator,
                         TelegramService telegramService) {
        this.rsiIndicator = rsiIndicator;
        this.fibonacciIndicator = fibonacciIndicator;
        this.bollingerIndicator = bollingerIndicator;
        this.telegramService = telegramService;
    }

    // Пример объединяет анализ Фибоначчи для генерации сигналов в Telegram
    public void checkFibonacciSignals(String symbol, List<Candle> candles) {
        // 1. Получаем уровни от индикатора
        Map<String, Double> levels = fibonacciIndicator.calculate(candles);

        double currentPrice = candles.get(0).getClose().doubleValue();
        double prevPrice = candles.get(1).getClose().doubleValue();
        double goldLevel = levels.get("level_618");

        // 2. Проверяем пробой "золотого сечения"
        if (isLevelBrokenDown(currentPrice, prevPrice, goldLevel)) {
            System.out.println("СИГНАЛ: Цена " + symbol + " пробила уровень 0.618 вниз!");
        }
    }

    // Метод проверяет, пересекла ли цена уровень сверху вниз (медвежий сигнал)
    public boolean isLevelBrokenDown(double currentPrice, double previousPrice, double levelPrice) {
        return previousPrice >= levelPrice && currentPrice < levelPrice;
    }

    // Метод проверяет, пересекла ли цена уровень снизу вверх (бычий сигнал)
    public boolean isLevelBrokenUp(double currentPrice, double previousPrice, double levelPrice) {
        return previousPrice <= levelPrice && currentPrice > levelPrice;
    }

    // Пример объединяет анализ Фибоначчи и Боллинджера для генерации сигналов в Telegram
    public void analyzeMarket(String symbol, List<Candle> candles) {
        double currentPrice = candles.get(0).getClose().doubleValue();
        double prevPrice = candles.get(1).getClose().doubleValue();

        // --- Анализ Фибоначчи ---
        var fibLevels = fibonacciIndicator.calculate(candles);
        double goldLevel = fibLevels.get("level_618");

        if (isCrossedUp(currentPrice, prevPrice, goldLevel)) {
            telegramService.sendMessage("🚀 " + symbol + " пробил вверх Фибо 0.618!");
        }

        // --- Анализ Боллинджера (Средняя линия) ---
        double basisLine = bollingerIndicator.calculate(candles);

        if (isCrossedUp(currentPrice, prevPrice, basisLine)) {
            telegramService.sendMessage("📈 " + symbol + " пробил среднюю линию Боллинджера вверх (смена тренда на бычий)");
        } else if (isCrossedDown(currentPrice, prevPrice, basisLine)) {
            telegramService.sendMessage("📉 " + symbol + " пробил среднюю линию Боллинджера вниз (смена тренда на медвежий)");
        }
    }

    // Этот метод демонстрирует, как можно объединить разные правила для генерации комплексных сигналов
    public void processSignals(String symbol, List<Candle> candles) {
        // 1. Описываем сигналы через ваши правила
        Rule rsiOversold = new UnderIndicatorRule(rsiIndicator, 30.0);
        Rule priceCrossUpBB = new CrossedUpRule(bollingerIndicator);
        Rule nearSupport = new PriceNearFibRule(fibonacciIndicator, "level_618");

        // 2. Проверяем и отправляем в Телеграм
        if (rsiOversold.isSatisfied(candles)) {
            telegramService.sendMessage("📉 " + symbol + ": RSI ниже 30. Зона перепроданности.");
        }

        if (priceCrossUpBB.isSatisfied(candles)) {
            telegramService.sendMessage("🚀 " + symbol + ": Пробой средней Боллинджера вверх!");
        }

        if (nearSupport.isSatisfied(candles)) {
            telegramService.sendMessage("🎯 " + symbol + ": Цена коснулась уровня Фибо 0.618.");
        }
    }

    private boolean isCrossedUp(double curr, double prev, double level) {
        return prev <= level && curr > level;
    }

    private boolean isCrossedDown(double curr, double prev, double level) {
        return prev >= level && curr < level;
    }
}

