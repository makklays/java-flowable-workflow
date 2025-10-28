package com.techmatrix18.patterns;

/**
 * Comparable interface example - compare persons by age (only ONE characteristic).
 *
 * @author Alexander Kuziv
 * @since 28.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class PersonComparable implements Comparable<PersonComparable> {
    private String name;
    private int age; // <-- characteristic for comparison
    private int dick;

    public PersonComparable(String name, int age, int dick) {
        this.name = name;
        this.age = age;
        this.dick = dick;
    }

    @Override
    public int compareTo(PersonComparable other) {
        return Integer.compare(this.age, other.age); // compare by age ggggg))
    }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

