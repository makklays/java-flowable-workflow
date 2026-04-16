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

    public static final String EXCHANGE = "price.exchange";

    @Bean
    public TopicExchange priceExchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue binanceQueue() {
        // Теперь это класс Spring, и он создастся без ошибок
        return new Queue("binance.prices", true);
    }

    @Bean
    public Jackson2JsonMessageConverter converter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Binding binding(Queue binanceQueue, TopicExchange priceExchange) {
        // Используем "price.#", где # означает "любые слова после точки"
        // Таким образом, сообщения price.1, price.BTCUSDT и т.д. попадут в эту очередь
        return BindingBuilder
                .bind(binanceQueue)
                .to(priceExchange)
                .with("price.#");
    }
}

