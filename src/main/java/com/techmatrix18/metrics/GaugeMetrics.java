package com.techmatrix18.metrics;

import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Component;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Controller for gauge metrics management.
 *
 * @author Alexander Kuziv
 * @since 27.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Component
public class GaugeMetrics {

    private final AtomicInteger currentValue = new AtomicInteger(0);

    public GaugeMetrics(MeterRegistry registry) {
        Gauge.builder("my_custom_gauge", currentValue, AtomicInteger::get)
                .description("Current value of my custom gauge")
                .tag("application", "my-app")
                .register(registry);
    }

    public void setValue(int value) {
        currentValue.set(value);
    }
}

