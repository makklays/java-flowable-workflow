package com.techmatrix18.mythreads;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * My Future Thread - пример использования Future и Callable
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class MyFutureThread {
    public static void main(String[] args) throws Exception {

        // Создаём пул потоков (4 потока)
        ExecutorService executor = Executors.newFixedThreadPool(4);

        List<Future<Integer>> futures = new ArrayList<>();

        // Отправляем 10 задач
        for (int i = 1; i <= 10; i++) {
            int number = i;

            Callable<Integer> task = () -> {
                System.out.println(Thread.currentThread().getName() + " обрабатывает " + number);
                Thread.sleep(500); // имитация работы
                return number * number;  // возвращаем результат
            };

            Future<Integer> future = executor.submit(task);
            futures.add(future);
        }

        // Получаем результаты
        for (Future<Integer> f : futures) {
            // get() блокируется, пока результат не готов
            Integer result = f.get();
            System.out.println("Результат: " + result);
        }

        executor.shutdown();
    }
}

