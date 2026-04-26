package com.techmatrix18.trading;

import com.techmatrix18.dto.SignalDto;
import com.techmatrix18.model.Candle;
import com.techmatrix18.service.WebSocketService;
import com.techmatrix18.telegram.TelegramService;
import com.techmatrix18.trading.indicators.BollingerIndicator;
import com.techmatrix18.trading.indicators.FibonacciIndicator;
import com.techmatrix18.trading.indicators.RsiIndicator;
import com.techmatrix18.trading.rules.PriceNearFibRule;
import com.techmatrix18.trading.rules.Rule;
import com.techmatrix18.trading.rules.UnderIndicatorRule;
import com.techmatrix18.trading.series.CandleSeries;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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
    // Создаем индикаторы через new, а не ждем их от Spring
    private final RsiIndicator rsiIndicator = new RsiIndicator();
    private final FibonacciIndicator fibonacciIndicator = new FibonacciIndicator(100); // задайте нужный период
    private final BollingerIndicator bollingerIndicator = new BollingerIndicator(20, 2.0, "MIDDLE");
    // Добавьте остальные, если они там есть...
    private final StrategyService strategyService;
    private final TelegramService telegramService;
    private final WebSocketService webSocketService;

    public SignalService(StrategyService strategyService, TelegramService telegramService, WebSocketService webSocketService) {
        this.strategyService = strategyService;
        this.telegramService = telegramService;
        this.webSocketService = webSocketService;
    }

    // Пример объединяет анализ Фибоначчи для генерации сигналов в Telegram
    public void checkFibonacciSignals(String symbol, CandleSeries series) {
        // 1. Индекс последней свечи
        int lastIndex = series.size() - 1;
        if (lastIndex < 1) return; // Нужно минимум 2 свечи для анализа

        // 2. Рассчитываем уровни для текущего индекса
        Map<String, Double> levels = fibonacciIndicator.calculate(series, lastIndex);
        if (levels.isEmpty() || !levels.containsKey("level_618")) return;

        // 3. Используем методы интерфейса CandleSeries (getCandle или getClose)
        double currentPrice = series.getClose(lastIndex);
        double prevPrice = series.getClose(lastIndex - 1);
        double goldLevel = levels.get("level_618");

        // 4. Проверяем пробой "золотого сечения"
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
    public void analyzeMarket(String symbol, CandleSeries series) {
        // 1. Проверка на минимальное количество данных
        if (series.size() < 30) return;

        // 2. Определяем индексы (size - 1 это всегда самая свежая свеча)
        int currentIndex = series.size() - 1;
        int prevIndex = currentIndex - 1;

        // 3. ПОДГОТОВКА (Важно! Заполняем кэш индикаторов перед анализом)
        fibonacciIndicator.prepare(series);
        bollingerIndicator.prepare(series);

        // 4. Получаем актуальные цены
        double currentPrice = series.getClose(currentIndex);
        double prevPrice = series.getClose(prevIndex);

        // --- Анализ Фибоначчи ---
        // Берем уровни через getValue, так как мы вызвали prepare выше
        var fibLevels = fibonacciIndicator.getValue(currentIndex);
        if (fibLevels.containsKey("level_618")) {
            double goldLevel = fibLevels.get("level_618");

            // Используем логику пересечения
            if (prevPrice <= goldLevel && currentPrice > goldLevel) {
                telegramService.sendMessage("🚀 " + symbol + " пробил вверх Фибо 0.618!");
            }
        }

        // --- Анализ Боллинджера ---
        // Получаем значения средней линии для текущей и предыдущей свечи
        double basisLine = bollingerIndicator.getValue(currentIndex);
        double prevBasisLine = bollingerIndicator.getValue(prevIndex);

        if (prevPrice <= prevBasisLine && currentPrice > basisLine) {
            telegramService.sendMessage("📈 " + symbol + " пробил среднюю линию Боллинджера вверх");
        } else if (prevPrice >= prevBasisLine && currentPrice < basisLine) {
            telegramService.sendMessage("📉 " + symbol + " пробил среднюю линию Боллинджера вниз");
        }
    }

    // Этот метод демонстрирует, как можно объединить разные правила для генерации комплексных сигналов
    public void processSignals(String symbolName, CandleSeries series) {
        int lastIndex = series.size() - 1;
        // Для CrossedUpRule нужны минимум 2 свечи (текущая и предыдущая)
        if (lastIndex < 1) return;

        // 2. Наполняем историю индикаторов данными из текущей серии
        rsiIndicator.prepare(series);
        bollingerIndicator.prepare(series);
        fibonacciIndicator.prepare(series);

        // 3. Создаем правила (исправлено добавлением series в nearSupport)
        Rule rsiOversold = new UnderIndicatorRule(rsiIndicator, 30.0);

        // ВАЖНО: Добавлена series первым аргументом, как требует твой класс PriceNearFibRule
        Rule nearSupport = new PriceNearFibRule(series, fibonacciIndicator,"level_618", 0.001);

        // 4. Проверка условий
        if (rsiOversold.isSatisfied(lastIndex)) {
            String text = "📉 " + symbolName + ": RSI ниже 30. Зона перепроданности.";
            telegramService.sendMessage(text);

            // Получаем саму свечу (объект Candle) и Берем цену закрытия (BigDecimal)
            Candle lastCandle = series.getCandle(lastIndex);
            BigDecimal currentPrice = lastCandle.getClose();
            // Send in WebSocket - WebSocket integration for real-time signal notifications via toasts
            webSocketService.broadcastSignal(new SignalDto(System.currentTimeMillis(), symbolName,"SIGNAL", currentPrice, text));
            System.out.println("----- web socket RSI: send to websocket signal: " + text);
        }

        /*if (nearSupport.isSatisfied(lastIndex)) {
            String text = "🎯 " + symbol + ": Цена подошла к уровню Фибо 0.618.";
            telegramService.sendMessage(text);

            // Получаем саму свечу (объект Candle) и Берем цену закрытия (BigDecimal)
            Candle lastCandle = series.getCandle(lastIndex);
            BigDecimal currentPrice = lastCandle.getClose();
            // Send in WebSocket - WebSocket integration for real-time signal notifications via toasts
            webSocketService.broadcastSignal(new SignalDto(System.currentTimeMillis(), symbolName, "SIGNAL", currentPrice, text));
            System.out.println("----- web socket FIBO: send to websocket signal: " + text);
        }*/
    }

    private boolean isCrossedUp(double curr, double prev, double level) {
        return prev <= level && curr > level;
    }

    private boolean isCrossedDown(double curr, double prev, double level) {
        return prev >= level && curr < level;
    }
}

