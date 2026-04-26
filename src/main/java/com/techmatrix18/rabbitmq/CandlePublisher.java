package com.techmatrix18.rabbitmq;

import com.techmatrix18.config.RabbitConfig;
import com.techmatrix18.model.Candle;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

/**
 * Candle Publisher - служба для публикации данных в RabbitMQ.
 *
 * Использую RabbitTemplate для отправки сообщений в RabbitMQ.
 * Этот класс будет вызываться из WebSocket-клиента, который получает данные от Binance.
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 16.04.2026
 * @version 0.0.1
 */
@Service
public class CandlePublisher {

    private final RabbitTemplate rabbitTemplate;

    public CandlePublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishCandle(Candle candle) {
        // Мы отправляем в ваш EXCHANGE.
        // Routing Key сделаем таким же, как имя очереди для простоты,
        // или "price.btc", если хотим использовать Topic-фильтры.
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE_PRICES, "price."+candle.getSymbolId(), candle);

        //System.out.println("Sent to RabbitMQ: " + candle.getSymbolId() + " at " + candle.getCloseTime());
    }

    public void publishTick(String symbol, Long symbolId, double bid, double ask) {
        double spread = ask - bid;
        if (spread <= 0) {
            // Логируем аномалию, но не шлем битые данные
            // System.err.println("Аномальный спред для " + symbol + ": " + spread);
            return;
        }

        // Создаем простую структуру данных (можно сделать класс-DTO Tick, как Candle)
        Map<String, Object> tick = new HashMap<>();
        tick.put("type", "BID_ASK"); // type для frontend, чтобы он понимал, что это не свеча, а тик
        tick.put("symbol", symbol);
        tick.put("id", symbolId);
        tick.put("bid", bid);
        tick.put("ask", ask);

        // Используем BigDecimal для точности, чтобы избежать 0.000000000014
        tick.put("spread", BigDecimal.valueOf(spread).setScale(10, RoundingMode.HALF_UP));

        tick.put("timestamp", System.currentTimeMillis());

        // Отправляем с другим Routing Key, например "tick.1", "tick.2" и т.д.
        // Это позволит RabbitMQ направить их в другую очередь
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE_BID_ASK, "tick." + symbolId, tick);

        // Лог (лучше сделать тихим, так как тиков много)
        //System.out.println("Sent to Tick: " + symbol + " Bid: " + bid + " Ask: " + ask + " Spread: " + tick.get("spread"));
    }
}

