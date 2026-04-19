package com.techmatrix18.controller.api;

import com.techmatrix18.model.Trade;
import com.techmatrix18.service.TradeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
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
    @Operation(summary = "Open new trade (new order)", description = "Creates a new trade with status OPEN")
    public ResponseEntity<Trade> open(@RequestBody Trade trade) {
        return ResponseEntity.ok(tradeService.openTrade(trade));
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
}

