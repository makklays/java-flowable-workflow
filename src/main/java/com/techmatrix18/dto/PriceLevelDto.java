package com.techmatrix18.dto;

import java.math.BigDecimal;

/**
 * Price Level Dto -
 *
 * @author Alexander Kuziv
 * @since 11.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class PriceLevelDto {
    private BigDecimal price;   // Ценовое значение уровня
    private String type;        // "SUPPORT" (зеленая) или "RESISTANCE" (красная)
    private Double strength;    // Опционально: сила уровня (сколько раз цена его касалась)

    // Добавьте этот конструктор
    public PriceLevelDto(BigDecimal price, String type) {
        this.price = price;
        this.type = type;
    }

    public PriceLevelDto() {}

    // Геттеры и сеттеры

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getStrength() { return strength; }
    public void setStrength(Double strength) { this.strength = strength; }
}

