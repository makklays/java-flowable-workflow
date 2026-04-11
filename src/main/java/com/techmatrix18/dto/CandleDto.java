package com.techmatrix18.dto;

import java.math.BigDecimal;

/**
 * Data Transfer Object for Candle entity, used for transferring candle data between layers of the application.
 *
 * @author Alexander Kuziv
 * @since 06.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class CandleDto {

    private Long id;

    private Integer exchangeId;

    private Long symbolId;
    private String symbolName;

    private String timeframe;

    private Long openTime;

    private BigDecimal open;

    private BigDecimal high;

    private BigDecimal low;

    private BigDecimal close;

    private BigDecimal volume;

    private BigDecimal quoteAssetVolume;

    private Integer tradesCount;

    private BigDecimal openInterest;

    private BigDecimal fundingRate;

    // getters/setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getExchangeId() { return exchangeId; }
    public void setExchangeId(Integer exchangeId) { this.exchangeId = exchangeId; }

    public Long getSymbolId() { return symbolId; }
    public void setSymbolId(Long symbolId) { this.symbolId = symbolId; }

    public String getSymbolName() { return symbolName; }
    public void setSymbolName(String symbolName) { this.symbolName = symbolName; }

    public String getTimeframe() { return timeframe; }
    public void setTimeframe(String timeframe) { this.timeframe = timeframe; }

    public Long getOpenTime() { return openTime; }
    public void setOpenTime(Long openTime) { this.openTime = openTime; }

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
}

