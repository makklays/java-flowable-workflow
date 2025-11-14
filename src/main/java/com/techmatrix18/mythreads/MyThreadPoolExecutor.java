package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
import java.util.concurrent.*;

/**
 * My Thread Pool Executor - пример использования ThreadPoolExecutor
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@ThreadSafe
public class MyThreadPoolExecutor {
    public static void main(String[] args) {

        // Создаём ThreadPoolExecutor вручную
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
                2,            // corePoolSize — всегда активные потоки
                4,                       // maximumPoolSize — максимум потоков
                10, TimeUnit.SECONDS,    // время жизни доп. потоков
                new ArrayBlockingQueue<>(2), // очередь на 2 задачи
                new ThreadPoolExecutor.AbortPolicy() // политика отказа
        );

        // Отправляем 10 задач
        for (int i = 1; i <= 10; i++) {
            int taskId = i;

            try {
                executor.execute(() -> {
                    System.out.println("Поток " + Thread.currentThread().getName()
                            + " выполняет задачу " + taskId);
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                });
            } catch (RejectedExecutionException e) {
                System.out.println("❌ Задача " + taskId + " была отклонена!");
            }

        }

        executor.shutdown();
    }
}

/*
❌ Задача 7 была отклонена!
❌ Задача 8 была отклонена!
❌ Задача 9 была отклонена!
❌ Задача 10 была отклонена!
Поток pool-1-thread-1 выполняет задачу 1
Поток pool-1-thread-2 выполняет задачу 2
Поток pool-1-thread-4 выполняет задачу 6
Поток pool-1-thread-3 выполняет задачу 5
Поток pool-1-thread-1 выполняет задачу 4
Поток pool-1-thread-2 выполняет задачу 3
*/

