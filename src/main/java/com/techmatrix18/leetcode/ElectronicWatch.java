package com.techmatrix18.leetcode;

import java.util.Scanner;

/**
 * ElectronicWatch class — Електронний годинник
 *
 * @author Alexander Kuziv
 * @since 16.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class ElectronicWatch {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Введiть кiлькiсть секунд: ");
        int numSeconds = scanner.nextInt();
        //System.out.println("Вы ввели: " + number);

        scanner.close();

        /*Duration duration = Duration.ofSeconds(number);
        long seconds = duration.toSeconds() % 60;
        long minutes = duration.toMinutes() % 60;
        long hours = duration.toHours();*/

        // Переводимо в години, хвилини та секунди
        int hours = (numSeconds / 3600) % 24;           // години [0-23]
        int minutes = (numSeconds / 60) % 60;           // хвилини [0-59]
        int seconds = numSeconds % 60;                  // секунди [0-59]

        System.out.printf("%d:%02d:%02d\n", hours, minutes, seconds);

        // Форматируем строку и сохраняем в переменную
        //String timeString = String.format("%d:%02d:%02d", hours, minutes, seconds);
        //System.out.println(timeString);

        /*DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
        LocalTime afterMiddleNigth = LocalTime.parse(number.toString(), formatter);
        System.out.println("Время после полуночи: " + afterMiddleNigth);*/

        //LocalTime now = LocalTime.now();

        //System.out.println("Текущее время: " + now);
        //System.out.println("Текущее время (форматированное): " + formatterTime);
    }
}

