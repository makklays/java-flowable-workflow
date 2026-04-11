package com.techmatrix18.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.techmatrix18.clients.BinanceApiClient;
import com.techmatrix18.controller.api.RoleController;
import com.techmatrix18.mapper.CandleMapper;
import com.techmatrix18.model.Candle;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.repository.CandleRepository;
import com.techmatrix18.repository.SymbolRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service for add symbols in the system.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class SymbolService {

    private final SymbolRepository symbolRepository;
    private final CandleRepository candleRepository;
    private final BinanceApiClient binanceApiClient;

    private static final Logger log = LoggerFactory.getLogger(SymbolService.class);

    public SymbolService(SymbolRepository symbolRepository, CandleRepository candleRepository, BinanceApiClient binanceApiClient) {
        this.symbolRepository = symbolRepository;
        this.candleRepository = candleRepository;
        this.binanceApiClient = binanceApiClient;
    }

    /**
     * Find a symbol by id
     *
     * @param id Symbol ID
     * @return found symbol
     * @throws EntityNotFoundException if the symbol is not found
     */
    public Symbol getById(Long id) {
        return symbolRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("The symbol didn't find"));
    }

    /**
     * Finds all symbols
     *
     * @return found all symbols
     */
    public List<Symbol> getAll() {
        return symbolRepository.findAll();
    }

    /**
     * Finds all symbols by pages
     *
     * @param page
     * @param size
     * @return
     */
    public Page<Symbol> getAllPaginated(int page, int size, String search, String sortBy, String sortDir) {
        // 1. Создаем объект Sort динамически
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        System.out.println(sortBy + " " + sortDir);

        Pageable pageable = PageRequest.of(page, size, sort);
        // 2. Логика поиска: если строка поиска не пуста, ищем по ней
        if (search != null && !search.trim().isEmpty()) {
            //return symbolRepository.findAllBySymbolContainingIgnoreCase(search, pageable);
            return symbolRepository.searchSymbols(search, pageable); // by Symbol or ID
        }
        // 3. Если поиска нет, возвращаем всё с пагинацией и сортировкой
        return symbolRepository.findAll(pageable);
    }

    /**
     * Загрузка торговых пар (Symbols) с Binance API и сохранение их в базу данных
     *
     * @param marketType
     */
    public void uploadSymbolsFromBinance(String marketType) throws Exception {
        try {
            List<Symbol> symbolsFromApi = binanceApiClient.fetchExchangeInfo(marketType);

            for (Symbol apiSymbol : symbolsFromApi) {
                // Ищем существующий символ по уникальным полям
                Optional<Symbol> existing = symbolRepository.findByExchangeIdAndSymbolAndMarketType(
                        apiSymbol.getExchangeId(),
                        apiSymbol.getSymbol(),
                        apiSymbol.getMarketType()
                );

                if (existing.isPresent()) {
                    // Если нашли — обновляем нужные поля
                    Symbol s = existing.get();
                    s.setPricePrecision(apiSymbol.getPricePrecision());
                    s.setQuantityPrecision(apiSymbol.getQuantityPrecision());
                    s.setActive(apiSymbol.getActive());
                    symbolRepository.save(s);
                } else {
                    // Если нет — сохраняем как новый
                    symbolRepository.save(apiSymbol);
                }
            }
        } catch (Exception e) {
            // Логируем ошибку, чтобы знать, что пошло не так
            log.error("Ошибка при загрузке данных с Binance: " + e.getMessage());
        }
    }

    /**
     * Загрузка исторических данных свечей (Candles) с Binance API и сохранение их в базу данных,
     * для конкретного символа и таймфрейма в заданном диапазоне времени (от start до end)
     *
     * @param symbolId
     * @param symbol
     * @param timeframe
     * @param start
     * @param end
     */
    public void uploadHistoryCandlesFromBinance(Long symbolId, String symbol, String timeframe, long start, long end) {
        long currentStart = start;
        try {
            // 1. Получаем текущие границы истории для данного символа из БД
            // Это важно, чтобы знать какие данные уже есть и не перезаписывать их, а только дополнять
            Optional<Symbol> currentData = symbolRepository.findById(symbolId);

            // Если символа нет в базе, загрузка невозможна
            if (currentData.isEmpty()) {
                System.err.println("Символ с ID " + symbolId + " не найден в базе данных.");
                return;
            }

            Symbol s = currentData.get();
            long historyStart = s.getHistoryStartTime();
            long historyEnd = s.getHistoryEndTime();
            Integer exchangeId = s.getExchangeId(); // Достаем один раз здесь

            while (currentStart < end) {
                // 1. Загрузка данных из Binance
                List<JsonNode> rawCandles = binanceApiClient.fetchHistoricalData(symbol, timeframe, currentStart, end);

                if (rawCandles.isEmpty()) {
                    System.out.println("Данных для " + symbol + " не найдено. Завершение.");
                    break;
                }

                // 2. Определяем границы текущего полученного пакета
                long batchStart = rawCandles.get(0).get(0).asLong();
                long batchEnd = rawCandles.get(rawCandles.size() - 1).get(0).asLong();

                // 3. Конвертация JSON -> List<Candle>
                List<Candle> candlesToSave = new ArrayList<>();
                for (JsonNode node : rawCandles) {
                    candlesToSave.add(CandleMapper.toEntityFromBinanceJson(symbolId, exchangeId, timeframe, node));
                }

                // 4. Фильтрация дубликатов
                // Проверяем в базе, какие openTime из этого диапазона у нас уже есть
                Set<Long> existingTimes = candleRepository.findAllOpenTimesBySymbolAndRange(
                    symbolId, exchangeId, timeframe, batchStart, batchEnd
                );

                List<Candle> filteredCandles = candlesToSave.stream()
                    .filter(c -> !existingTimes.contains(c.getOpenTime()))
                    .collect(Collectors.toList());

                // 5. Сохранение только новых записей
                if (!filteredCandles.isEmpty()) {
                    candleRepository.saveAll(filteredCandles);
                    System.out.println("Сохранено новых свечей: " + filteredCandles.size());
                } else {
                    System.out.println("Все свечи в блоке (" + batchStart + " -> " + batchEnd + ") уже существуют. Пропуск.");
                }

                // 6. Обновление границ истории в таблице Symbols
                if (historyStart == 0 || batchStart < historyStart) {
                    historyStart = batchStart;
                    symbolRepository.updateStartTime(symbolId, historyStart);
                }
                if (batchEnd > historyEnd) {
                    historyEnd = batchEnd;
                    symbolRepository.updateEndTime(symbolId, historyEnd);
                }

                // 7. Подготовка к следующему циклу
                currentStart = batchEnd + 1;
                System.out.println("Синхронизировано: " + batchStart + " -> " + batchEnd);

                // Пауза 200мс для соблюдения лимитов Binance
                Thread.sleep(200);
            }
        } catch (Exception e) {
            System.err.println("Ошибка загрузки исторических данных для " + symbol + ": " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * Delete Symbol by SymbolID
     *
     * @return boolean
     */
    public boolean deleteSymbol(Long id) {
        return symbolRepository.findById(id).map(symbol -> {
            symbolRepository.delete(symbol);
            return true;
        }).orElse(false);
    }

}

