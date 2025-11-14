package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
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

@ThreadSafe
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

/*
pool-1-thread-1 обрабатывает 1
pool-1-thread-3 обрабатывает 3
pool-1-thread-4 обрабатывает 4
pool-1-thread-2 обрабатывает 2
pool-1-thread-2 обрабатывает 5
pool-1-thread-4 обрабатывает 6
pool-1-thread-1 обрабатывает 7
pool-1-thread-3 обрабатывает 8
Результат: 1
Результат: 4
Результат: 9
Результат: 16
Результат: 25
pool-1-thread-4 обрабатывает 10
pool-1-thread-2 обрабатывает 9
Результат: 36
Результат: 49
Результат: 64
Результат: 81
Результат: 100
*/

