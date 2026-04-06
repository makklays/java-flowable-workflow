package com.techmatrix18.dto;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for Symbol entity, used for transferring symbol data between layers of the application.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class SymbolDto {

    private Long id;

    private Integer exchangeId;

    private String symbol;

    private String originalSymbol;

    private String baseAsset;
    private String quoteAsset;

    private String marketType;    // SPOT, FUTURES, OPTIONS

    private Integer pricePrecision;

    private Integer quantityPrecision;

    private long historyStartTime;
    private long historyEndTime;

    private Boolean isActive = true;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // getters/setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getExchangeId() { return exchangeId; }
    public void setExchangeId(Integer exchangeId) { this.exchangeId = exchangeId; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getOriginalSymbol() { return originalSymbol; }
    public void setOriginalSymbol(String originalSymbol) { this.originalSymbol = originalSymbol; }

    public String getBaseAsset() { return baseAsset; }
    public void setBaseAsset(String baseAsset) { this.baseAsset = baseAsset; }

    public String getQuoteAsset() { return quoteAsset; }
    public void setQuoteAsset(String quoteAsset) { this.quoteAsset = quoteAsset; }

    public String getMarketType() { return marketType; }
    public void setMarketType(String marketType) { this.marketType = marketType; }

    public Integer getPricePrecision() { return pricePrecision; }
    public void setPricePrecision(Integer pricePrecision) { this.pricePrecision = pricePrecision; }

    public Integer getQuantityPrecision() { return quantityPrecision; }
    public void setQuantityPrecision(Integer quantityPrecision) { this.quantityPrecision = quantityPrecision; }

    public long getHistoryStartTime() { return historyStartTime; }
    public void setHistoryStartTime(long historyStartTime) { this.historyStartTime = historyStartTime; }

    public long getHistoryEndTime() { return historyEndTime; }
    public void setHistoryEndTime(long historyEndTime) { this.historyEndTime = historyEndTime; }

    public Boolean getActive() { return isActive; }
    public void setActive(Boolean active) { isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}

