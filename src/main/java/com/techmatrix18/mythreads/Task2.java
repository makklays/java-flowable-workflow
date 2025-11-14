package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * Task2 class — Техзадание №2 — “Конкурентная обработка заказов с использованием пула потоков и сбором результатов”
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@ThreadSafe
public class Task2 {
    public static void main(String[] args) throws InterruptedException {
        final List<Integer> myList = new ArrayList<Integer>();

        ExecutorService executor = Executors.newFixedThreadPool(5);

        for(int i = 1; i <= 5; i++) {
            int number = i;

            Runnable r = new Runnable() {
                public void run() {
                    synchronized (myList) {
                        for(int i = 1; i <= 1000; i++) {
                            myList.add(number);
                        }
                    }
                }
            };
            executor.submit(r);
        }

        executor.shutdown();
        executor.awaitTermination(5, TimeUnit.SECONDS);

        System.out.println("Размер: " + myList.size());
    }
}

// Размер: 5000

