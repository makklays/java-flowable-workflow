package com.techmatrix18.model;

import com.techmatrix18.enums.ActivityStatus;
import com.techmatrix18.enums.ActivityType;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The client to which the activity belongs
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    // Contact person (optional, can be null)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id")
    private Contact contact;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ActivityType type;

    @Column(name = "description")
    private String description;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ActivityStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // constructs

    public Activity() { }

    public Activity(Long id, Client client, Contact contact, ActivityType type, User owner, ActivityStatus status) {
        this.id = id;
        this.client = client;
        this.contact = contact;
        this.type = type;
        this.owner = owner;
        this.status = status;
    }

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

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public ActivityType getType() {
        return type;
    }

    public void setType(ActivityType type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public ActivityStatus getStatus() {
        return status;
    }

    public void setStatus(ActivityStatus status) {
        this.status = status;
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
        if (!(o instanceof Activity activity)) return false;
        return getId().equals(activity.getId()) && getClient().equals(activity.getClient()) && getContact().equals(activity.getContact()) && getType() == activity.getType() && getDescription().equals(activity.getDescription()) && getDateTime().equals(activity.getDateTime()) && getOwner().equals(activity.getOwner()) && getStatus() == activity.getStatus() && getCreatedAt().equals(activity.getCreatedAt()) && getUpdatedAt().equals(activity.getUpdatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getClient(), getContact(), getType(), getDescription(), getDateTime(), getOwner(), getStatus(), getCreatedAt(), getUpdatedAt());
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", client=" + client +
                ", contact=" + contact +
                ", type=" + type +
                ", description='" + description + '\'' +
                ", dateTime=" + dateTime +
                ", owner=" + owner +
                ", status=" + status +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

