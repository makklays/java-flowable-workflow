package com.techmatrix18.patterns;

import java.util.WeakHashMap;

/**
 * WeakHashMapExample - WeakHashMap<K, V> is a hash Map in which the keys are stored as weak references.
 *
 * @author Alexander Kuziv
 * @since 20.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class WeakHashMapExample {
    public static void main(String[] args) {
        WeakHashMap<Object, String> map = new WeakHashMap<>();

        Object key = new Object();
        map.put(key, "Value");

        System.out.println("Before GC: " + map);

        key = null; // remove the strong reference

        System.gc(); // call the garbage collector

        try {
            Thread.sleep(1000); // wait a bit
        } catch (InterruptedException ignored) {}

        System.out.println("After GC: " + map);
    }
}

