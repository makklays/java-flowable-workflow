package com.techmatrix18.model;

import com.techmatrix18.model.enums.ActivityStatus;
import com.techmatrix18.model.enums.ActivityType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
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

    @Column(name = "title", nullable = false)
    @NotBlank
    private String title;

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

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // constructs

    private Activity() { }

    // Builder
    public static class Builder {
        private Long id;
        private Client client;
        private Contact contact;
        private String title;
        private ActivityType type;
        private String description;
        private LocalDateTime dateTime;
        private User owner;
        private ActivityStatus status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder client(Client client) { this.client = client; return this; }
        public Builder contact(Contact contact) { this.contact = contact; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder type(ActivityType type) { this.type = type; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder dateTime(LocalDateTime dateTime) { this.dateTime = dateTime; return this; }
        public Builder owner(User owner) { this.owner = owner; return this; }
        public Builder status(ActivityStatus status) { this.status = status; return this; }
        public Activity build() {
            Activity activity = new Activity();
            activity.id = this.id;
            activity.client = this.client;
            activity.contact = this.contact;
            activity.title = this.title;
            activity.type = this.type;
            activity.description = this.description;
            activity.dateTime = this.dateTime;
            activity.owner = this.owner;
            activity.status = this.status;
            return activity;
        }
    }

    /*public Activity(Long id, Client client, Contact contact, ActivityType type, User owner, ActivityStatus status) {
        this.id = id;
        this.client = client;
        this.contact = contact;
        this.type = type;
        this.owner = owner;
        this.status = status;
    }*/

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

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

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
        return id != null && id.equals(activity.id);
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (title != null ? title.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", clientId=" + (client != null ? client.getId() : null) +
                ", contactId=" + (contact != null ? contact.getId() : null) +
                ", ownerId=" + (owner != null ? owner.getId() : null) +
                ", title='" + title + '\'' +
                ", type=" + type +
                ", status=" + status +
                '}';
    }
}

