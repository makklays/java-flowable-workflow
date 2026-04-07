package com.techmatrix18.service;

import com.techmatrix18.model.Candle;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.repository.CandleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for add candles in the system.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class CandleService {

    private CandleRepository candleRepository;

    public CandleService(CandleRepository candleRepository) {
        this.candleRepository = candleRepository;
    }

    /**
     * Find a candle by id
     *
     * @param id Candle ID
     * @return found candle
     * @throws EntityNotFoundException if the candle is not found
     */
    public Candle getById(Long id) {
        return candleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("The candle didn't find"));
    }

    /**
     * Finds all candles
     *
     * @return found all candles
     */
    public List<Candle> getAll() {
        return candleRepository.findAll();
    }

    /**
     * Finds all symbols by pages
     *
     * @param page
     * @param size
     * @return
     */
    public Page<Candle> getAllPaginated(int page, int size, String search, String sortBy, String sortDir) {
        // 1. Создаем объект Sort динамически
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
        System.out.println(sortBy + " " + sortDir);

        Pageable pageable = PageRequest.of(page, size, sort);
        // 2. Логика поиска: если строка поиска не пуста, ищем по ней
        if (search != null && !search.trim().isEmpty()) {
            //return symbolRepository.findAllBySymbolContainingIgnoreCase(search, pageable);
            return candleRepository.searchCandles(search, pageable); // by Symbol or ID
        }
        // 3. Если поиска нет, возвращаем всё с пагинацией и сортировкой
        return candleRepository.findAll(pageable);
    }

    /**
     * Delete Candle by CandleID
     *
     * @return boolean
     */
    public boolean deleteCandle(Long id) {
        return candleRepository.findById(id).map(candle -> {
            candleRepository.delete(candle);
            return true;
        }).orElse(false);
    }
}

