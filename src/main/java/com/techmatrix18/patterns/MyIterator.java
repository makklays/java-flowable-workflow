package com.techmatrix18.patterns;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Iterator;
import java.util.LinkedList;

/**
 * This is MyIterator class
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 26-10-2025
 * @version 0.0.1
 */

public class MyIterator {

    public static final Logger log = LoggerFactory.getLogger(MyIterator.class);

    public void myList() {
        LinkedList<String> list = new LinkedList<String>();
        list.add("One");
        list.add("Two");
        list.add("Three");

        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String element = iterator.next();
            log.info("Element: {}", element);
        }
    }
}

