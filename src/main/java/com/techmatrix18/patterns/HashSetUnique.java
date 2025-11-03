package com.techmatrix18.patterns;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Alexander Kuziv
 * @since 03.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class HashSetUnique {

    /** Set - это коллекция, которая не допускает дублирование элементов.
     * HashSet - это реализация интерфейса Set, которая использует хеш-таблицу для хранения элементов.
     * HashSet обеспечивает быструю проверку на наличие элемента и эффективное добавление и удаление элементов.
     * Порядок элементов в HashSet не гарантируется.
     *
     * @return Set
     */
    public static Set myFunc () {
        Set<String> names1 = Set.of("Tom", "Alice", "Bob");
        Set<String> names2 = Set.of("Larry", "Moe", "Curly");

        // Объявление пустого неизменяемого списка
        List list = Collections.EMPTY_LIST;

        Set<String> result = new HashSet<>(names1);
        result.addAll(names1);

        return result;
    }

    // PECS - Producer Extends, Consumer Super
    // Производитель - extends, потребитель - super

    /**
     * Метод для объединения двух множеств с использованием дженериков.
     *
     * @param s1 первое множество
     * @param s2 второе множество
     * @param <E> тип элементов в множествах
     * @return объединенное множество
     */
    public static <E> Set<E> union(Set<? extends E> s1, Set<? extends E> s2) {
        Set<E> result = new HashSet<>(s1);
        result.addAll(s2);
        return result;
    }

    /*public void pushAll(Iterable<? extends E> src) {
        for (E e :src)
            push(e);
    }*/
}

