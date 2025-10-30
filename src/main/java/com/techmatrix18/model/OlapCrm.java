package com.techmatrix18.model;

import jakarta.persistence.*;

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

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "activities")
    private int activities;

    @Column(name = "contacts")
    private int contacts;

    @Column(name = "clientes")
    private int clientes;

    @Column(name = "deals")
    private int deals;

    @Column(name = "sum_amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal sumAmount;

    @Column(name = "first_deal_date")
    private LocalDateTime firstDealDate;

    @Column(name = "last_deal_date")
    private LocalDateTime lastDealDate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // constructs

    public OlapCrm() { } // required for JPA

    public OlapCrm(Long ownerId, int activities, int contacts, int clientes, int deals) {
        this.ownerId = ownerId;
        this.activities = activities;
        this.contacts = contacts;
        this.clientes = clientes;
        this.deals = deals;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public OlapCrm(Long ownerId, int activities, int contacts, int clientes, int deals, BigDecimal sumAmount) {
        this.ownerId = ownerId;
        this.activities = activities;
        this.contacts = contacts;
        this.clientes = clientes;
        this.deals = deals;
        this.sumAmount = sumAmount;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public OlapCrm(Long ownerId, int activities, int contacts, int clientes, int deals, BigDecimal sumAmount,
                   LocalDateTime firstDealDate, LocalDateTime lastDealDate,
                   LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.ownerId = ownerId;
        this.activities = activities;
        this.contacts = contacts;
        this.clientes = clientes;
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

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
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

    public int getClientes() {
        return clientes;
    }

    public void setClientes(int clientes) {
        this.clientes = clientes;
    }

    public int getDeals() {
        return deals;
    }

    public void setDeals(int deals) {
        this.deals = deals;
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
                getClientes() == olapCrm.getClientes() && getDeals() == olapCrm.getDeals() &&
                getId().equals(olapCrm.getId()) && getOwnerId().equals(olapCrm.getOwnerId());
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (getId() != null ? getId().hashCode() : 0);
        result = 31 * result + (getOwnerId() != null ? getOwnerId().hashCode() : 0);
        result = 31 * result + getActivities();
        result = 31 * result + getContacts();
        result = 31 * result + getClientes();
        result = 31 * result + getDeals();
        return result;
    }
}

