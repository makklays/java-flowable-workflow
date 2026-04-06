package com.techmatrix18.service;

import com.techmatrix18.model.Candle;
import com.techmatrix18.repository.CandleRepository;
import jakarta.persistence.EntityNotFoundException;
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

}

