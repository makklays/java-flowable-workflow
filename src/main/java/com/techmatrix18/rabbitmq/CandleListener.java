package com.techmatrix18.rabbitmq;

import com.techmatrix18.model.Candle;
import com.techmatrix18.trading.SignalService;
import com.techmatrix18.trading.series.LiveCandleSeries;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Candle Listener -
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 16.04.2026
 * @version 0.0.1
 */
@Service
public class CandleListener {

    private final SignalService signalService;

    // Используем LiveCandleSeries в качестве значения
    private final Map<String, LiveCandleSeries> seriesMap = new ConcurrentHashMap<>();

    public CandleListener(SignalService signalService) {
        this.signalService = signalService;
    }

    @RabbitListener(queues = "binance.prices")
    public void onMessage(Candle candle) {
        // Получаем или создаем серию для конкретного символа
        String symbolId = candle.getSymbolId().toString(); // или candle.getSymbolName()

        // Теперь создаем LiveCandleSeries и задаем maxSize (например, 200)
        LiveCandleSeries series = seriesMap.computeIfAbsent(symbolId, k -> new LiveCandleSeries(200));

        // Добавляем свечу (метод addCandle сам удалит старую, если превышен лимит)
        series.addCandle(candle);

        // Запускаем поиск сигналов
        System.out.println("Analyzing signals for: " + symbolId + " | Candles in series: " + series.size());

        // Вызываем ваш метод анализа из SignalService
        signalService.analyzeMarket(symbolId, series);

        // Можно также вызвать комплексные правила
        signalService.processSignals(symbolId, series);
    }
}

