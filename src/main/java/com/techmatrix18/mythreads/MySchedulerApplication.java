package com.techmatrix18.mythreads;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * My Scheduler Application - пример использования планировщика задач в Spring Boot
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@SpringBootApplication
@EnableScheduling  // включаем планировщик
public class MySchedulerApplication {
    public static void main(String[] args) {
        SpringApplication.run(MySchedulerApplication.class, args);
    }
}

@Component
class MyScheduledTask {

    // Запуск задачи каждые 5 секунд, независимо от того, завершилась ли предыдущая
    @Scheduled(fixedRate = 5000)
    public void runTask() {
        System.out.println("Задача выполнена в потоке " + Thread.currentThread().getName()
                + " в " + java.time.LocalTime.now());
    }

    // Запуск задачи через 10 секунд после завершения предыдущей
    @Scheduled(fixedDelay = 10000)
    public void runTaskWithDelay() {
        System.out.println("Задача с задержкой выполнена в потоке " + Thread.currentThread().getName()
                + " в " + java.time.LocalTime.now());
    }

    // Запуск по расписанию с помощью cron-выражения
    @Scheduled(cron = "0 * * * * *")
    public void runCronTask() {
        System.out.println("Cron-задача выполнена в " + java.time.LocalTime.now());
    }
}

/*
Задача выполнена в потоке scheduling-1 в 22:43:40.611175918
Задача с задержкой выполнена в потоке scheduling-1 в 22:43:40.612999059
Задача выполнена в потоке scheduling-1 в 22:43:45.603186468
Задача выполнена в потоке scheduling-1 в 22:43:50.602908622
Задача с задержкой выполнена в потоке scheduling-1 в 22:43:50.614117323
Задача выполнена в потоке scheduling-1 в 22:43:55.602946685
Cron-задача выполнена в 22:44:00.000968745
Задача выполнена в потоке scheduling-1 в 22:44:00.602954634
Задача с задержкой выполнена в потоке scheduling-1 в 22:44:00.615024562
etc.
*/

