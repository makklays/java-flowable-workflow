package com.techmatrix18.service;

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

    private static final String WEBHOOK_URL = "https://hooks.slack.com/services/XXX/YYY/ZZZ";

    public void sendSlackMessage(String text) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject(WEBHOOK_URL, Map.of("text", text), String.class);
    }
}

