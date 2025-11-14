package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
import java.util.concurrent.*;

/**
 * Task1 class - Техзадание №1 — “Пул потоков обрабатывает заказы”
 *
 * 📌 Описание
 * Написать программу, которая:
 * Создаёт пул из 3 потоков.
 * Есть список из 10 заказов (например, ID от 1 до 10).
 * Каждый заказ — это отдельная задача, которая:
 * выводит:
 * Поток <имя_потока> обрабатывает заказ <id>
 * спит от 200 до 1000 мс (рандом).
 * Все задачи должны выполняться в пуле потоков.
 * После выполнения всех задач — программа должна красиво завершиться.
 *
 * 🧩 Требования
 * Использовать:
 * ExecutorService, submit(), shutdown() или shutdownAwaitTermination — на выбор.
 * Использовать Callable или Runnable (как тебе удобнее).
 * Рандомное время — через ThreadLocalRandom.current().nextInt().
 *
 * ⚡ Усложнение (не обязательно)
 * Сделать так, чтобы заказы возвращали результат:
 * "Заказ <id> выполнен за X ms"
 * и собрать эти результаты в список.
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@ThreadSafe
public class Task1 {
    public static void main(String[] args) throws InterruptedException {
        // code
        ExecutorService executor = Executors.newFixedThreadPool(3);

        for(int i = 1; i <= 10; i++) {
            int number = i;
            Runnable runnable = new Runnable() {
                public void run() {
                    int sleep = ThreadLocalRandom.current().nextInt(200, 1000);
                    System.out.println("Поток " + Thread.currentThread().getName() + " обрабатывает заказ " + number + " (спит " + sleep + " ms)");
                    try {
                        Thread.sleep(sleep);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            };
            executor.submit(runnable);
        }

        executor.shutdown();
        boolean finished = executor.awaitTermination(5, TimeUnit.SECONDS);

        if (finished) {
            System.out.println("Все задачи выполнены.");
        } else {
            System.out.println("Не все задачи успели выполниться за 5 секунд.");
        }
    }
}

/*
Поток pool-1-thread-1 обрабатывает заказ 1 (спит 689 ms)
Поток pool-1-thread-3 обрабатывает заказ 3 (спит 318 ms)
Поток pool-1-thread-2 обрабатывает заказ 2 (спит 989 ms)
Поток pool-1-thread-3 обрабатывает заказ 4 (спит 316 ms)
Поток pool-1-thread-3 обрабатывает заказ 5 (спит 404 ms)
Поток pool-1-thread-1 обрабатывает заказ 6 (спит 885 ms)
Поток pool-1-thread-2 обрабатывает заказ 7 (спит 816 ms)
Поток pool-1-thread-3 обрабатывает заказ 8 (спит 416 ms)
Поток pool-1-thread-3 обрабатывает заказ 9 (спит 646 ms)
Поток pool-1-thread-1 обрабатывает заказ 10 (спит 354 ms)
Все задачи выполнены.
*/

