package com.techmatrix18.service;

import com.pengrad.telegrambot.request.SendPhoto;
import com.pengrad.telegrambot.response.SendResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.util.Map;

/**
 * TelegramService - это сервис для отправки сообщений в Telegram,
 * который используется для уведомлений о торговых сигналах и результатах анализа.
 *
 * @author Alexander Kuziv
 * @since 15.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class TelegramService {
    @Value("${TELEGRAM_BOT_TOKEN}")
    private String botToken;

    @Value("${TELEGRAM_CHAT_ID}")
    private String chatId;

    public void sendMessage(String message) {
        String url = String.format("https://telegram.org", botToken, chatId, message);

        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            System.err.println("Ошибка Telegram: " + e.getMessage());
        }
    }

    /*public void sendPhoto(Long chatId, String imagePath, String caption) {
        java.io.File photoFile = new java.io.File(imagePath);
        if (!photoFile.exists()) {
            System.err.println("File not found: " + imagePath);
            return;
        }
        SendPhoto request = new SendPhoto(chatId, photoFile).caption(caption);
        SendResponse response = myBot.getInternalBot().execute(request);
        if (!response.isOk()) {
            System.err.println("Failed to send photo: " + response.description());
        }
    }

    public void sendPhotoStream(Long chatId, InputStream inputStream, String fileName, String caption) {
        SendPhoto request = new SendPhoto(chatId, inputStream.toString().getBytes()).caption(caption);
        SendResponse response = myBot.getInternalBot().execute(request);
        if (!response.isOk()) {
            System.err.println("Failed to send photo stream: " + response.description());
        }
    }*/
}

