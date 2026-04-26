package com.techmatrix18.rabbitmq;

import com.techmatrix18.config.RabbitConfig;
import com.techmatrix18.model.Candle;
import com.techmatrix18.service.PriceStorage;
import com.techmatrix18.trading.SignalService;
import com.techmatrix18.trading.series.LiveCandleSeries;
import com.techmatrix18.websocket.MarketDataWebSocketServer;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    // Получаю 1 минутные свечи с ценами (раз в минуту)
    @RabbitListener(queues = RabbitConfig.QUEUE_PRICES)
    public void onMessage(Candle candle) {
        // Получаем или создаем серию для конкретного символа
        String symbolId = candle.getSymbolId().toString();
        String symbolName = candle.getSymbol();

        // Обновляем цену для аналитики сделок в PriceStorage,
        // используем цену закрытия свечи (closePrice) как текущую рыночную цену
        priceStorage.updatePrice(symbolName, candle.getClose());

        // ОТПРАВЛЯЕМ ЦЕНУ НА ФРОНТЕНД
        // Можно отправить всю свечу целиком
        webSocketServer.broadcast(candle);
        // Или отправить специально созданный DTO, если фронт ждет другой формат
        // webSocketServer.broadcast(new PriceUpdateDto(symbolId, candle.getClose()));

        // Можно также вызвать комплексные правила
        // А логику сигналов запускаем ТОЛЬКО при закрытии свечи (раз в минуту)
        if (candle.isClosed()) {
            // Теперь создаем LiveCandleSeries и задаем maxSize (например, 200)
            LiveCandleSeries series = seriesMap.computeIfAbsent(symbolId, k -> new LiveCandleSeries(200));

            // Добавляем свечу (метод addCandle сам удалит старую, если превышен лимит)
            series.addCandle(candle);

            // Запускаем поиск сигналов
            System.out.println("Analyzing signals for: " + symbolName + " | Candles in series: " + series.size());

            signalService.processSignals(symbolName, series);
            // Вызываю метод анализа из SignalService - если хочу анализировать на основании цен раз в минуту (но по тикам актуальнее)
            //signalService.analyzeMarket(symbolId, series);
        }
    }

    // Получаю тики с ценами (каждые 100-200 мс)
    @RabbitListener(queues = RabbitConfig.QUEUE_TICKS)
    public void onTickMessage(Map<String, Object> tickData) {
        // Извлекаем данные, которые мы положили в Map в CandlePublisher
        String symbol = (String) tickData.get("symbol");
        String symbolId = tickData.get("id").toString();
        Double bid = (Double) tickData.get("bid");
        Double ask = (Double) tickData.get("ask");

        // Обновляю PriceStorage более точной ценой (например, средней между bid и ask)
        double midPrice = (bid + ask) / 2.0;
        priceStorage.updatePrice(symbol, BigDecimal.valueOf(midPrice));

        // Отправляю быстрые данные на frontend через WebSocket
        // создал на frontend отдельный обработчик для "BID_ASK" сообщений
        webSocketServer.broadcast(tickData);

        // Если нужно считать спред для сигналов
        // double spread = ask - bid;
        // signalService.checkScalpingSignals(symbol, bid, ask);

        // Вызываю метод анализа из SignalService - если хочу анализировать на основании цен из тиков
        //signalService.analyzeMarket(symbolId, series);
    }
}

