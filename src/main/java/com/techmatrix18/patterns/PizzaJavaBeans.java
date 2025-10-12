package com.techmatrix18.patterns;

/**
 * Pattern - "JavaBeans"
 *
 * @author Alexander Kuziv
 * @since 12.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class PizzaJavaBeans {

    private String title;
    private String amount;
    private Integer cheese;
    private Integer sausage;
    private Integer mushroom;

    // getters / setters

    public PizzaJavaBeans() { }    // only in JavaBeans the construct without parameters (!)

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getAmount() { return amount; }

    public void setAmount(String amount) { this.amount = amount; }

    public Integer getCheese() { return cheese; }

    public void setCheese(Integer cheese) { this.cheese = cheese; }

    public Integer getSausage() { return sausage; }

    public void setSausage(Integer sausage) { this.sausage = sausage; }

    public Integer getMushroom() { return mushroom; }
    public void setMushroom(Integer mushroom) { this.mushroom = mushroom; }

    @Override
    public String toString() {
        return "PizzaJavaBeans{" +
                "title='" + title + '\'' +
                ", amount='" + amount + '\'' +
                ", cheese=" + cheese +
                ", sausage=" + sausage +
                ", mushroom=" + mushroom +
                '}';
    }
}

// PizzaJavaBeans pizza = new PizzaJavaBeans();
// pizza.getTitle("Pepperoni");
// pizza.getAmount("Large");
// pizza.getCheese(200);
// pizza.getSausage(250);
// pizza.getMushroom(100);
//
// System.out.println(pizza);
// PizzaJavaBeans{title='Pepperoni', amount='Large', cheese=200, sausage=250, mushroom=100}

