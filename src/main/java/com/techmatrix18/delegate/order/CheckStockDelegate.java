package com.techmatrix18.delegate.order;

import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.util.Random;

/**
 * Check Stock Delegate -
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 28.03.2026
 * @version 0.0.1
 */
@Component("checkStockDelegate")
public class CheckStockDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        System.out.println("Проверка склада для заказа!");

        // Имитируем логику: в 80% случаев товар есть
        boolean available = new Random().nextInt(10) < 8;

        // КРИТИЧЕСКИ ВАЖНО: сохраняем результат в переменную процесса
        execution.setVariable("isValid", available);

        System.out.println("Результат проверки: " + (available ? "ЕСТЬ" : "НЕТ"));
    }
}

