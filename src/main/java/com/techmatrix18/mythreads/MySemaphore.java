package com.techmatrix18.mythreads;

import java.util.concurrent.Semaphore;

/**
 * My Semafore - пример использования семафоров для ограничения количества одновременно работающих потоков
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class MySemaphore {
    public static void main(String[] args) {

        Semaphore semaphore = new Semaphore(2); // одновременно только 2 потока

        for (int i = 1; i <= 5; i++) {
            int id = i;

            new Thread(() -> {
                try {
                    semaphore.acquire();  // вход в критическую секцию
                    System.out.println("Поток " + id + " начал работу");

                    Thread.sleep(1000);   // имитация работы

                    System.out.println("Поток " + id + " завершил работу");
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    semaphore.release();  // выход — освобождаем слот
                }
            }).start();
        }
    }
}

