package com.techmatrix18.dto;

import java.math.BigDecimal;

/**
 * Trade Dto -
 *
 * @author Alexander Kuziv
 * @since 14.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class TradeDto {
    public Long entryTime;
    public Long exitTime;
    public BigDecimal entryPrice;
    public BigDecimal exitPrice;
    public String type; // BUY
    public BigDecimal profit;
    public BigDecimal profitPercent;
    public BigDecimal stopLoss;

    public TradeDto() { }

    public TradeDto(Long entryTime, BigDecimal entryPrice, String type) {
        this.entryTime = entryTime;
        this.entryPrice = entryPrice;
        this.type = type;
    }

    // Геттеры и сеттеры

    public Long getEntryTime() { return entryTime; }
    public void setEntryTime(Long entryTime) { this.entryTime = entryTime; }

    public Long getExitTime() { return exitTime; }
    public void setExitTime(Long exitTime) { this.exitTime = exitTime; }

    public BigDecimal getEntryPrice() { return entryPrice; }
    public void setEntryPrice(BigDecimal entryPrice) { this.entryPrice = entryPrice; }

    public BigDecimal getExitPrice() { return exitPrice; }
    public void setExitPrice(BigDecimal exitPrice) { this.exitPrice = exitPrice; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public BigDecimal getProfit() { return profit; }
    public void setProfit(BigDecimal profit) { this.profit = profit; }

    public BigDecimal getProfitPercent() { return profitPercent; }
    public void setProfitPercent(BigDecimal profitPercent) { this.profitPercent = profitPercent; }

    public BigDecimal getStopLoss() { return stopLoss; }
    public void setStopLoss(BigDecimal stopLoss) { this.stopLoss = stopLoss; }
}

