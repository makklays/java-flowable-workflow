package com.techmatrix18.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.techmatrix18.clients.BinanceApiClient;
import com.techmatrix18.model.Candle;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.repository.CandleRepository;
import com.techmatrix18.repository.SymbolRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public Page<Symbol> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return symbolRepository.findAll(pageable);
    }

    /**
     * Загрузка торговых пар (Symbols) с Binance API и сохранение их в базу данных
     *
     * @param marketType
     */
    public void uploadSymbolsFromBinance(String marketType) {
        try {
            System.out.println("Начало синхронизации " + marketType + "...");

            // 1. Получаем данные из API через клиент
            List<Symbol> symbols = binanceApiClient.fetchExchangeInfo(marketType);

            // 2. Сохраняем в базу через репозиторий
            symbolRepository.saveAll(symbols);

            System.out.println("Успешно синхронизировано пар: " + symbols.size());
        } catch (Exception e) {
            e.printStackTrace();
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
            long historyStart = 0L;
            long historyEnd = 0L;
            if (currentData.isPresent()) {
                Symbol s = currentData.get();
                historyStart = s.getHistoryStartTime();
                historyEnd = s.getHistoryEndTime();
            }

            while (currentStart < end) {
                // 2. Вызов вашего метода fetchHistoricalData
                List<JsonNode> rawCandles = binanceApiClient.fetchHistoricalData(symbol, timeframe, currentStart, end);

                if (rawCandles.isEmpty()) {
                    System.out.println("данных для " + symbol + " с " + currentStart + " по " + end + " не найдено. Завершение загрузки.");
                    break;
                }

                // 3. Конвертация данных из JSON в объекты Candle для сохранения в БД
                List<Candle> candlesToSave = new ArrayList<>();
                for (JsonNode node : rawCandles) {
                    //candlesToSave.add(mapJsonToCandle(symbolId, timeframe, node));
                }

                // 4. Пакетное сохранение в базу данных (эффективнее, чем по одной свече)
                System.out.println(" ");
                System.out.println("Подготовлено к сохранению свечей: " + candlesToSave.size());
                System.out.println(" ");
                candleRepository.saveAll(candlesToSave);

                // 5. Определяем границы загруженного блока данных
                long batchStart = rawCandles.get(0).get(0).asLong(); // open_time першої свічки
                long batchEnd = rawCandles.get(rawCandles.size() - 1).get(0).asLong(); // open_time останньої свічки

                // 6. Обновляем "левую" границу (Start Time), если загружены данные старше
                if (historyStart == 0 || batchStart < historyStart) {
                    historyStart = batchStart;
                    symbolRepository.updateStartTime(symbolId, historyStart);
                }

                // 7. Обновляем "правую" границу (End Time), если данные новее
                if (batchEnd > historyEnd) {
                    historyEnd = batchEnd;
                    symbolRepository.updateEndTime(symbolId, historyEnd);
                }

                // 8. Сдвигаем currentStart для следующего запроса к Binance (1000 свечей вперед)
                currentStart = batchEnd + 1;

                System.out.println("Синхронизировано блок для " + symbol + ": " + batchStart + " -> " + batchEnd);

                // Пауза 200мс, чтобы Binance не заблокировал за слишком частые запросы (можно настроить в зависимости от лимитов API)
                // А какие лимиты у Binance по историческим данным?
                // Обычно 1200 запросов в минуту, но лучше проверить актуальную документацию и при необходимости увеличить паузу
                // Какая должна быть пауза между запросами к Binance для исторических данных?
                // Обычно рекомендуется не превышать 1200 запросов в минуту, что примерно 50 мс между запросами.
                // Однако, чтобы быть в безопасности и избежать блокировки, можно установить паузу в 200 мс или больше,
                // особенно если вы делаете много запросов подряд. Важно также учитывать, что если вы запрашиваете
                // большие объемы данных, лучше делать это постепенно и с учетом текущей нагрузки на сервер Binance.
                Thread.sleep(200);
            }
        } catch (Exception e) {
            System.err.println("Ошибка загрузки исторических данных для " + symbol + ": " + e.getMessage());
            e.printStackTrace();
        }
    }

}

