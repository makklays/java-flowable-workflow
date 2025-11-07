package com.techmatrix18.patterns;

/**
 * Pattern - "Builder"
 *
 * @author Alexander Kuziv
 * @since 12.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class PizzaBuilder {

    // Title of the pizza is required
    private final String title;
    // Amount of pizza is not required
    private final String amount;
    // Cheese quantity is not required
    private final Integer cheese;
    // Sausage quantity is not required
    private final Integer sausage;
    // Mushroom quantity is not required
    private final Integer mushroom;

    /**
     * Private constructor to enforce object creation through the Builder
     */
    private PizzaBuilder(Builder builder) {
        this.title = builder.title;          // required
        this.amount = builder.amount;        // not required
        this.cheese = builder.cheese;        // not required
        this.sausage = builder.sausage;      // not required
        this.mushroom = builder.mushroom;    // not required
    }

    /**
     * Static nested Builder class
     */
    public static class Builder {
        private final String title;          // required parameter
        private String amount;
        private Integer cheese = 100;
        private Integer sausage = 100;
        private Integer mushroom = 100;

        public Builder(String title) {
            if (title == null || title.isEmpty()) {
                throw new IllegalArgumentException("Title is required");
            }
            this.title = title;              // required parameter here (!)
        }

        public Builder amount(String amount) {
            this.amount = amount;
            return this;
        }

        public Builder cheese(Integer cheese) {
            if (cheese != null && cheese < 0) throw new IllegalArgumentException("Cheese cannot be negative");
            this.cheese = cheese;
            return this;
        }

        public Builder sausage(Integer sausage) {
            this.sausage = sausage;
            return this;
        }

        public Builder mushroom(Integer mushroom) {
            this.mushroom = mushroom;
            return this;
        }

        public PizzaBuilder build() {
            return new PizzaBuilder(this);
        }
    }

    // Get Title of the pizza
    public String getTitle() { return this.title; }
    // Get Amount of the pizza
    public String getAmount() { return this.amount; }
    // Get Cheese quantity
    public Integer getCheese() { return this.cheese; }
    // Get Sausage quantity
    public Integer getSausage() { return this.sausage; }
    // Get Mushroom quantity
    public Integer getMushroom() { return this.mushroom; }

    /**
     * Override toString() for better representation
     *
     * @return String representation of the PizzaBuilder object
     */
    @Override
    public String toString() {
        return "Pizza{" +
                "title='" + title + '\'' +
                ", amount='" + amount + '\'' +
                ", cheese=" + cheese +
                ", sausage=" + sausage +
                ", mushroom=" + mushroom +
                '}';
    }
}

// PizzaBuilder pizza = new PizzaBuilder.Builder("Pepperoni")
//                                      .amount("Large")
//                                      .cheese(200)
//                                      .sausage(250)
//                                      .mushroom(100)
//                                      .build();
//
// System.out.println(pizza);
// PizzaBuilder{title='Pepperoni', amount='Large', cheese=200, sausage=250, mushroom=100}

