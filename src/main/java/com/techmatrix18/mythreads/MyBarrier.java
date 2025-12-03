package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

/**
 * My Barrier - пример использования барьеров для синхронизации потоков
 *
 * Thread.sleep(ms) - имитация работы с задержкой
 * Object.wait() / wait(ms) - приостанавливает текущий поток до вызова notify()/notifyAll() или до истечения времени
 * Object.notify() / notifyAll() - возобновляет один или все потоки, ожидающие на этом объекте
 * Thread.join() - заставляет текущий поток ждать завершения другого потока
 * Thread.yield() - предлагает планировщику переключиться на другой поток
 * Thread.interrupt() / isInterrupted() / interrupted() - прерывание потока и проверка его статуса
 * Lock.lock() / unlock() - захват и освобождение блокировки
 * Condition.await() / signal() / signalAll() - ожидание и уведомление с использованием Condition
 * CountDownLatch.await() / countDown() - ожидание и уменьшение счётчика
 * CyclicBarrier.await() - ожидание на барьере до тех пор, пока все потоки не достигнут его
 * Semaphore.acquire() / release() - захват и освобождение разрешения семафора
 * Exchanger.exchange() - обмен данными между двумя потоками
 * Phaser - многофазная синхронизация потоков
 * Future.get() - получение результата асинхронной задачи
 * CompletableFuture - работа с асинхронными вычислениями
 * ExecutorService - управление пулом потоков
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@ThreadSafe
public class MyBarrier {

    // Barrier on 3 threads with a barrier action
    CyclicBarrier barrier = new CyclicBarrier(3, () ->
        System.out.println("=== Все потоки достигли барьера ===")
    );

    public MyBarrier() {
        // Run 3 threads
        for (int i = 1; i <= 3; i++) {
            int threadId = i;
            new Thread(() -> {
                System.out.println("Поток " + threadId + " начал работу");
                try {
                    // Imitate some work with random sleep
                    Thread.sleep((long) (Math.random() * 3000));
                    System.out.println("Поток " + threadId + " подошёл к барьеру");

                    // Point synchronization
                    barrier.await();
                    System.out.println("Поток " + threadId + " продолжает работу после барьера");
                } catch (InterruptedException | BrokenBarrierException e) {
                    e.printStackTrace();
                }
            }).start();
        }
    }

    // Main method to run the example
    public static void main(String[] args) {
        new MyBarrier();
    }
}

/*
Поток 1 начал работу
Поток 2 начал работу
Поток 3 начал работу
Поток 2 подошёл к барьеру
Поток 1 подошёл к барьеру
Поток 3 подошёл к барьеру
=== Все потоки достигли барьера ===
Поток 3 продолжает работу после барьера
Поток 1 продолжает работу после барьера
Поток 2 продолжает работу после барьера
*/

