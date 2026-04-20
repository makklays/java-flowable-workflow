package com.techmatrix18.dto;

import java.math.BigDecimal;

/**
 * Open Trade Dto
 *
 * @author Alexander Kuziv
 * @since 19.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class OpenTradeDto {

    private Long userId;              // Кто открывает
    private Integer exchangeId;       // 1=Binance, 2=ByBit
    private String exchange;          // "Binance"
    private Long symbolId;            // ID монеты из БД
    private String symbol;            // "BTCUSDT"

    private String side;              // "BUY" или "SELL"
    private BigDecimal quantity;      // Объем/Количество
    private BigDecimal openPrice;     // Цена входа

    private Integer leverage;         // Плечо (default 1)

    private BigDecimal stopLoss;      // Опционально
    private BigDecimal takeProfit;    // Опционально

    private String tradeComment;      // Комментарий (если есть)

    // getters and setters

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Integer getExchangeId() { return exchangeId; }
    public void setExchangeId(Integer exchangeId) { this.exchangeId = exchangeId; }

    public String getExchange() { return exchange; }
    public void setExchange(String exchange) { this.exchange = exchange; }

    public Long getSymbolId() { return symbolId; }
    public void setSymbolId(Long symbolId) { this.symbolId = symbolId; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getSide() { return side; }
    public void setSide(String side) { this.side = side; }

    public BigDecimal getQuantity() { return quantity; }
    public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }

    public BigDecimal getOpenPrice() { return openPrice; }
    public void setOpenPrice(BigDecimal openPrice) { this.openPrice = openPrice; }

    public Integer getLeverage() { return leverage; }
    public void setLeverage(Integer leverage) { this.leverage = leverage; }

    public BigDecimal getStopLoss() { return stopLoss; }
    public void setStopLoss(BigDecimal stopLoss) { this.stopLoss = stopLoss; }

    public BigDecimal getTakeProfit() { return takeProfit; }
    public void setTakeProfit(BigDecimal takeProfit) { this.takeProfit = takeProfit; }

    public String getTradeComment() { return tradeComment; }
    public void setTradeComment(String tradeComment) { this.tradeComment = tradeComment; }
}

