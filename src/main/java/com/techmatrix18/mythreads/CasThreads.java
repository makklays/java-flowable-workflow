package com.techmatrix18.mythreads;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Cas Threads - пример использования CAS (Compare-And-Swap) для безопасного увеличения счётчика в многопоточном окружении
 *
 * @author Alexander Kuziv
 * @since 05.12.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class CasThreads {
    private static final AtomicInteger counter = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {

        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {

                int oldValue;
                int newValue;

                do {
                    oldValue = counter.get();      // читаем текущее значение
                    newValue = oldValue + 1;       // считаем новое
                } while (!counter.compareAndSet(oldValue, newValue));
                // CAS пытается записать newValue только если counter == oldValue
                // если нет — цикл повторяется
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Result: " + counter.get());
    }
}

