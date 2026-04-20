package com.techmatrix18.dto;

import java.math.BigDecimal;

/**
 * Close Trade Dto
 *
 * @author Alexander Kuziv
 * @since 19.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class CloseTradeDto {

    private Long tradeId;             // ID записи в таблице trades

    private BigDecimal closePrice;    // Фактическая цена закрытия

    private String closeReason;       // MANUAL, STOP_LOSS, TAKE_PROFIT

    private String tradeComment;      // Можно дополнить существующий комментарий

    // profitLoss обычно считается на бэкенде,
    // но если фронт передает готовое значение:
    private BigDecimal profitLoss;

    // Getters and setters

    public Long getTradeId() { return tradeId; }
    public void setTradeId(Long tradeId) { this.tradeId = tradeId; }

    public BigDecimal getClosePrice() { return closePrice; }
    public void setClosePrice(BigDecimal closePrice) { this.closePrice = closePrice; }

    public String getCloseReason() { return closeReason; }
    public void setCloseReason(String closeReason) { this.closeReason = closeReason; }

    public String getTradeComment() { return tradeComment; }
    public void setTradeComment(String tradeComment) { this.tradeComment = tradeComment; }

    public BigDecimal getProfitLoss() { return profitLoss; }
    public void setProfitLoss(BigDecimal profitLoss) { this.profitLoss = profitLoss; }
}

