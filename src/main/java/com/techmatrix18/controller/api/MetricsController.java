package com.techmatrix18.controller.api;

import com.techmatrix18.metrics.CustomMetrics;
import com.techmatrix18.metrics.GaugeMetrics;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for custom metrics management.
 * Provides endpoints to interact with custom metrics.
 *
 * @author Alexander Kuziv
 * @since 27.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "My metrics", description = "Some metrics for Prometheus Grafana")
@RequestMapping("/api/v1/metrics")
public class MetricsController {

    private final CustomMetrics customMetrics;
    private final GaugeMetrics gaugeMetrics;

    public MetricsController(CustomMetrics customMetrics, GaugeMetrics gaugeMetrics) {
        this.customMetrics = customMetrics;
        this.gaugeMetrics = gaugeMetrics;
    }

    @GetMapping("/increment")
    public String incrementCounter() {
        customMetrics.increment();
        return "Counter incremented!";
    }

    @GetMapping("/set-gauge/{value}")
    public String setGauge(@PathVariable int value) {
        gaugeMetrics.setValue(value);
        return "Gauge set to " + value;
    }
}

