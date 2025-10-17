package com.techmatrix18.patterns;

public class Optimization {

    // Very slowly! Do you can find creating an object?
    private static long sum1() {
        Long sum = 0L; // <-- error (!)
        for (long i = 0; i <= Integer.MAX_VALUE; i++) {
            sum += i;
        }
        return sum;
    }

    // Good realization
    private static long sum2() {
        long sum = 0L; // <-- type long without creating a new object Long (!)
        for (long i = 0; i <= Integer.MAX_VALUE; i++) {
            sum += i;
        }
        return sum;
    }
}

