package com.techmatrix18.trading;

import com.techmatrix18.model.Candle;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.repository.CandleRepository;
import com.techmatrix18.repository.SymbolRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * MarketScheduler is responsible for periodically fetching the latest market data (candles) and running the trading strategy analysis.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class MarketScheduler {

    private final CandleRepository candleRepository;
    private final StrategyService strategyService;
    private final SymbolRepository symbolRepository; // Предположим, у вас есть список монет

    public MarketScheduler(CandleRepository candleRepository,
                           StrategyService strategyService,
                           SymbolRepository symbolRepository) {
        this.candleRepository = candleRepository;
        this.strategyService = strategyService;
        this.symbolRepository = symbolRepository;
    }

    /*@Scheduled(fixedDelay = 20000) // Раз в 20 секунд
    public void runAnalysis() {
        // 1. Получаем список всех активных пар (BTCUSDT, ETHUSDT и т.д.)
        List<String> myWatchlist = List.of("BTCUSDT", "ETHUSDT", "SOLUSDT");
        List<Symbol> activeSymbols = symbolRepository.findSomeSymbolsFutures(myWatchlist);

        for (Symbol symbol : activeSymbols) {
            // 2. Загружаем свечи для конкретной монеты (берем с запасом для MACD и EMA - 200 свечей)
            List<Candle> candles = candleRepository.findTop200BySymbolIdOrderByOpenTimeDesc(symbol.getId());

            if (candles.size() >= 50) {
                // 3. Запускаем анализ (передаем символ для уведомлений в Telegram)
                strategyService.executeFullAnalysis(symbol.getSymbol(), candles);
            }
        }
    }*/
}

