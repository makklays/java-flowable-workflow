package com.techmatrix18.patterns;

/**
 * Pattern - "Builder"
 *
 * @author Alexander Kuziv
 * @since 12.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class Pizza {

    private final String title;              // required parameter
    private final String amount;             // not required
    private final Integer cheese;            // not required
    private final Integer sausage;           // not required
    private final Integer mushroom;          // not required

    private Pizza(Builder builder) {
        this.title = builder.title;          // required
        this.amount = builder.amount;        // not required
        this.cheese = builder.cheese;        // not required
        this.sausage = builder.sausage;      // not required
        this.mushroom = builder.mushroom;    // not required
    }

    public static class Builder {
        private String title;                // required parameter
        private String amount;
        private Integer cheese = 100;
        private Integer sausage = 100;
        private Integer mushroom = 100;

        public Builder(String title) {
            this.title = title;              // required parameter here (!)
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder amount(String amount) {
            this.amount = amount;
            return this;
        }

        public Builder cheese(Integer cheese) {
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

        public Pizza build() {
            return new Pizza(this);
        }
    }

    public String getTitle() { return this.title; }
    public String getAmount() { return this.amount; }
    public Integer getCheese() { return this.cheese; }
    public Integer getSausage() { return this.sausage; }
    public Integer getMushroom() { return this.mushroom; }

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

// Pizza pizza = new Pizza.Builder("Pepperoni").amount("Large").cheese(200).sausage(250).mushroom(100).build();
// System.out.println(pizza);
// Pizza{title='Pepperoni', amount='Large', cheese=200, sausage=250, mushroom=100}

