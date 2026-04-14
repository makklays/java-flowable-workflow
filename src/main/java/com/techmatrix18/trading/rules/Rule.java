package com.techmatrix18.trading.rules;

import com.techmatrix18.model.Candle;

import java.util.List;

/**
 * Rule interface defines a contract for trading rules that can be evaluated against a list of candles.
 *
 * @author Alexander Kuziv
 * @since 08.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public interface Rule {
    boolean isSatisfied(int index);

    default Rule and(Rule other) {
        return (i) -> this.isSatisfied(i) && other.isSatisfied(i);
    }

    default Rule or(Rule other) {
        return (i) -> this.isSatisfied(i) || other.isSatisfied(i);
    }
}

