package com.techmatrix18.patterns;

/**
 * Абстрактный класс — это неполный класс, который может содержать:
 *
 * и абстрактные методы (без реализации),
 * и обычные методы (с реализацией),
 * и поля (в том числе состояние объекта),
 * и конструкторы.
 *
 * @author Alexander Kuziv
 * @since 28.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public abstract class MyAbstractClass {

    // Поля (можно любые: private, protected, public, static, final и т.д.)
    private int id;
    protected String name;
    public static final String TYPE = "AbstractDemo";
    private static int instanceCount = 0;

    // Конструктор (в абстрактных классах допустим)
    public MyAbstractClass(String name) {
        this.name = name;
        instanceCount++;
    }

    // Абстрактный метод (обязательно переопределяется в подклассах)
    public abstract void doWork();
    public abstract int calculate(int a, int b);

    // Обычный метод с реализацией
    public void printName() {
        System.out.println("Name: " + name);
    }

    // Статический метод
    public static void showInstanceCount() {
        System.out.println("Instances created: " + instanceCount);
    }

    // Protected метод
    protected void log(String message) {
        System.out.println("LOG: " + message);
    }

    // Final метод (нельзя переопределять в наследниках)
    public final void finalizeWork() {
        System.out.println("Finalizing work for " + name);
    }
}

