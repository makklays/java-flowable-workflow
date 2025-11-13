package com.techmatrix18.mythreads;

import java.util.concurrent.*;

/**
 * My Completion Service - пример использования CompletionService
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class MyCompletionService {
    public static void main(String[] args) throws Exception {

        ExecutorService executor = Executors.newFixedThreadPool(3);

        // Обёртка над executor — CompletionService
        CompletionService<String> completionService =
                new ExecutorCompletionService<>(executor);

        // Отправляем 5 задач
        for (int i = 1; i <= 5; i++) {
            int id = i;

            completionService.submit(() -> {
                // имитация работы: задачи завершаются в разное время
                long sleep = (long) (Math.random() * 2000);
                Thread.sleep(sleep);
                return "Задача " + id + " завершилась за " + sleep + " ms";
            });
        }

        // Получаем результаты по мере готовности
        for (int i = 0; i < 5; i++) {
            Future<String> future = completionService.take(); // блокируется пока нет результата
            String result = future.get();
            System.out.println(result);
        }

        executor.shutdown();
    }
}

