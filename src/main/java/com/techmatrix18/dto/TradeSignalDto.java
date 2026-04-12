package com.techmatrix18.dto;

import java.math.BigDecimal;

/**
 * Trade Signal Dto -
 *
 * @author Alexander Kuziv
 * @since 11.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class TradeSignalDto {
    private Long time;          // Timestamp в миллисекундах (open_time свечи)
    private String type;        // "BUY" или "SELL"
    private BigDecimal price;   // Цена, на которой сработал сигнал
    private String label;       // Текст над/под стрелкой (например, "MACD Cross")

    // Добавьте этот конструктор
    public TradeSignalDto(Long time, String type, BigDecimal price, String label) {
        this.time = time;
        this.type = type;
        this.price = price;
        this.label = label;
    }

    // Не забудьте пустой конструктор для Jackson (JSON)
    public TradeSignalDto() {}

    // Геттеры и сеттеры

    public Long getTime() { return time; }
    public void setTime(Long time) { this.time = time; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
}

