package com.techmatrix18.controller.api;

import com.techmatrix18.dto.OpenTradeDto;
import com.techmatrix18.dto.SymbolDto;
import com.techmatrix18.dto.TradeDto;
import com.techmatrix18.mapper.SymbolMapper;
import com.techmatrix18.mapper.TradeMapper;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.model.Trade;
import com.techmatrix18.service.TradeService;
import com.techmatrix18.utils.TradingSessions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.logging.Logger;

/**
 * Controller for add trades in the system.
 *
 * @author Alexander Kuziv
 * @since 19.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"}) // Разрешает запросы с твоего фронта
@RestController
@Tag(name = "Trades", description = "Trade management API")
@RequestMapping("/api/v1/trades")
public class TradeController {
    private TradeService tradeService;
    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    public TradeController(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    private static final Logger log = Logger.getLogger(RoleController.class.getName());

    @GetMapping
    @Operation(summary = "Get all trades", description = "Returns list of all trades")
    public ResponseEntity<List<Trade>> getAll() {
        log.info("Fetching all trades");
        List<Trade> trades = tradeService.getAll();
        return ResponseEntity.ok(trades);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get trade by ID", description = "Returns a trade by its unique ID")
    public ResponseEntity<Trade> getTrade(@PathVariable Long id) {
        log.info("Fetching trade with ID = " + id);
        Trade trade = tradeService.getById(id);
        if (trade == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trade);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get all user's trades", description = "Returns a complete history of trades for a user")
    public ResponseEntity<List<Trade>> getAllUserTrades(@PathVariable Long userId) {
        log.info("Fetching all trades for user: " + userId);
        List<Trade> trades = tradeService.getTradesByUserId(userId);
        return ResponseEntity.ok(trades);
    }

    @GetMapping("/user/{userId}/active")
    @Operation(summary = "Get currently user's trades", description = "Returns a list of currently (OPEN) trades for a user")
    public ResponseEntity<List<Trade>> getActiveUserTrades(@PathVariable Long userId) {
        log.info("Fetching active trades for user: " + userId);
        List<Trade> trades = tradeService.getActiveTrades(userId);
        return ResponseEntity.ok(trades);
    }

    @GetMapping("/user/{userId}/closed")
    @Operation(summary = "Get closed user's trades", description = "Returns a list of closed (CLOSED) trades for a user")
    public ResponseEntity<List<Trade>> getClosedUserTrades(@PathVariable Long userId) {
        log.info("Fetching closed trades for user: " + userId);
        List<Trade> trades = tradeService.getClosedTrades(userId);
        return ResponseEntity.ok(trades);
    }

    @PostMapping("/open")
    @Operation(summary = "Open trade (open order)", description = "Creates a new trade in the system")
    public ResponseEntity<Trade> openTrade(@RequestBody OpenTradeDto dto) {
        log.info("Opening trade for user " + dto.getUserId() + " on " + dto.getSymbol());
        Trade trade = tradeService.openTrade(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(trade);
    }

    @PostMapping("/{id}/close")
    @Operation(summary = "Close trade (close order)", description = "Closes an active trade by ID and calculates PnL")
    public ResponseEntity<Trade> close(
            @PathVariable Long id,
            @RequestParam BigDecimal closePrice,
            @RequestParam(required = false) String reason
    ) {
        return ResponseEntity.ok(tradeService.closeTrade(id, closePrice, reason));
    }

    @GetMapping(value = "/info-trading-sessions", produces = "text/plain;charset=UTF-8")
    @Operation(summary = "Get info about trading's sessions", description = "Returns text with names of trading's sessions")
    public ResponseEntity<String> getTradingSessions(Locale locale) {
        log.info("Requesting trading sessions info for locale: " + locale);

        LocalDateTime now = LocalDateTime.now();
        int hour = now.getHour();

        // 1. Определяем приветствие (можно тоже вынести в i18n bundle при желании)
        String greeting;
        if (hour >= 6 && hour < 12) greeting = "Доброе утро";
        else if (hour >= 12 && hour < 18) greeting = "Добрый день";
        else if (hour >= 18 && hour < 23) greeting = "Добрый вечер";
        else greeting = "Доброй ночи";

        // 2. Загружаем локализацию сессий
        ResourceBundle bundle = null;
        try {
            bundle = ResourceBundle.getBundle("i18n.messages", locale);
        } catch (MissingResourceException e) {
            log.info("Локализация не найдена для " + locale + ", использую дефолт");
            bundle = ResourceBundle.getBundle("i18n.messages", Locale.ENGLISH); // Дефолт
        }
        String tradeSession = TradingSessions.getMarketInfoString(LocalTime.now(ZoneOffset.UTC), bundle);

        // 3. Формируем итоговую строку
        // Убираем дублирование даты/времени, оставляя одну красивую цепочку
        String sessionInfo = String.format("%s! %s | %s | %s",
            greeting,
            now.format(dateFormatter),
            now.format(timeFormatter),
            tradeSession);

        return ResponseEntity.ok(sessionInfo);
    }
}

