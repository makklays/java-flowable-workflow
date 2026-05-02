package com.techmatrix18.config;

import com.techmatrix18.clients.BinanceKlineWebSocket;
import com.techmatrix18.rabbitmq.CandlePublisher;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static java.util.Map.entry;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * WebSocketLauncher -
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 16.04.2026
 * @version 0.0.1
 */
@Configuration
public class WebSocketLauncher {

    private final Map<String, Integer> symbols = Map.ofEntries(
        entry("BTCUSDT", 1),
        entry("ETHUSDT", 2),
        entry("BCHUSDT", 3),
        entry("XRPUSDT", 4),
        entry("LTCUSDT", 5),
        entry("TRXUSDT", 6),
        entry("ETCUSDT", 7),
        entry("LINKUSDT", 8),
        entry("XLMUSDT", 9),
        entry("ADAUSDT", 10),
        entry("DASHUSDT", 12),
        entry("ATOMUSDT", 16),
        entry("NEOUSDT", 21),
        entry("ALGOUSDT", 25),
        entry("COMPUSDT", 29),
        entry("SOLUSDT", 42)
    );

    // Если монет < 10 - можно запускать по одной в отдельных потоках.
    // Получаю 1 минутные свечи для каждой монеты
    @Bean
    public CommandLineRunner startup(CandlePublisher candlePublisher) {
        return args -> {
            // Список монет из переменной
            // TODO: вынести в конфиг или базу, чтобы не менять код при добавлении монет
            symbols.forEach((symbol, id) -> {
                CompletableFuture.runAsync(() -> {
                    try {
                        System.out.println(">>> Запуск потока для: " + symbol);
                        BinanceKlineWebSocket client = new BinanceKlineWebSocket(symbol, id, "1m", candlePublisher);
                        client.connect(symbol, "1m");
                    } catch (Exception e) {
                        System.err.println("Ошибка в сокете для " + symbol + ": " + e.getMessage());
                    }
                });
            });

            System.out.println(">>> Все WebSocket подключения инициированы в фоновых потоках");
        };
    }

    // Один клиент для всех монет (через комбинированный поток) - лучше для большого количества монет.
    // Получаю bid и ask для списка монет
    @Bean
    public CommandLineRunner startupCombined(CandlePublisher candlePublisher) {
        return args -> {
            // 1. Берем любую монету как "стартовую" (для конструктора)
            String firstSymbol = symbols.keySet().iterator().next();

            // 2. Создаем ОДИН клиент
            // ВАЖНО: передайте в конструктор или метод саму карту 'coins',
            // чтобы внутри onMessage вы могли делать: candle.setSymbolId(coins.get(currentSymbol))
            // TODO: переделать конструктор, чтобы он был универсальным для обеих функций
            BinanceKlineWebSocket client = new BinanceKlineWebSocket(firstSymbol, 1, "1m", candlePublisher);

            // 3. Запускаем ОДНО комбинированное соединение для всех монет сразу
            client.connectCombined(symbols);
        };
    }

    // ПРОГРЕВ ИСТОРИИ ДЛЯ ВСЕХ МОНЕТ ПЕРЕД ЗАПУСКОМ WEBSOCKET
    // важно для корректной работы индикаторов с самого начала
    /*@Bean
    public CommandLineRunner startupWarmUpSymbols(CandlePublisher candlePublisher) {
        return args -> {
            // 1. Берем первый символ для инициализации (как у вас и было)
            String firstSymbol = symbols.keySet().iterator().next();
            // 2. Создаем ОДИН клиент для всех монет
            BinanceKlineWebSocket client = new BinanceKlineWebSocket(firstSymbol, 1, "1m", candlePublisher);
            // --- ДОБАВЛЯЕМ ЭТОТ БЛОК ---
            System.out.println(">>> Инициализация индикаторов: загрузка истории для " + symbols.size() + " монет...");
            // Прогреваем историю через REST API для всех 16 монет
            client.warmUpAll(symbols.keySet());
            System.out.println(">>> Индикаторы прогреты. Запуск WebSocket...");
            // ---------------------------
            // 3. Запускаем ОДНО комбинированное соединение
            client.connectCombined(symbols);
        };
    }*/

    // ПРОГРЕВ ИСТОРИИ ДЛЯ ВСЕХ МОНЕТ ПЕРЕД ЗАПУСКОМ WEBSOCKET - 15m
    // важно для корректной работы индикаторов с самого начала
    @Bean
    public CommandLineRunner startupM15(CandlePublisher publisher) {
        return args -> {
            BinanceKlineWebSocket clientM15 = new BinanceKlineWebSocket("BTC", 1, "15m", publisher);
            System.out.println(">>> Инициализация индикаторов 15m: загрузка истории для " + symbols.size() + " символа...");
            clientM15.warmUpAll(symbols.keySet()); // Прогреет M15
            System.out.println(">>> Индикаторы прогреты 15m. Запуск WebSocket...");
            clientM15.connectCombined(symbols);    // Слушает M15
        };
    }

    // ПРОГРЕВ ИСТОРИИ ДЛЯ ВСЕХ МОНЕТ ПЕРЕД ЗАПУСКОМ WEBSOCKET - 1h
    // важно для корректной работы индикаторов с самого начала
    @Bean
    public CommandLineRunner startupH1(CandlePublisher publisher) {
        return args -> {
            BinanceKlineWebSocket clientH1 = new BinanceKlineWebSocket("BTC", 1, "1h", publisher);
            System.out.println(">>> Инициализация индикаторов 1h: загрузка истории для " + symbols.size() + " символа...");
            clientH1.warmUpAll(symbols.keySet());  // Прогреет H1
            System.out.println(">>> Индикаторы прогреты 1h. Запуск WebSocket...");
            clientH1.connectCombined(symbols);     // Слушает H1
        };
    }

    // ПРОГРЕВ ИСТОРИИ ДЛЯ ВСЕХ МОНЕТ ПЕРЕД ЗАПУСКОМ WEBSOCKET - 1d
    // важно для корректной работы индикаторов с самого начала
    @Bean
    public CommandLineRunner startupD1(CandlePublisher publisher) {
        return args -> {
            BinanceKlineWebSocket clientD1 = new BinanceKlineWebSocket("BTC", 1, "1d", publisher);
            System.out.println(">>> Инициализация индикаторов 1d: загрузка истории для " + symbols.size() + " символа...");
            clientD1.warmUpAll(symbols.keySet());  // Прогреет D1
            System.out.println(">>> Индикаторы прогреты 1d. Запуск WebSocket...");
            clientD1.connectCombined(symbols);     // Слушает D1
        };
    }

    // Если монет > 20
    /*@Bean
    public CommandLineRunner startup(CandlePublisher candlePublisher) {
        return args -> {
            List<String> symbols = List.of("BTCUSDT", "ETHUSDT", "SOLUSDT");

            for (String symbol : symbols) {
                // Создаем и подключаем
                BinanceKlineWebSocket client = new BinanceKlineWebSocket(symbol, 1, "1m", candlePublisher);
                client.connect(symbol, "1m");
            }

            System.out.println(">>> Запущено потоков: " + symbols.size());
        };
    }*/
}

