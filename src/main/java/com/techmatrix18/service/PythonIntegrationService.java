package com.techmatrix18.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Python Integration Service
 *
 * Обеспечивает взаимодействие между основным приложением на Java и аналитическим модулем на Python (FastAPI).
 * Используется для делегирования сложных математических вычислений, статистического анализа
 * и работы с библиотеками машинного обучения, которые более эффективно реализованы в экосистеме Python.
 *
 * @author Alexander Kuziv
 * @since 18.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service
public class PythonIntegrationService {
    private final RestTemplate restTemplate = new RestTemplate();

    public Integer getCalculation(int a, int b) {
        String url = "http://127.0.0.1:8000/calculate?a=" + a + "&b=" + b;
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            return response != null ? (Integer) response.get("result") : null;
        } catch (Exception e) {
            System.err.println("Python Service unavailable: " + e.getMessage());
            return null; // или выброси кастомную ошибку
        }
    }
}

