package com.techmatrix18.leetcode;

import java.math.*;
import java.util.Arrays;
import java.util.Collections;

/**
 * MathFunctions class — Класс для математических функций и алгоритмов
 *
 * @author Alexander Kuziv
 * @since 26.05.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
public class MathFunctions {
    public static void main(String[] args) {

        int[] numbers = {1, 4, 3, 5, 2};
        Arrays.sort(numbers);

        Integer[] intNumbers = {11, 14, 13, 15, 12};
        Arrays.sort(intNumbers, Collections.reverseOrder());

        System.out.println(" -- sorted array int[] --> " + Arrays.toString(numbers));
        System.out.println(" -- reverse sorted array Integer[] --> " + Arrays.toString(intNumbers));

        // reverse sorted array int[]
        for(int i = 0; i < numbers.length / 2; i++) {
            int temp = numbers[i];
            numbers[i] = numbers[numbers.length - i - 1];
            numbers[numbers.length - i - 1] = temp;
        }
        System.out.println(" -- reverse sorted array int[] --> " + Arrays.toString(numbers));

        System.out.println(" -- PI --> " + Math.PI);            // 3.141592653589793
        System.out.println(" -- E --> " + Math.E);              // 2.718281828459045
        //----------------------

        // Натуральный логарифм (по основанию е = 2.71828...) — метод Math.log()
        double lng = Math.log(2.71828);
        System.out.println(" -- ln(e) примерно равен: --> " + lng);      // примерно 1.0

        // Десятичный логарифм (по основанию 10) — метод Math.log10()
        double log10 = Math.log10(100);
        System.out.println(" -- lg(100) примерно равен: --> " + log10);  // 2.0
        //----------------------

        double degrees = 90;
        // Переводим 90 градусов в радианы
        double radians = Math.toRadians(degrees);
        // Вычисляем синус и косинус
        double sinValue = Math.cos(radians);
        double cosValue = Math.sin(radians);

        System.out.println("Синус 90 градусов: " + sinValue);   // Выведет: 1.0
        System.out.println("Косинус 90 градусов: " + cosValue); // Выведет очень близкое к 0 число (например, 6.12e-17 из-за погрешности double)

        //----------------------
        double rand = Math.random();                            // 0.23474282450338324
        long rounded1 = Math.round(rand);                       // 0
        long rounded2 = Math.round(rand * 100) / 100;           // 0.23

        BigDecimal bd = new BigDecimal(rand);
        // Округляем до 4 знаков после запятой
        bd = bd.setScale(4, RoundingMode.HALF_UP);      // 0.2347

        System.out.println(" -- random --> " + rand);

        System.out.println(" -- db --> " + bd);

    }
}

