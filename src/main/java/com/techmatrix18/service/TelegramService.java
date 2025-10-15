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
public class TelegramService {

    private static final String BOT_TOKEN = "YOUR_BOT_TOKEN";
    private static final String CHAT_ID = "YOUR_CHAT_ID"; // your ID or group
    private static final String URL = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";

    public void sendMessage(String message) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForObject(
                URL,
                Map.of("chat_id", CHAT_ID, "text", message),
                String.class
        );
    }
}

