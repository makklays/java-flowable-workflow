package com.techmatrix18.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * "OlapCrm" - Entity with data for Analytics from CRM
 *
 * All reports did with 'olap_' column's tables in DB,
 * across Martin Kleppman's book Designing Data-Intensive Applications.
 *
 * @author Alexander Kuziv
 * @since 30.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Entity
@Table(name = "olap_crm")
public class OlapCrm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "activities")
    private int activities;

    @Column(name = "contacts")
    private int contacts;

    @Column(name = "clients")
    private int clients;

    @Column(name = "deals")
    private int deals;

    @Column(name = "sum_amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal sumAmount;

    @Column(name = "first_deal_date")
    private LocalDateTime firstDealDate;

    @Column(name = "last_deal_date")
    private LocalDateTime lastDealDate;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // constructs

    public OlapCrm() { } // required for JPA

    public OlapCrm(User owner, int activities, int contacts, int clients, int deals) {
        this.owner = owner;
        this.activities = activities;
        this.contacts = contacts;
        this.clients = clients;
        this.deals = deals;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public OlapCrm(User owner, int activities, int contacts, int clients, int deals, BigDecimal sumAmount) {
        this.owner = owner;
        this.activities = activities;
        this.contacts = contacts;
        this.clients = clients;
        this.deals = deals;
        this.sumAmount = sumAmount;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public OlapCrm(User owner, int activities, int contacts, int clients, int deals, BigDecimal sumAmount,
                   LocalDateTime firstDealDate, LocalDateTime lastDealDate,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.owner = owner;
        this.activities = activities;
        this.contacts = contacts;
        this.clients = clients;
        this.deals = deals;
        this.sumAmount = sumAmount;
        this.firstDealDate = firstDealDate;
        this.lastDealDate = lastDealDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public int getActivities() {
        return activities;
    }

    public void setActivities(int activities) {
        this.activities = activities;
    }

    public int getContacts() {
        return contacts;
    }

    public void setContacts(int contacts) {
        this.contacts = contacts;
    }

    public int getClients() {
        return clients;
    }

    public void setClients(int clients) {
        this.clients = clients;
    }

    public int getDeals() {
        return deals;
    }

    public void setDeals(int deals) {
        this.deals = deals;
    }

    public BigDecimal getSumAmount() {
        return sumAmount;
    }

    public void setSumAmount(BigDecimal sumAmount) {
        this.sumAmount = sumAmount;
    }

    public LocalDateTime getFirstDealDate() {
        return firstDealDate;
    }

    public void setFirstDealDate(LocalDateTime firstDealDate) {
        this.firstDealDate = firstDealDate;
    }

    public LocalDateTime getLastDealDate() {
        return lastDealDate;
    }

    public void setLastDealDate(LocalDateTime lastDealDate) {
        this.lastDealDate = lastDealDate;
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
        if (!(o instanceof OlapCrm olapCrm)) return false;
        return getActivities() == olapCrm.getActivities() && getContacts() == olapCrm.getContacts() &&
                getClients() == olapCrm.getClients() && getDeals() == olapCrm.getDeals() &&
                getId().equals(olapCrm.getId()) && getOwner().equals(olapCrm.getOwner());
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (getId() != null ? getId().hashCode() : 0);
        result = 31 * result + (getOwner() != null ? getOwner().hashCode() : 0);
        result = 31 * result + getActivities();
        result = 31 * result + getContacts();
        result = 31 * result + getClients();
        result = 31 * result + getDeals();
        return result;
    }
}

