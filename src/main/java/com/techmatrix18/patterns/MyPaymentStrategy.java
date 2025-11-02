package com.techmatrix18.patterns;

/**
 * "Strategy" - Pattern
 * for processing payments
 *
 * @author Alexander Kuziv
 * @since 02.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

// Common interface for all strategies
interface PaymentStrategy {
    void pay(double amount);
}

public class MyPaymentStrategy {
    private PaymentStrategy paymentStrategy;

    // Can change strategy at any time
    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void pay(double amount) {
        if (paymentStrategy == null) {
            throw new IllegalStateException("Payment strategy is not set!");
        }
        paymentStrategy.pay(amount);
    }
}

class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}

class PayPalPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid " + amount + " using PayPal.");
    }
}

/*
public class StrategyExample {
    public static void main(String[] args) {
        PaymentContext context = new PaymentContext();

        // Payment by credit card
        context.setPaymentStrategy(new CreditCardPayment());
        context.pay(100.0);

        // Changing the strategy at runtime
        context.setPaymentStrategy(new PayPalPayment());
        context.pay(50.0);
    }
}
*/

