package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
import java.util.concurrent.*;

/**
 * My Completion Service - пример использования CompletionService
 *
 * Он идеально подходит для собеседований, когда нужно показать получение результатов в порядке завершения задач,
 * а не в порядке отправки.
 *
 * ExecutorCompletionService — ключевой элемент
 * Он складывает завершённые задачи во внутреннюю очередь. Туда ты и обращаешься, когда хочешь получить следующий
 * готовый результат.
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@ThreadSafe
public class MyCompletionService {
    public static void main(String[] args) throws Exception {

        ExecutorService executor = Executors.newFixedThreadPool(3);

        // Обёртка над executor — CompletionService
        CompletionService<String> completionService =
                new ExecutorCompletionService<>(executor);

        // Отправляем 5 задач
        for (int i = 1; i <= 5; i++) {
            int id = i;

            // submit(Callable) — отправка задачи на выполнение
            completionService.submit(() -> {
                // имитация работы: задачи завершаются в разное время
                long sleep = (long) (Math.random() * 2000);
                Thread.sleep(sleep);
                return "Задача " + id + " завершилась за " + sleep + " ms";
            });
        }

        // take() - взять завершённый результат с блокировкой
        // poll() - взять завершённый результат без блокировки

        // Получаем результаты по мере готовности
        for (int i = 0; i < 5; i++) {
            Future<String> future = completionService.take(); // взять следующий завершённый результат с блокировкой
            String result = future.get(); // получить результат из Future
            System.out.println(result);
        }

        executor.shutdown(); // завершение пула
    }
}

/*
Задача 3 завершилась за 1339 ms
Задача 1 завершилась за 1416 ms
Задача 5 завершилась за 144 ms
Задача 2 завершилась за 1579 ms
Задача 4 завершилась за 1641 ms
*/

