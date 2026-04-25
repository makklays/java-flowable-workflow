package com.techmatrix18.websocket;

import com.techmatrix18.dto.SignalDto;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Market Data Web Socket Server - ВебСокет Сервер для отправки цен и данных по символам в браузер (на фронт-енд)
 *
 * @author Alexander Kuziv
 * @since 18.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Component
public class MarketDataWebSocketServer extends TextWebSocketHandler {

    private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        sessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.remove(session);
    }

    // Тот самый метод, который вы будете вызывать
    public void broadcastSignal(SignalDto signal) {
        try {
            // 1. Превращаем объект в JSON-строку
            String jsonSignal = objectMapper.writeValueAsString(signal);

            // 2. Оборачиваем строку в TextMessage (это реализация WebSocketMessage)
            TextMessage message = new TextMessage(jsonSignal);

            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    // 3. Теперь sendMessage примет этот объект
                    session.sendMessage(message);
                }
            }
        } catch (Exception e) {
            // Логируем ошибку, если не удалось отправить
            System.err.println("Ошибка отправки сообщения: " + e.getMessage());
        }
    }

    // Универсальный метод для отправки любого объекта
    public void broadcast(Object data) {
        try {
            String json = objectMapper.writeValueAsString(data);
            TextMessage message = new TextMessage(json);
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(message);
                }
            }
        } catch (Exception e) {
            System.err.println("Ошибка трансляции: " + e.getMessage());
        }
    }
}

