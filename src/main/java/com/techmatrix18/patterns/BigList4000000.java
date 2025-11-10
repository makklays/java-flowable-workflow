package com.techmatrix18.patterns;

import javax.annotation.concurrent.ThreadSafe;
import java.lang.Runtime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Big List 4000000 - Multithreading
 *
 * @author Alexander Kuziv
 * @since 10.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class BigList4000000 {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();

        long start = System.currentTimeMillis();
        for (int i = 0; i < 4_000_000; i++) {
            list.add(i);
        }
        long end = System.currentTimeMillis();

        System.out.println("List size: " + list.size());
        System.out.println("First element: " + list.get(0));
        System.out.println("Last element: " + list.get(list.size() - 1));
        System.out.println("Time: " + (end - start) + " ms");
    }
}

/**
 * 1. ReeentrantLock - это низкоуровневый механизм синхронизации в Java,
 * он нужен, когда несколько потоков уже существуют и делят общий ресурс.
 *
 * То есть ReentrantLock решает задачу:
 * Как синхронизировать доступ нескольких потоков к одной общей переменной?
 *
 * 2. ExecutorService - это высокоуровневый API для управления потоками в Java.
 * Он управляет созданием, повторным использованием и завершением потоков.
 * Ты просто даёшь ему задачи (Runnable или Callable), а он сам распределяет их между потоками.
 *
 * То есть ExecutorService решает задачу:
 * Как эффективно управлять количеством потоков и их работой?
 */

@ThreadSafe
class Threads4000000 {
    private static final int TOTAL = 4_000_000;
    private static final int THREADS = Runtime.getRuntime().availableProcessors();
    private static final List<Integer> list = new ArrayList<>();
    private static final ReentrantLock lock = new ReentrantLock();

    public static void main(String[] args) throws InterruptedException {
        Thread[] workers = new Thread[THREADS];
        int chunk = TOTAL / THREADS;
        long start = System.currentTimeMillis();

        for(int t = 0; t < THREADS; t++) {
            final int startIdx = t * chunk;
            final int endIdx = (t + 1) * chunk;
            workers[t] = new Thread(() -> {
                for (int i = startIdx; i < endIdx; i++) {
                    lock.lock();
                    try {
                        list.add(i);
                    } finally {
                        lock.unlock();
                    }
                }
            });
            workers[t].start();
        }

        for (Thread worker : workers) {
            worker.join();
        }
        long end = System.currentTimeMillis();

        System.out.println("List size: " + list.size());
        System.out.println("First element: " + list.get(0));
        System.out.println("Last element: " + (list.size() - 1));
        System.out.println("Time: " + (end - start) + " ms");
        System.out.println("Threads (cores) used: " + THREADS);
    }
}

@ThreadSafe
class Threads4000000Optimized {
    private static final int TOTAL = 4_000_000;
    private static final int THREADS = Runtime.getRuntime().availableProcessors();

    public static void main(String[] args) throws InterruptedException {
        List<List<Integer>> partialLists = new ArrayList<>();

        int[] workerss = new int[THREADS];
        Thread[] workers = new Thread[THREADS];
        int chunk = TOTAL / THREADS;
        long start = System.currentTimeMillis();

        for(int t = 0; t < THREADS; t++) {
            final int startIdx = t * chunk;
            final int endIdx = (t + 1) * chunk;
            final List<Integer> localList = new ArrayList<>(chunk);

            partialLists.add(localList);

            workers[t] = new Thread(() -> {
                for (int i = startIdx; i < endIdx; i++) {
                    localList.add(i);
                }
            });
            workers[t].start();
        }

        for (Thread worker : workers) {
            worker.join();
        }

        // Union all local lists into the final list
        List<Integer> finalList = new ArrayList<>(TOTAL);
        for (List<Integer> l : partialLists) {
            finalList.addAll(l);
        }

        long end = System.currentTimeMillis();

        System.out.println("List size: " + finalList.size());
        System.out.println("First element: " + finalList.get(0));
        System.out.println("Last element: " + (finalList.size() - 1));
        System.out.println("Time: " + (end - start) + " ms");
        System.out.println("Threads (cores) used: " + THREADS);
    }
}

/**
 * ExecutorService - это высокоуровневый API для управления потоками в Java.
 * Он управляет созданием, повторным использованием и завершением потоков.
 * Ты просто даёшь ему задачи (Runnable или Callable), а он сам распределяет их между потоками.
 *
 * То есть ExecutorService решает задачу:
 * Как эффективно управлять количеством потоков и их работой?
 *
 * Future<T> - это объект, который представляет результат асинхронной операции, выполняемой с помощью ExecutorService.
 * Который может быть получен в будущем.
 */
@ThreadSafe
class Threads4000000ExecutorOptimized {
    private static final int TOTAL = 4_000_000;
    private static final int THREADS = Runtime.getRuntime().availableProcessors();

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executor = Executors.newFixedThreadPool(THREADS);
        List<Future<List<Integer>>> futures = new ArrayList<>();

        int chunk = TOTAL / THREADS;
        long start = System.currentTimeMillis();

        for (int t = 0; t < THREADS; t++) {
            final int startIdx = t * chunk;
            final int endIdx = (t + 1) * chunk;

            Callable<List<Integer>> task = () -> {
                List<Integer> localList = new ArrayList<>(chunk);
                for (int i = startIdx; i < endIdx; i++) {
                    localList.add(i);
                }
                return localList;
            };

            futures.add(executor.submit(task));
        }

        // Собираем результаты
        List<Integer> finalList = new ArrayList<>(TOTAL);
        for (Future<List<Integer>> f : futures) {
            finalList.addAll(f.get());
        }

        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);

        long end = System.currentTimeMillis();

        System.out.println("List size: " + finalList.size());
        System.out.println("First element: " + finalList.get(0));
        System.out.println("Last element: " + (finalList.size() - 1));
        System.out.println("Time: " + (end - start) + " ms");
        System.out.println("Threads (cores) used: " + THREADS);
    }
}

/**
 * Простой пример использования ExecutorService и Future<T>
 */
class MySimpleExecutorService {
    public static void main(String[] args) throws InterruptedException, ExecutionException {
        ExecutorService executor = Executors.newSingleThreadExecutor();

        Future<Integer> future = executor.submit(() -> {
            // Тяжёлая операция
            Thread.sleep(2000);
            return 42;
        });

        System.out.println("Задача запущена...");

        Integer result = future.get();  // блокируется, пока не готов результат

        System.out.println("Результат: " + result);
        executor.shutdown();
    }
}

