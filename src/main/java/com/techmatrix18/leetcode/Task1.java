package com.techmatrix18.leetcode;

import java.util.Arrays;

/**
 * Task1 class — Техзадание №1 — “Два числа в массиве, дающие в сумме заданное значение”
 *
 * Level: Easy - LeetCode
 *
 * Условие:
 * Дан массив чисел nums и число target.
 * Нужно вернуть индексы двух чисел, которые в сумме дают target.
 *
 * Гарантируется, что решение одно, и нельзя использовать один и тот же элемент два раза.
 *
 * @author Alexander Kuziv
 * @since 16.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class Task1 {
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 4, 5, 15};
        int target = 9;
        int[] result = {};

        outer:
        for(int i = 0; i < nums.length; i++) {
            for(int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    result = new int[]{i, j};
                    break outer; // выйти сразу из обоих циклов (по умолчанию break выходит только из одного цикла)
                }
            }
        }

        System.out.println("Результат: " + Arrays.toString(result));
    }
}

