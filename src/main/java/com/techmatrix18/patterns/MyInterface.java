package com.techmatrix18.patterns;

/**
 * My - Interface
 *
 * @author Alexander Kuziv
 * @since 28.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public interface MyInterface {

    // Константы (всегда public static final, даже если не указать)
    int MAX_VALUE = 100;
    String DEFAULT_NAME = "InterfaceDemo";

    // Абстрактный метод (по умолчанию public abstract)
    void doSomething();

    // Default-метод (имеет реализацию, может вызываться через объект)
    default void printInfo() {
        System.out.println("Default method: " + DEFAULT_NAME);
    }

    // Static-метод (можно вызвать без экземпляра: MyInterface.showHelp())
    static void showHelp() {
        System.out.println("Static method in interface");
    }

    // Private-метод (с Java 9)
    // Можно использовать только внутри других default или static методов
    private void logInternal(String message) {
        System.out.println("Private log: " + message);
    }

    // Default-метод, использующий private-метод
    default void logAndRun() {
        logInternal("Preparing to run...");
        doSomething();
    }
}

