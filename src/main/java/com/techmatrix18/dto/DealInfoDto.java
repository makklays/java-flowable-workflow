package com.techmatrix18.dto;

import java.math.BigDecimal;

public class DealInfoDto {

    private Long dealId;
    private String dealName;
    private BigDecimal amount;
    private String currency;
    private String clientFirstname;
    private String clientLastname;

    public DealInfoDto(Long dealId, String dealName, BigDecimal amount, String currency, String clientFirstname, String clientLastname) {
        this.dealId = dealId;
        this.dealName = dealName;
        this.amount = amount;
        this.currency = currency;
        this.clientFirstname = clientFirstname;
        this.clientLastname = clientLastname;
    }

    // getters and setters

    public Long getDealId() {
        return dealId;
    }

    public void setDealId(Long dealId) {
        this.dealId = dealId;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getClientFirstname() {
        return clientFirstname;
    }

    public void setClientFirstname(String clientFirstname) {
        this.clientFirstname = clientFirstname;
    }

    public String getClientLastname() {
        return clientLastname;
    }

    public void setClientLastname(String clientLastname) {
        this.clientLastname = clientLastname;
    }
}

