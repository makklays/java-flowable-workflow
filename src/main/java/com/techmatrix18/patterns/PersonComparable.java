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


/*
List<Person> people = List.of(
        new Person("Alex", 30),
        new Person("Maria", 25),
        new Person("John", 40)
);

List<Person> sorted = new ArrayList<>(people);
Collections.sort(sorted); // использует compareTo()

System.out.println(sorted); // [Maria (25), Alex (30), John (40)]
*/


/*
Comparator<T> - MANY caracteristics

Comparator<Person> byName = (p1, p2) -> p1.getName().compareTo(p2.getName());
Collections.sort(people, byName);

Comparator<Person> byAge = (p1, p2) -> Integer.compare(p2.getAge(), p1.getAge());
Collections.sort(people, byAge);
*/

