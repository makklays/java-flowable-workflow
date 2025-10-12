package com.techmatrix18.patterns;

/**
 * Pattern - "Singleton"
 *
 * @author Alexander Kuziv
 * @since 12.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class PizzaSingleton {

    private static PizzaSingleton INSTANCE;
    private String title;
    private String amount;
    private int cheese;
    private int sausage;
    private int mushroom;

    private PizzaSingleton(String title, String amount, int cheese, int sausage, int mushroom) {
        this.title = title;
        this.amount = amount;
        this.cheese = cheese;
        this.sausage = sausage;
        this.mushroom = mushroom;
    }

    public static PizzaSingleton getInstance(String title, String amount, int cheese, int sausage, int mushroom) {
        if (INSTANCE == null) {
            INSTANCE = new PizzaSingleton(title, amount, cheese, sausage, mushroom);
        }
        return INSTANCE;
    }

    public void leaveBuilding() {
        //
    }

    @Override
    public String toString() {
        return "PizzaSingleton{" +
                "title='" + title + '\'' +
                ", amount='" + amount + '\'' +
                ", cheese=" + cheese +
                ", sausage=" + sausage +
                ", mushroom=" + mushroom +
                '}';
    }
}

// PizzaSingleton pizza = PizzaSingleton.getInstance("Pepperoni", "Large", 200, 250, 100);
//
// System.out.println(pizza);
// PizzaJavaBeans{title='Pepperoni', amount='Large', cheese=200, sausage=250, mushroom=100}

