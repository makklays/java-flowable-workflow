package com.techmatrix18.trading;

import com.techmatrix18.model.Candle;
import com.techmatrix18.service.TelegramService;
import com.techmatrix18.trading.indicators.*;
import com.techmatrix18.trading.rules.*;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * StrategyService is responsible for managing trading strategies, including their creation, execution, and performance tracking.
 * StrategyService — это «мозг», который принимает торговые решения.
 * Использование комбинации правил Rule через .and() и .or() для создания конкретной стратегии «Вход» и «Выход», управление рисками.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class StrategyService {
    private final RsiIndicator rsiIndicator = new RsiIndicator();
    private final BollingerIndicator bollingerIndicator;
    private final FibonacciIndicator fibonacciIndicator;
    private final VolumeProfileIndicator volumeProfileIndicator; // Период для расчета профиля объема

    private final AtrIndicator atr14 = new AtrIndicator(14);
    private final SmaIndicator sma200 = new SmaIndicator(200);
    private final MacdIndicator macd = new MacdIndicator(12, 26, 9);
    private final TelegramService telegramService;

    public StrategyService(BollingerIndicator bollingerIndicator, FibonacciIndicator fibonacciIndicator, VolumeProfileIndicator volumeProfileIndicator, TelegramService telegramService) {
        this.bollingerIndicator = bollingerIndicator;
        this.fibonacciIndicator = fibonacciIndicator;
        this.volumeProfileIndicator = volumeProfileIndicator;
        this.telegramService = telegramService;
    }

    // Соберем полноценную торговую систему.
    // Допустим, мы хотим покупать при сильном откате к Фибоначчи и продавать при перекупленности.
    public void runLogic(String symbol, List<Candle> candles) {
        // --- СТРАТЕГИЯ ВХОДА (BUY) ---
        // 1. RSI ниже 30 (зона перепроданности)
        Rule rsiOversold = new UnderIndicatorRule(rsiIndicator, 30.0);
        // 2. Цена пробила среднюю Боллинджера вверх
        Rule bbCrossUp = new CrossedUpRule(bollingerIndicator);

        Rule entrySignal = rsiOversold.and(bbCrossUp);

        if (entrySignal.isSatisfied(candles)) {
            telegramService.sendMessage("✅ ВХОД " + symbol + ": RSI внизу + Пробой Боллинджера!");
        }

        // --- СТРАТЕГИЯ ВЫХОДА (SELL) ---
        // 1. RSI пробил 70 сверху вниз (выход из перекупленности)
        Rule rsiExit = new CrossedDownRule(rsiIndicator, 70.0);
        // 2. ИЛИ цена коснулась верхнего уровня Фибо (0.236)
        // (Для этого нужно создать правило PriceNearRule, как мы обсуждали ранее)

        if (rsiExit.isSatisfied(candles)) {
            telegramService.sendMessage("❌ ВЫХОД " + symbol + ": RSI сигнализирует о развороте!");
        }
    }

    // Проверим только входные сигналы для простоты - пример
    public void checkEntry(List<Candle> candles) {
        // Правило 1: Цена пробила среднюю Боллинджера вверх
        Rule crossedBollinger = new CrossedUpRule(bollingerIndicator);

        // Правило 2: RSI ниже 30 (перепроданность)
        Rule rsiLow = new UnderIndicatorRule(rsiIndicator, 30);

        // ОБЪЕДИНЯЕМ: Входить, если пробили Боллинджер И при этом RSI был низким
        Rule entryStrategy = crossedBollinger.and(rsiLow);

        if (entryStrategy.isSatisfied(candles)) {
            telegramService.sendMessage("🎯 СИГНАЛ НА ВХОД: Боллинджер пробит + RSI подтверждает!");
        }
    }

    // Добавим еще один пример для MACD + Фибоначчи
    public void checkEntryMACD(List<Candle> candles) {
        // 1. Цена коснулась уровня Фибо 0.618
        Rule nearFib = new PriceNearFibRule(fibonacciIndicator, "level_618");

        // 2. Используем обновленный MacdRule с перечислением
        // Условие ABOVE_ZERO как раз проверяет, что гистограмма > 0
        Rule macdPositive = new MacdRule(macd, MacdRule.MacdCondition.ABOVE_ZERO);

        // ОБЪЕДИНЯЕМ
        Rule fibMacdStrategy = nearFib.and(macdPositive);

        if (fibMacdStrategy.isSatisfied(candles)) {
            telegramService.sendMessage("🎯 СИГНАЛ: Отскок от Фибо + MACD подтверждает рост!");
        }
    }

    // Профессиональная стратегия: Тренд + Поддержка + Сигнал.
    // Покупаем, если тренд глобально растущий, цена откатилась к Фибо, а импульс только что подтвердился пересечением.
    public void checkProfessionalStrategy(List<Candle> candles) {
        // Глобальный тренд (Линия MACD выше 0)
        Rule trendIsUp = new MacdRule(macd, MacdRule.MacdCondition.MACD_ABOVE_ZERO);

        // Цена у поддержки (Фибо 0.618)
        Rule fibSupport = new PriceNearFibRule(fibonacciIndicator, "level_618");

        // Точка входа (Пересечение линий MACD вверх)
        Rule entryPoint = new MacdRule(macd, MacdRule.MacdCondition.CROSS_UP);

        // Итоговое правило: ТРЕНД + ПОДДЕРЖКА + СИГНАЛ
        Rule fullStrategy = trendIsUp.and(fibSupport).and(entryPoint);

        if (fullStrategy.isSatisfied(candles)) {
            telegramService.sendMessage("💎 СИГНАЛ ВЫСОКОЙ ТОЧНОСТИ: Тренд подтвержден, вход от Фибо!");
        }
    }

    // Сигнал на выход - проверим, не выдыхается ли тренд. Если RSI в зоне перекупленности И импульс MACD затухает — пора фиксировать прибыль.
    public void checkExitStrategy(List<Candle> candles) {
        // 1. Условие: Мы находимся в зоне перекупленности по RSI (> 70)
        Rule overbought = new OverIndicatorRule(rsiIndicator, 70.0);

        // 2. Условие: Импульс MACD начал затухать (столбики гистограммы начали уменьшаться)
        Rule momentumFading = new MacdRule(macd, MacdRule.MacdCondition.HIST_DECREASING);

        // СИГНАЛ: Если рынок перегрет И импульс слабеет — пора выходить
        if (overbought.and(momentumFading).isSatisfied(candles)) {
            telegramService.sendMessage("⚠️ ВНИМАНИЕ: Тренд выдыхается. Рекомендуется фиксация прибыли.");
        }
    }

    // Проверим стратегию, основанную на объеме. Если цена подошла к уровню с большим объемом (POC) И RSI подтверждает перепроданность — ждем отскок.
    // Самая эффективная тактика — искать отскок от POC при подтверждении от осциллятора (например, RSI).
    public void checkVolumeStrategy(List<Candle> candles) {
        // 1. Цена подошла к самому проторгованному уровню (POC)
        Rule atPOC = new PriceNearPOCRule(volumeProfileIndicator, 50);

        // 2. RSI показывает перепроданность (цена дешевая)
        Rule rsiLow = new UnderIndicatorRule(rsiIndicator, 30.0);

        // СТРАТЕГИЯ: Покупаем, если цена у сильного горизонтального объема И RSI подтверждает перепроданность
        if (atPOC.and(rsiLow).isSatisfied(candles)) {
            telegramService.sendMessage("📊 СИГНАЛ: Цена на уровне максимального объема (POC) + RSI перепродан. Ожидаем отскок!");
        }
    }

    // Этот метод демонстрирует, как можно объединить несколько правил для создания комплексного анализа.
    // Например, мы можем создать стратегию, которая требует одновременного выполнения нескольких условий
    // для входа в позицию.
    public void executeFullAnalysis(String symbol, List<Candle> candles) {
        // 1. СТРАТЕГИЯ ВХОДА (BUY)
        // Покупаем, если MACD пересекся вверх + RSI низкий + цена у уровня Фибо
        Rule buySignal = new MacdRule(macd, MacdRule.MacdCondition.CROSS_UP)
                .and(new UnderIndicatorRule(rsiIndicator, 40.0))
                .and(new PriceNearFibRule(fibonacciIndicator, "level_618"));

        if (buySignal.isSatisfied(candles)) {
            telegramService.sendMessage("🚀 [" + symbol + "] СИГНАЛ НА ВХОД: MACD Cross + Fib 0.618 + RSI low");
        }

        // 2. СТРАТЕГИЯ ВЫХОДА (SELL / EXIT)
        // Выходим, если:
        // - MACD пересекся вниз (разворот тренда)
        // - ИЛИ RSI стал слишком высоким (перекупленность > 70)
        // - ИЛИ цена коснулась верхнего уровня сопротивления Фибо (0.236)
        Rule sellSignal = new MacdRule(macd, MacdRule.MacdCondition.CROSS_DOWN)
                .or(new OverIndicatorRule(rsiIndicator, 70.0))
                .or(new PriceNearFibRule(fibonacciIndicator, "level_236"));

        if (sellSignal.isSatisfied(candles)) {
            telegramService.sendMessage("⚠️ [" + symbol + "] СИГНАЛ НА ВЫХОД: Тренд ослаб или достигнута цель");
        }
    }
}

/*
Как использовать:

// Цена пробила среднюю Боллинджера вверх
Rule rule1 = new CrossedUpRule(bollinger);

// RSI выше 30
Rule rule2 = new OverIndicatorRule(rsi, 30.0);

// Итоговая стратегия
Rule entryRule = rule1.and(rule2);

*/

