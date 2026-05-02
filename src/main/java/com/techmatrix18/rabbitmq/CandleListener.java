package com.techmatrix18.rabbitmq;

import com.techmatrix18.config.RabbitConfig;
import com.techmatrix18.model.Candle;
import com.techmatrix18.service.PriceStorage;
import com.techmatrix18.trading.SignalService;
import com.techmatrix18.trading.indicators.RsiIndicator;
import com.techmatrix18.trading.series.LiveCandleSeries;
import com.techmatrix18.websocket.MarketDataWebSocketServer;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
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
    private final Map<String, RsiIndicator> rsiMap = new ConcurrentHashMap<>();

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
        String timeframe = candle.getTimeframe();
        String type = candle.getType();

        // 1. Теперь создаем LiveCandleSeries и задаем maxSize (например, 200)
        String key = symbolName + "_" + timeframe;
        LiveCandleSeries series = seriesMap.computeIfAbsent(key, k -> new LiveCandleSeries(200));

        // debug
        if ("HISTORY".equals(type)) {
            System.out.println(">>> RECEIVED HISTORY: " + key + " | Current size: " + series.size());
        } else {
            System.out.println(">>> RECEIVED : " + key + " | Current size: " + series.size());
        }

        // 2. Наполнение серии (только финализированные данные)
        if (candle.isClosed() || "HISTORY".equals(type)) {
            series.addCandle(candle);
        }

        // 2. Берем индикатор (или создаем и прогреваем, если новый)
        RsiIndicator rsiIndicator = rsiMap.computeIfAbsent(key, k -> {
            RsiIndicator newRsi = new RsiIndicator();
            // Пробуем прогреть, если в серии уже что-то есть
            if (series.size() >= 14) {
                newRsi.prepare(series);
            }
            return newRsi;
        });

        // 3. Работа с живым потоком (не история)
        if (!"HISTORY".equals(type)) {
            double currentRsi = 50.0;

            // Если свеча закрылась — запускаем тяжелую аналитику
            // Добавляем проверку на размер серии ПЕРЕД расчетом
            if (series.size() > 14) {
                if (candle.isClosed()) {
                    // Фиксируем значение в истории индикатора
                    currentRsi = rsiIndicator.calculateIncremental(series);

                    System.out.println("Analyzing signals [" + timeframe + "] for: " + symbolName + " | Size: " + series.size());
                    signalService.processSignals(symbolName, series);
                } else {
                    // Просто считаем для плавной стрелки
                    currentRsi = rsiIndicator.calculateTemporary(series, candle.getClose().doubleValue());
                }
            }

            // Добавляем значение в объект перед отправкой (убедись, что поле есть в классе Candle)
            candle.getIndicators().put("rsi", currentRsi / 100.0);

            // Шлем в React для обновления графиков и спидометров
            webSocketServer.broadcast(candle);

            // Обновляем текущую цену в хранилище (только актуальные данные)
            priceStorage.updatePrice(symbolName, candle.getClose());
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

