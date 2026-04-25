package com.techmatrix18.rabbitmq;

import com.techmatrix18.model.Candle;
import com.techmatrix18.service.PriceStorage;
import com.techmatrix18.trading.SignalService;
import com.techmatrix18.trading.series.LiveCandleSeries;
import com.techmatrix18.websocket.MarketDataWebSocketServer;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Candle Listener - слушатель RabbitMQ для получения свечей и анализа сигналов.
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 16.04.2026
 * @version 0.0.1
 */
@Service
public class CandleListener {

    private final SignalService signalService;
    private final PriceStorage priceStorage;
    private final MarketDataWebSocketServer webSocketServer;

    // Используем LiveCandleSeries в качестве значения
    private final Map<String, LiveCandleSeries> seriesMap = new ConcurrentHashMap<>();

    public CandleListener(SignalService signalService, PriceStorage priceStorage, MarketDataWebSocketServer webSocketServer) {
        this.signalService = signalService;
        this.priceStorage = priceStorage;
        this.webSocketServer = webSocketServer;
    }

    @RabbitListener(queues = "binance.prices")
    public void onMessage(Candle candle) {
        // Получаем или создаем серию для конкретного символа
        String symbolId = candle.getSymbolId().toString();
        String symbolName = candle.getSymbol();

        // Обновляем цену для аналитики сделок в PriceStorage,
        // используем цену закрытия свечи (closePrice) как текущую рыночную цену
        priceStorage.updatePrice(symbolId, candle.getClose());

        // Теперь создаем LiveCandleSeries и задаем maxSize (например, 200)
        LiveCandleSeries series = seriesMap.computeIfAbsent(symbolId, k -> new LiveCandleSeries(200));

        // Добавляем свечу (метод addCandle сам удалит старую, если превышен лимит)
        series.addCandle(candle);

        // ОТПРАВЛЯЕМ ЦЕНУ НА ФРОНТЕНД
        // Можно отправить всю свечу целиком
        webSocketServer.broadcast(candle);
        // Или отправить специально созданный DTO, если фронт ждет другой формат
        // webSocketServer.broadcast(new PriceUpdateDto(symbolId, candle.getClose()));

        // Запускаем поиск сигналов
        System.out.println("Analyzing signals for: " + symbolName + " | Candles in series: " + series.size());

        // Вызываем ваш метод анализа из SignalService
        //signalService.analyzeMarket(symbolId, series);

        // Можно также вызвать комплексные правила
        signalService.processSignals(symbolName, series);
    }
}

