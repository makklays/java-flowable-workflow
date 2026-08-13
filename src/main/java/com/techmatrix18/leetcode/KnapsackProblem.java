package com.techmatrix18.leetcode;

/**
 * Не брать предмет: dp[i-1][w]
 * Брать предмет: v[i-1] + dp[i-1][w - w[i-1]]
 *
 * @author Alexander Kuziv
 * @since 13.08.2026
 * @company TechMatrix18
 * @version 0.0.1
 */

public class KnapsackProblem {
    public static int solveKnapsack(int W, int[] weights, int[] values) {
        // N — это количество предметов (длина массива)
        int N = values.length;

        // Создаем таблицу DP
        int[][] dp = new int[N + 1][W + 1];

        // Заполняем таблицу по строкам и столбцах
        for(int i = 1; i <= N; i++) {
            for(int w = 1; w <= W; w++) {
                if (weights[i - 1] <= w) {
                    //
                    dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        // Финальный ответ находится в самом правом нижнем углу
        return dp[N][W];
    }

    public static void main(String[] args) {
        int W = 5;                  // вместимость рюкзака
        int[] weights = {1, 2, 3};  // вес предметов (яблоко, ноутбук, гитара)
        int[] values = {6, 10, 12}; // ценность предметов

        int maxProfit = solveKnapsack(W, weights, values);

        System.out.println("Максимальная вместимость в рюкзаке: $" + maxProfit);
        // Должно вывести: Максимальная вместимость в рюкзаке: $22
    }
}

