package com.techmatrix18.controller.api;

import com.techmatrix18.dto.BacktestDto;
import com.techmatrix18.model.Candle;
import com.techmatrix18.repository.CandleRepository;
import com.techmatrix18.trading.StrategyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Backtest Controller
 *
 * @author Alexander Kuziv
 * @since 11.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"}) // Разрешает запросы с твоего фронта
@RestController
@Tag(name = "Backtest", description = "Backtest management API")
@RequestMapping("/api/v1/backtest")
public class BacktestController {

    private final CandleRepository candleRepository;
    private final StrategyService strategyService;

    public BacktestController(CandleRepository candleRepository, StrategyService strategyService) {
        this.candleRepository = candleRepository;
        this.strategyService = strategyService;
    }

    @GetMapping("/run")
    public ResponseEntity<BacktestDto> runTest(
            @RequestParam Long symbolId,
            @RequestParam Long start,
            @RequestParam Long end,
            @RequestParam String timeframe) {

        // 1. Загружаем исторические данные
        List<Candle> history = candleRepository.findBySymbolIdAndTimeframeAndOpenTimeBetween(symbolId, timeframe, start, end);

        // 2. Просим сервис рассчитать сигналы и уровни (нужно добавить такой метод в StrategyService)
        BacktestDto result = strategyService.analyzeHistory(history);

        return ResponseEntity.ok(result);
    }
}
