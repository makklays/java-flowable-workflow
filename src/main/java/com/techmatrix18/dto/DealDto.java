package com.techmatrix18.dto;

import com.techmatrix18.model.Client;
import com.techmatrix18.model.enums.DealStage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class DealDto {

    private Long id;

    @NotNull(message = "Client is required")
    private Client client;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Amount is required")
    private String amount;

    @NotBlank(message = "Currency is required")
    private String currency;

    @NotNull(message = "Stage is required")
    private DealStage stage;

    @NotBlank(message = "Start Date is required")
    private String startDate;

    @NotBlank(message = "Close Date is required")
    private String closeDate;

    // getters/setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Client getClient() { return client; }

    public void setClient(Client client) { this.client = client; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getAmount() { return amount; }

    public void setAmount(String amount) { this.amount = amount; }

    public String getCurrency() { return currency; }

    public void setCurrency(String currency) { this.currency = currency; }

    public DealStage getStage() { return stage; }

    public void setStage(DealStage stage) { this.stage = stage; }

    public String getStartDate() { return startDate; }

    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getCloseDate() { return closeDate; }

    public void setCloseDate(String closeDate) { this.closeDate = closeDate; }
}

