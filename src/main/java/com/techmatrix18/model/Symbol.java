package com.techmatrix18.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Symbol entity representing a trading symbol on an exchange, including its properties and metadata.
 *
 * @author Alexander Kuziv
 * @since 05.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Entity
@Table(name = "symbols", uniqueConstraints = {
    @UniqueConstraint(name = "uk_symbol", columnNames = {"exchange_id", "symbol", "market_type"})
})
public class Symbol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exchange_id", nullable = false)
    private Integer exchangeId;

    @Column(nullable = false, length = 50)
    private String symbol;

    @Column(name = "original_symbol", nullable = false, length = 100)
    private String originalSymbol;

    @Column(name = "market_type", nullable = false, length = 20)
    private String marketType; // Можно использовать Enum с @Enumerated(EnumType.STRING)

    @Column(name = "price_precision", nullable = false)
    private Integer pricePrecision;

    @Column(name = "quantity_precision", nullable = false)
    private Integer quantityPrecision;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // constructs

    public Symbol() { }

    public Symbol(Integer exchangeId, String symbol, String originalSymbol, String marketType,
                  Integer pricePrecision, Integer quantityPrecision) {
        this.exchangeId = exchangeId;
        this.symbol = symbol;
        this.originalSymbol = originalSymbol;
        this.marketType = marketType;
        this.pricePrecision = pricePrecision;
        this.quantityPrecision = quantityPrecision;
    }

    // getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getExchangeId() { return exchangeId; }
    public void setExchangeId(Integer exchangeId) { this.exchangeId = exchangeId; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getOriginalSymbol() { return originalSymbol; }
    public void setOriginalSymbol(String originalSymbol) { this.originalSymbol = originalSymbol; }

    public String getMarketType() { return marketType; }
    public void setMarketType(String marketType) { this.marketType = marketType; }

    public Integer getPricePrecision() { return pricePrecision; }
    public void setPricePrecision(Integer pricePrecision) { this.pricePrecision = pricePrecision; }

    public Integer getQuantityPrecision() { return quantityPrecision; }
    public void setQuantityPrecision(Integer quantityPrecision) { this.quantityPrecision = quantityPrecision; }

    public Boolean getActive() { return isActive; }
    public void setActive(Boolean active) { isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Symbol symbol1)) return false;
        return getId().equals(symbol1.getId()) && getExchangeId().equals(symbol1.getExchangeId()) && getSymbol().equals(symbol1.getSymbol()) && getOriginalSymbol().equals(symbol1.getOriginalSymbol()) && getMarketType().equals(symbol1.getMarketType()) && getPricePrecision().equals(symbol1.getPricePrecision()) && getQuantityPrecision().equals(symbol1.getQuantityPrecision()) && isActive.equals(symbol1.isActive);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getExchangeId(), getSymbol(), getOriginalSymbol(), getMarketType(), getPricePrecision(), getQuantityPrecision(), isActive);
    }

    @Override
    public String toString() {
        return "Symbol{" +
                "id=" + id +
                ", exchangeId=" + exchangeId +
                ", symbol='" + symbol + '\'' +
                ", originalSymbol='" + originalSymbol + '\'' +
                ", marketType='" + marketType + '\'' +
                ", pricePrecision=" + pricePrecision +
                ", quantityPrecision=" + quantityPrecision +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

