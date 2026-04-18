package com.techmatrix18.config;

import com.techmatrix18.websocket.MarketDataWebSocketServer;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;

/**
 * Web Socket Config -
 *
 * @author Alexander Kuziv
 * @since 18.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final MarketDataWebSocketServer marketDataServer;

    public WebSocketConfig(MarketDataWebSocketServer marketDataServer) {
        this.marketDataServer = marketDataServer;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(marketDataServer, "/ws/signals").setAllowedOrigins("*"); // Для разработки разрешаем все источники
    }
}

