package com.techmatrix18.model;

import com.techmatrix18.enums.Timeframe;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * Candles (OHLCV) data for a specific symbol and timeframe.
 *
 * @author Alexander Kuziv
 * @since 05.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Entity
@Table(name = "candles")
public class Candle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exchange_id", nullable = false)
    private Integer exchangeId;

    @Column(name = "symbol_id", nullable = false)
    private Long symbolId;

    @Column(nullable = false, length = 10)
    private String timeframe;

    @Column(name = "open_time", nullable = false)
    private Long openTime;

    @Column(nullable = false, precision = 20, scale = 10)
    private BigDecimal open;

    @Column(nullable = false, precision = 20, scale = 10)
    private BigDecimal high;

    @Column(nullable = false, precision = 20, scale = 10)
    private BigDecimal low;

    @Column(nullable = false, precision = 20, scale = 10)
    private BigDecimal close;

    @Column(nullable = false, precision = 24, scale = 10)
    private BigDecimal volume;

    @Column(name = "quote_asset_volume", precision = 24, scale = 10)
    private BigDecimal quoteAssetVolume;

    @Column(name = "trades_count")
    private Integer tradesCount;

    @Column(name = "open_interest", precision = 24, scale = 10)
    private BigDecimal openInterest;

    @Column(name = "funding_rate", precision = 12, scale = 10)
    private BigDecimal fundingRate;

    // constructs

    public Candle() { }

    public Candle(Integer exchangeId, Long symbolId, String timeframe, Long openTime,
                  BigDecimal open, BigDecimal high, BigDecimal low, BigDecimal close,
                  BigDecimal volume) {
        this.exchangeId = exchangeId;
        this.symbolId = symbolId;
        this.timeframe = timeframe;
        this.openTime = openTime;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
    }

    // getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getExchangeId() { return exchangeId; }
    public void setExchangeId(Integer exchangeId) { this.exchangeId = exchangeId; }

    public Long getSymbolId() { return symbolId; }
    public void setSymbolId(Long symbolId) { this.symbolId = symbolId; }

    public String getTimeframe() { return timeframe; }
    public void setTimeframe(String timeframe) { this.timeframe = timeframe; }

    public Long getOpenTime() { return openTime; }
    public void setOpenTime(Long openTime) { this.openTime = openTime; }

    @Transient // Hibernate будет игнорировать это при записи в БД
    public long getCloseTime() {
        if (this.timeframe == null) return openTime; // Защита от Null
        Timeframe tf = Timeframe.fromCode(timeframe);
        return tf.getCloseTime(openTime);
    }
    public void setCloseTime(long closeTime) {
        if (this.timeframe == null) {
            // Если таймфрейм еще не задан, используем дефолтный или просто выходим
            return;
        }
        // Если нужно, можно реализовать обратную логику для установки openTime на основе closeTime
        Timeframe tf = Timeframe.fromCode(timeframe);
        this.openTime = closeTime - tf.getMsec() + 1;
    }

    public BigDecimal getOpen() { return open; }
    public void setOpen(BigDecimal open) { this.open = open; }

    public BigDecimal getHigh() { return high; }
    public void setHigh(BigDecimal high) { this.high = high; }

    public BigDecimal getLow() { return low; }
    public void setLow(BigDecimal low) { this.low = low; }

    public BigDecimal getClose() { return close; }
    public void setClose(BigDecimal close) { this.close = close; }

    public BigDecimal getVolume() { return volume; }
    public void setVolume(BigDecimal volume) { this.volume = volume; }

    public BigDecimal getQuoteAssetVolume() { return quoteAssetVolume; }
    public void setQuoteAssetVolume(BigDecimal quoteAssetVolume) { this.quoteAssetVolume = quoteAssetVolume; }

    public Integer getTradesCount() { return tradesCount; }
    public void setTradesCount(Integer tradesCount) { this.tradesCount = tradesCount; }

    public BigDecimal getOpenInterest() { return openInterest; }
    public void setOpenInterest(BigDecimal openInterest) { this.openInterest = openInterest; }

    public BigDecimal getFundingRate() { return fundingRate; }
    public void setFundingRate(BigDecimal fundingRate) { this.fundingRate = fundingRate; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Candle candle)) return false;
        return getId().equals(candle.getId()) && getExchangeId().equals(candle.getExchangeId()) && getSymbolId().equals(candle.getSymbolId()) && getTimeframe().equals(candle.getTimeframe()) && getOpenTime().equals(candle.getOpenTime()) && getOpen().equals(candle.getOpen()) && getHigh().equals(candle.getHigh()) && getLow().equals(candle.getLow()) && getClose().equals(candle.getClose()) && getVolume().equals(candle.getVolume()) && getQuoteAssetVolume().equals(candle.getQuoteAssetVolume()) && getTradesCount().equals(candle.getTradesCount()) && getOpenInterest().equals(candle.getOpenInterest()) && getFundingRate().equals(candle.getFundingRate());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getExchangeId(), getSymbolId(), getTimeframe(), getOpenTime(), getOpen(), getHigh(), getLow(), getClose(), getVolume(), getQuoteAssetVolume(), getTradesCount(), getOpenInterest(), getFundingRate());
    }

    @Override
    public String toString() {
        return "Candle{" +
                "id=" + id +
                ", exchangeId=" + exchangeId +
                ", symbolId=" + symbolId +
                ", timeframe='" + timeframe + '\'' +
                ", openTime=" + openTime +
                ", open=" + open +
                ", high=" + high +
                ", low=" + low +
                ", close=" + close +
                ", volume=" + volume +
                ", quoteAssetVolume=" + quoteAssetVolume +
                ", tradesCount=" + tradesCount +
                ", openInterest=" + openInterest +
                ", fundingRate=" + fundingRate +
                '}';
    }
}

