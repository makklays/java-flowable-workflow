package com.techmatrix18.telegram;

import jakarta.ws.rs.core.MediaType;
import org.flywaydb.core.internal.resource.filesystem.FileSystemResource;
import org.glassfish.grizzly.http.HttpHeader;
import org.nd4j.common.util.LinkedMultiValueMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.File;
import java.util.HashMap;
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

    @Value("${TELEGRAM_CHAT_ID_FOR_ALL}")
    private String chatIdForAll;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Отправка персонального сообщения по ChatId
     *
     * @param message
     */
    public void sendMessageForOne(String message) {
        String url = String.format("https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s", botToken, chatId, message);

        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            System.err.println("Ошибка Telegram: " + e.getMessage());
        }
    }

    /**
     * Отправка сообщения всем в канале Телеграм по ChannelId
     *
     * @param message
     */
    public void sendMessageForAll(String message) {
        String url = String.format("https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s", botToken, chatIdForAll, message);

        try {
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            System.err.println("Ошибка Telegram: " + e.getMessage());
        }
    }

    /*public void sendPhoto(String photoUrl, String caption) {
        // Используем правильный метод API — sendPhoto
        String url = String.format("https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s", botToken);

        // Собираем тело запроса в Map
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("chat_id", chatId);
        requestBody.put("photo", photoUrl);
        requestBody.put("caption", caption);

        try {
            RestTemplate restTemplate = new RestTemplate();
            // Отправляем POST-запрос с JSON/телом, что решает проблемы с кодированием символов
            String response = restTemplate.postForObject(url, requestBody, String.class);
            // При необходимости можно залогировать ответ: System.out.println(response);
        } catch (Exception e) {
            System.err.println("Ошибка Telegram при отправке фото: " + e.getMessage());
        }
    }*/

    /**
     * Пример работы с restTemplate и добавление своих переменных в Header (можно удалить !)
     *
     * @param url
     * @return
     */
    public String exampleMethod(String url) {
        // 1. Создаем объект заголовков
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-My-Keyword", "1111-2222-3333-4444");      // my custom header
        headers.set("Authorization", "Bearer my-secret-token");
        headers.set("Accept", "application/json");               // indicate that I wait json

        // 2. Упаковываем заголовки в HttpEntity (тело запроса null, так как это GET)
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            // 3. Выполняем запрос через exchange
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            // Сервер вернул JSON: {"id": 1, "name": "Alex"}
            // Внутри будет обычная строка: "{\"id\": 1, \"name\": \"Alex\"}" потому что String.class
            String jsonText = response.getBody();
            return jsonText;

            // Сервер вернул тот же JSON, но Jackson сам конвертирует его в объект
            /*ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.GET, entity, User.class);
            User user = response.getBody();
            System.out.println(user.getName()); // Работаем сразу с объектом, а не с текстом! */

        } catch (Exception e) {
            System.err.println("Ошибка при выполнении запроса: " + e.getMessage());
            return null;
        }
    }
}

