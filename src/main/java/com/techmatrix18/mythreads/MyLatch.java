package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
import java.util.concurrent.CountDownLatch;

/**
 * My Latch - пример использования CountDownLatch для ожидания завершения нескольких потоков
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
@ThreadSafe
public class MyLatch {
    public static void main(String[] args) throws InterruptedException {

        // Ждём, пока 3 потока выполнят работу
        CountDownLatch latch = new CountDownLatch(3);

        for (int i = 1; i <= 3; i++) {
            int threadId = i;
            new Thread(() -> {
                System.out.println("Поток " + threadId + " начал работу");
                try {
                    // имитация работы
                    Thread.sleep((long) (Math.random() * 2000));
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("Поток " + threadId + " завершил работу");
                // уменьшаем счётчик latch
                latch.countDown();
            }).start();
        }

        System.out.println("Главный поток ждёт завершения рабочих потоков...");
        // блокируем главный поток, пока countDown не станет 0
        latch.await();
        System.out.println("Все потоки завершены! Главный поток продолжает выполнение.");
    }
}

/*
Поток 1 начал работу
Поток 2 начал работу
Поток 3 начал работу
Главный поток ждёт завершения рабочих потоков...
Поток 2 завершил работу
Поток 1 завершил работу
Поток 3 завершил работу
Все потоки завершены! Главный поток продолжает выполнение.
*/

