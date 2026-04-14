package com.techmatrix18.dto;

import java.util.List;

/**
 * Backtest Dto -
 *
 * @author Alexander Kuziv
 * @since 11.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class BacktestDto {
    private List<CandleDto> candles;
    private List<SignalDto> signals;
    private List<TradeDto> trades;
    private List<PriceLevelDto> levels;

    // Рекомендуется добавить краткую статистику теста
    private Integer totalTrades;
    private Double profitLoss;

    // Конструкторы, геттеры и сеттеры

    public BacktestDto() {}

    public List<CandleDto> getCandles() { return candles; }
    public void setCandles(List<CandleDto> candles) { this.candles = candles; }

    public List<SignalDto> getSignals() { return signals; }
    public void setSignals(List<SignalDto> signals) { this.signals = signals; }

    public List<TradeDto> getTrades() { return trades; }
    public void setTrades(List<TradeDto> trades) { this.trades = trades; }

    public List<PriceLevelDto> getLevels() { return levels; }
    public void setLevels(List<PriceLevelDto> levels) { this.levels = levels; }

    public Integer getTotalTrades() { return totalTrades; }
    public void setTotalTrades(Integer totalTrades) { this.totalTrades = totalTrades; }

    public Double getProfitLoss() { return profitLoss; }
    public void setProfitLoss(Double profitLoss) { this.profitLoss = profitLoss; }
}

