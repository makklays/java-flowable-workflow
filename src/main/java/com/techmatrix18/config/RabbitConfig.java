package com.techmatrix18.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;

/**
 * Rabbit Config -
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 16.04.2026
 * @version 0.0.1
 */
@Configuration
public class RabbitConfig {

    public static final String EXCHANGE_PRICES = "price.exchange";
    public static final String EXCHANGE_BID_ASK = "tick.exchange";

    public static final String QUEUE_PRICES = "binance.prices";
    public static final String QUEUE_TICKS = "binance.ticks";

    @Bean
    public TopicExchange priceExchange() {
        return new TopicExchange(EXCHANGE_PRICES);
    }
    @Bean
    public TopicExchange bidAskExchange() {
        return new TopicExchange(EXCHANGE_BID_ASK);
    }

    @Bean
    public Queue binanceQueuePrices() {
        return new Queue(QUEUE_PRICES, true);
    }

    @Bean
    public Queue binanceQueueBidAsk() {
        return new Queue(QUEUE_TICKS, true);
    }

    @Bean
    public Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Binding bindingPrices(Queue binanceQueuePrices, TopicExchange priceExchange) {
        // Используем "price.#", где # означает "любые слова после точки"
        // Таким образом, сообщения price.1, price.BTCUSDT и т.д. попадут в эту очередь
        return BindingBuilder
            .bind(binanceQueuePrices)
            .to(priceExchange)
            .with("price.#");
    }

    @Bean
    public Binding bindingBidAsk(Queue binanceQueueBidAsk, TopicExchange bidAskExchange) {
        // Используем "tick.#", где # означает "любые слова после точки"
        // Таким образом, сообщения price.1, price.BTCUSDT и т.д. попадут в эту очередь
        return BindingBuilder
            .bind(binanceQueueBidAsk)
            .to(bidAskExchange)
            .with("tick.#");
    }
}

