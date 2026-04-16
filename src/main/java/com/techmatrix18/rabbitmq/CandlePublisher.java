package com.techmatrix18.rabbitmq;

import com.techmatrix18.config.RabbitConfig;
import com.techmatrix18.model.Candle;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

/**
 * Candle Publisher -
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
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, "price."+candle.getSymbolId(), candle);

        System.out.println("Sent to RabbitMQ: " + candle.getSymbolId() + " at " + candle.getCloseTime());
    }
}

