package com.techmatrix18.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Component;

/**
 * Controller for custom metrics management.
 *
 * @author Alexander Kuziv
 * @since 27.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Component
public class CustomMetrics {

    private final Counter myCounter;

    public CustomMetrics(MeterRegistry registry) {
        this.myCounter = Counter.builder("my_custom_event_total")
                .description("Total number of my custom events")
                .tag("application", "my-app")  // можно добавить теги
                .register(registry);
    }

    public void increment() {
        myCounter.increment();
    }
}

