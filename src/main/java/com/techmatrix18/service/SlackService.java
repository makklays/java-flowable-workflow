package com.techmatrix18.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

/**
 * @author Alexander Kuziv
 * @since 15.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class SlackService {

    @Value("${slack.webhook.url}")
    private String WEBHOOK_URL;

    public void sendSlackMessage(String text) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject(WEBHOOK_URL, Map.of("text", text), String.class);
    }
}

