package com.techmatrix18.controller.api;

import com.techmatrix18.dto.CandleDto;
import com.techmatrix18.mapper.CandleMapper;
import com.techmatrix18.model.Candle;
import com.techmatrix18.service.CandleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

/**
 * Controller for add candles in the system.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"}) // Разрешает запросы с твоего фронта
@RestController
@Tag(name = "Candles", description = "Candle management API")
@RequestMapping("/api/v1/candles")
public class CandleController {

    private CandleService candleService;

    public CandleController(CandleService candleService) {
        this.candleService = candleService;
    }

    private static final Logger log = Logger.getLogger(RoleController.class.getName());

    @GetMapping
    @Operation(summary = "Get all candles", description = "Returns list of all candles")
    public ResponseEntity<List<CandleDto>> getAll() {
        log.info("Fetching all candles");
        List<Candle> candles = candleService.getAll();
        return ResponseEntity.ok(CandleMapper.toDtoList(candles));
    }

    @GetMapping("/upload-binance")
    @Operation(summary = "Upload candles from Binance", description = "Uploads candles from Binance API")
    public ResponseEntity<String> uploadFromBinance(@RequestParam(defaultValue = "SPOT") String marketType) {
        log.info("Uploading symbols from Binance API");
        try {
            //candleService.uploadCandlesFromBinance(marketType);
            return ResponseEntity.ok("Symbols uploaded successfully from Binance");
        } catch (Exception e) {
            log.severe("Error uploading symbols from Binance: " + e.getMessage());
            return ResponseEntity.status(500).body("Error uploading symbols from Binance");
        }
    }
}

