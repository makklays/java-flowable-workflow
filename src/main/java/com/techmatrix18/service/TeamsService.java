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
public class TeamsService {

    // input your url
    private static final String TEAMS_WEBHOOK_URL = "https://outlook.office.com/webhook/XXXXXXXXX/IncomingWebhook/YYYYYYYY/ZZZZZZZ";

    public void sendMessage(String message) {
        RestTemplate restTemplate = new RestTemplate();

        // Microsoft Teams wait JSON with key "text"
        Map<String, String> payload = Map.of("text", message);

        restTemplate.postForObject(TEAMS_WEBHOOK_URL, payload, String.class);
    }
}

