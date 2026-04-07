package com.techmatrix18.controller.api;

import com.techmatrix18.dto.CandleDto;
import com.techmatrix18.dto.SymbolDto;
import com.techmatrix18.mapper.CandleMapper;
import com.techmatrix18.mapper.SymbolMapper;
import com.techmatrix18.model.Candle;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.service.CandleService;
import com.techmatrix18.service.SymbolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
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
    private SymbolService symbolService;

    public CandleController(CandleService candleService, SymbolService symbolService) {
        this.symbolService = symbolService;
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

    @GetMapping(params = {"page", "size"})
    @Operation(summary = "Get all candles by pages", description = "Returns list of all candles by pages")
    public ResponseEntity<Page<CandleDto>> getAllByPages(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size,
                                                         @RequestParam(defaultValue = "") String search,
                                                         @RequestParam(name = "sort", defaultValue = "id,asc") String sort ) { // Axios шлет один параметр "sort"
        log.info("Fetching all candles");
        // Разделяем "id,asc" на два поля для вашего сервиса
        String[] sortParts = sort.split(",");
        String sortBy = sortParts[0];
        String sortDir = sortParts.length > 1 ? sortParts[1] : "asc";

        Page<Candle> candles = candleService.getAllPaginated(page, size, search, sortBy, sortDir);
        Page<CandleDto> candlesDto = candles.map(candle -> CandleMapper.toDto(candle));
        log.info("Fetching all candles !!!!!!!");
        return ResponseEntity.ok(candlesDto);
    }

    @PostMapping("/upload-binance")
    @Operation(summary = "Upload candles from Binance", description = "Uploads candles from Binance API")
    public ResponseEntity<String> uploadFromBinance(@RequestParam Long symbolId,
                                                    @RequestParam String symbol,
                                                    @RequestParam String timeframe,
                                                    @RequestParam Long start,
                                                    @RequestParam Long end) {
        log.info("Uploading symbols from Binance API");
        try {
            symbolService.uploadHistoryCandlesFromBinance(symbolId, symbol, timeframe, start, end);
            return ResponseEntity.ok("Symbols uploaded successfully from Binance");
        } catch (Exception e) {
            log.severe("Error uploading symbols from Binance: " + e.getMessage());
            return ResponseEntity.status(500).body("Error uploading symbols from Binance");
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete candle by ID", description = "Deletes a candle by ID")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        log.info("Deleting candle with ID: " + id);
        boolean deleted = candleService.deleteCandle(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // Успех, статус 204
        } else {
            return ResponseEntity.notFound().build(); // Не найден, статус 404
        }
    }
}

