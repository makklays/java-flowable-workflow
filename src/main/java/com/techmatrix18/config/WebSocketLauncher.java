package com.techmatrix18.config;

import com.techmatrix18.clients.BinanceKlineWebSocket;
import com.techmatrix18.rabbitmq.CandlePublisher;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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

    // Если монет < 10
    @Bean
    public CommandLineRunner startup(CandlePublisher candlePublisher) {
        return args -> {
            // Список конфигураций для запуска
            Map<String, Integer> coins = Map.of(
                "BTCUSDT", 1,
                "ETHUSDT", 2,
                "SOLUSDT", 42
            );

            coins.forEach((symbol, id) -> {
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

