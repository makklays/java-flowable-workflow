package com.techmatrix18.controller.api;

import com.techmatrix18.clients.BinanceApiClient;
import com.techmatrix18.dto.SymbolDto;
import com.techmatrix18.mapper.SymbolMapper;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.service.SymbolService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

/**
 * Controller for add symbols in the system.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"}) // Разрешает запросы с твоего фронта
@RestController
@Tag(name = "Symbols", description = "Symbol management API")
@RequestMapping("/api/v1/symbols")
public class SymbolController {

    private SymbolService symbolService;
    private BinanceApiClient binanceApiClient;

    public SymbolController(SymbolService symbolService) {
        this.symbolService = symbolService;
    }

    private static final Logger log = Logger.getLogger(RoleController.class.getName());

    @GetMapping
    @Operation(summary = "Get all symbols", description = "Returns list of all symbols")
    public ResponseEntity<List<SymbolDto>> getAll() {
        log.info("Fetching all symbols");
        List<Symbol> symbols = symbolService.getAll();
        return ResponseEntity.ok(SymbolMapper.toDtoList(symbols));
    }

    @GetMapping(params = {"page", "size"})
    @Operation(summary = "Get all symbols by pages", description = "Returns list of all symbols by pages")
    public ResponseEntity<Page<SymbolDto>> getAllByPages(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        log.info("Fetching all symbols");
        Page<Symbol> symbols = symbolService.getAllPaginated(page, size);
        Page<SymbolDto> symbolsDto = symbols.map(symbol -> SymbolMapper.toDto(symbol));
        return ResponseEntity.ok(symbolsDto);
    }

    @GetMapping("/upload-binance")
    @Operation(summary = "Upload symbols from Binance", description = "Uploads symbols from Binance API")
    public ResponseEntity<String> uploadFromBinance(@RequestParam(defaultValue = "SPOT") String type) {
        log.info("Uploading symbols from Binance API");
        try {
            symbolService.uploadSymbolsFromBinance(type);
            return ResponseEntity.ok("Symbols uploaded successfully from Binance");
        } catch (Exception e) {
            log.severe("Error uploading symbols from Binance: " + e.getMessage());
            return ResponseEntity.status(500).body("Error uploading symbols from Binance");
        }
    }
}

