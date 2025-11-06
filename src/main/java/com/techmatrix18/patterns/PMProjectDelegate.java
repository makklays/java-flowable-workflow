package com.techmatrix18.patterns;

import org.flowable.engine.delegate.JavaDelegate;

/**
 * Pattern - "Delegate"
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 06-11-2025
 * @version 0.0.1
 */

// Delegate Pattern
interface Programmer {
    void writeCode();
}

// Different programmers from different countries
class ukrainianProgrammer implements Programmer {
    @Override
    public void writeCode() {
        System.out.println("Ukrainian programmer is writing code...");
    }
}

class spainProgrammer implements Programmer {
    @Override
    public void writeCode() {
        System.out.println("Spanish programmer is writing code...");
    }
}

// Delegate work to programmer
public class PMProjectDelegate { // implements JavaDelegate
    private final Programmer programmer;

    public PMProjectDelegate(Programmer programmer) {
        this.programmer = programmer;
    }

    public void createSite() {
        programmer.writeCode();
        System.out.println("Programmer created site successfully!");
    }
}

/*
public class Main {
    public static void main(String[] args) {
        // 1 Создаём конкретных программистов
        Programmer ukrainian = new ukrainianProgrammer();
        Programmer spanish = new spainProgrammer();

        // 2 PM выбирает, кому делегировать задачу
        PMProjectDelegate pm = new PMProjectDelegate(ukrainian);

        // 3 Запускаем делегирование
        System.out.println("=== Delegating to Ukrainian programmer ===");
        pm.createSite();

        pm = new PMProjectDelegate(spanish);

        System.out.println("\n=== Delegating to Spanish programmer ===");
        pm.createSite();

        // 4 Увольняем PM из Украины
        pm = null;

        // 5 Запускаем GC
        System.gc();
        System.out.println("\n=== Fired PM ! ===");
    }
}

Simple example:
=== Delegating to Ukrainian programmer ===
Ukrainian programmer is writing code...
Programmer created site successfully!
=== Delegating to Spanish programmer ===
Spanish programmer is writing code...
Programmer created site successfully!
=== Fired PM ! ===

*/

