package com.techmatrix18.patterns;

import java.util.ArrayList;
import java.util.List;
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

class Threads4000000 {
    private static final int TOTAL = 4_000_000;
    private static final int THREADS = 8;
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
    }
}

