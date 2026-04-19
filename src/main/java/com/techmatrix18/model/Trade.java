package com.techmatrix18.model;

import com.techmatrix18.enums.TradeSide;
import com.techmatrix18.enums.TradeStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.math.BigDecimal;

/**
 * Trade entity representing a trading trade on an exchange, including its properties and metadata.
 *
 * @author Alexander Kuziv
 * @since 19.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Entity
@Table(name = "trades")
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "exchange_id", nullable = false)
    private Integer exchangeId;

    @Column(nullable = false, length = 25)
    private String exchange;

    @Column(name = "symbol_id", nullable = false)
    private Long symbolId;

    @Column(nullable = false, length = 25)
    private String symbol;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TradeSide side; // Enum: BUY, SELL

    @Column(nullable = false, precision = 24, scale = 10)
    private BigDecimal quantity;

    @Column(name = "fee_entry", precision = 24, scale = 10)
    private BigDecimal feeEntry = BigDecimal.ZERO;

    @Column(name = "fee_exit", precision = 24, scale = 10)
    private BigDecimal feeExit = BigDecimal.ZERO;

    private Integer leverage = 1;

    @Column(name = "open_price", nullable = false, precision = 24, scale = 10)
    private BigDecimal openPrice;

    @Column(name = "close_price", precision = 24, scale = 10)
    private BigDecimal closePrice;

    @Column(name = "stop_loss", precision = 24, scale = 10)
    private BigDecimal stopLoss;

    @Column(name = "take_profit", precision = 24, scale = 10)
    private BigDecimal takeProfit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TradeStatus status = TradeStatus.OPEN; // Enum: OPEN, CLOSED

    @Column(name = "trade_comment")
    private String tradeComment;

    @Column(name = "close_reason", length = 25)
    private String closeReason;

    @Column(name = "profit_loss", precision = 24, scale = 10)
    private BigDecimal profitLoss;

    @Column(name = "opened_at")
    private LocalDateTime openedAt;

    @Column(name = "closed_at")
    private LocalDateTime closedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // constructs

    public Trade() { }

    // getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public TradeSide getSide() { return side; }
    public void setSide(TradeSide side) { this.side = side; }

    public BigDecimal getQuantity() { return quantity; }
    public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }

    public BigDecimal getFeeEntry() { return feeEntry; }
    public void setFeeEntry(BigDecimal feeEntry) { this.feeEntry = feeEntry; }

    public BigDecimal getFeeExit() { return feeExit; }
    public void setFeeExit(BigDecimal feeExit) { this.feeExit = feeExit; }

    public Integer getLeverage() { return leverage; }
    public void setLeverage(Integer leverage) { this.leverage = leverage; }

    public BigDecimal getOpenPrice() { return openPrice; }
    public void setOpenPrice(BigDecimal openPrice) { this.openPrice = openPrice; }

    public BigDecimal getClosePrice() { return closePrice; }
    public void setClosePrice(BigDecimal closePrice) { this.closePrice = closePrice; }

    public BigDecimal getStopLoss() { return stopLoss; }
    public void setStopLoss(BigDecimal stopLoss) { this.stopLoss = stopLoss; }

    public BigDecimal getTakeProfit() { return takeProfit; }
    public void setTakeProfit(BigDecimal takeProfit) { this.takeProfit = takeProfit; }

    public TradeStatus getStatus() { return status; }
    public void setStatus(TradeStatus status) { this.status = status; }

    public String getTradeComment() { return tradeComment; }
    public void setTradeComment(String tradeComment) { this.tradeComment = tradeComment; }

    public String getCloseReason() { return closeReason; }
    public void setCloseReason(String closeReason) { this.closeReason = closeReason; }

    public BigDecimal getProfitLoss() { return profitLoss; }
    public void setProfitLoss(BigDecimal profitLoss) { this.profitLoss = profitLoss; }

    public LocalDateTime getOpenedAt() { return openedAt; }
    public void setOpenedAt(LocalDateTime openedAt) { this.openedAt = openedAt; }

    public LocalDateTime getClosedAt() { return closedAt; }
    public void setClosedAt(LocalDateTime closedAt) { this.closedAt = closedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

