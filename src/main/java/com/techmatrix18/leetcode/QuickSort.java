package com.techmatrix18.leetcode;

/**
 * QuickSort class — Быстрая сортировка
 *
 * Быструю сортировку (Quick Sort) - на практике используется именно она (включая метод Arrays.sort() для примитивов),
 * так как её средняя скорость составляет O(N*logN), и она не требует выделения дополнительной памяти.
 *
 * @author Alexander Kuziv
 * @since 29.05.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class QuickSort {
    public void sort(int[] nums) {
        if (nums == null || nums.length == 0) {
            return;
        }
        quickSort(nums, 0, nums.length - 1);
    }

    private void quickSort(int[] nums, int low, int high) {
        if (low < high) {
            // Разделяем массив и получаем индекс опорного элемента
            // Partition the array and get the pivot index
            int pivotIndex = partition(nums, low, high);

            // Рекурсивно сортируем левую и правую части
            // Recursively sort the left and right parts
            quickSort(nums, low, pivotIndex - 1);
            quickSort(nums, pivotIndex + 1, high);
        }
    }

    private int partition(int[] nums, int low, int high) {
        // В качестве опорного элемента (pivot) берем самый правый элемент
        // Use the rightmost element as the pivot
        int pivot = nums[high];
        int i = low - 1; // Индекс для элементов, которые меньше опорного // Index of the elements smaller than the pivot

        for (int j = low; j < high; j++) {
            // Если текущий элемент меньше или равен опорному // If the current element is less than or equal to the pivot
            if (nums[j] <= pivot) {
                i++;
                // i - указывает на число больше опорного
                // j - на число меньше или равное опорному, поэтому мы их меняем местами
                swap(nums, i, j); // Перемещаем его в левую часть // Move it to the left side
            }
        }

        // Ставим сам опорный элемент на его правильное место (между меньшими и большими)
        // Place the pivot element in its correct position (between smaller and larger elements)
        swap(nums, i + 1, high);
        return i + 1; // Возвращаем индекс опорного элемента // Return the index of the pivot element
    }

    // Swap two elements in the array
    // Поменять местами два элемента в массиве
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}

