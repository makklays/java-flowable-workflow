package com.techmatrix18.service;

import com.techmatrix18.dto.SignalDto;
import com.techmatrix18.websocket.MarketDataWebSocketServer;
import org.springframework.stereotype.Service;

/**
 * Web Socket Service - Wrapping the WebSocket handler in a service for ease of use
 *
 * @author Alexander Kuziv
 * @since 18.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class WebSocketService {

    private final MarketDataWebSocketServer webSocketServer;

    public WebSocketService(MarketDataWebSocketServer webSocketServer) {
        this.webSocketServer = webSocketServer;
    }

    public void broadcastSignal(SignalDto signal) {
        webSocketServer.broadcastSignal(signal);
    }
}

