package com.techmatrix18.model;

import com.techmatrix18.model.enums.DealStage;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Entity
@Table(name = "deals")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;             // External key per client

    @Column(name = "name", nullable = false)
    private String name;               // Name of the transaction

    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;         // Amount

    @Column(name = "currency", length = 5, nullable = false)
    private String currency;           // Currency, example, "USD", "EUR", "USDT"

    @Column(name = "stage", nullable = false)
    @Enumerated(EnumType.STRING)
    private DealStage stage;           // Deal's stage

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;       // Start date

    @Column(name = "close_date")
    private LocalDate closeDate;       // Closing date (if any)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;               // Responsible manager (User)

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // constructs

    public Deal() { }

    // getters / setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public DealStage getStage() {
        return stage;
    }

    public void setStage(DealStage stage) {
        this.stage = stage;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(LocalDate closeDate) {
        this.closeDate = closeDate;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Deal deal)) return false;
        return getId().equals(deal.getId()) && getClient().equals(deal.getClient()) && getName().equals(deal.getName()) && getAmount().equals(deal.getAmount()) && getCurrency().equals(deal.getCurrency()) && getStage() == deal.getStage() && getStartDate().equals(deal.getStartDate()) && getCloseDate().equals(deal.getCloseDate()) && getOwner().equals(deal.getOwner()) && getCreatedAt().equals(deal.getCreatedAt()) && getUpdatedAt().equals(deal.getUpdatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getClient(), getName(), getAmount(), getCurrency(), getStage(), getStartDate(), getCloseDate(), getOwner(), getCreatedAt(), getUpdatedAt());
    }

    @Override
    public String toString() {
        return "Deal{" +
                "id=" + id +
                ", client=" + client +
                ", name='" + name + '\'' +
                ", amount=" + amount +
                ", currency='" + currency + '\'' +
                ", stage=" + stage +
                ", startDate=" + startDate +
                ", closeDate=" + closeDate +
                ", owner=" + owner +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

