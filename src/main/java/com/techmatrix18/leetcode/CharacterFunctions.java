package com.techmatrix18.leetcode;

/**
 * CharacterFunctions class — Функции для работы с символами
 *
 * @author Alexander Kuziv
 * @since 27.05.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class CharacterFunctions {
    public void main(String[] args) {
        //
    }

    // Проверка, является ли строка палиндромом (игнорируя пробелы, знаки препинания и регистр)
    public boolean isPalidrome(String s) {
        s.toLowerCase().replaceAll("[^a-z0-9]", ""); // удаляем все неалфавитные и нецифровые символы

        //Character.isLetterOrDigit(char c); // проверяем, является ли символ буквой или цифрой
        //Character.toLowerCase(char c);     // приводит символ к нижнему регистру

        int left = 0;
        int right = s.length() - 1;

        while( left < right ) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}

