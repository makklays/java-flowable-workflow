package com.techmatrix18.model;

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
@Table(name = "contacts")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "phone", unique = true, nullable = true)
    private String phone;

    @Column(name = "position")
    private String position;  // Должность / роль в компании - text

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // constructs

    public Contact() { }

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

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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
        if (!(o instanceof Contact contact)) return false;
        return getId().equals(contact.getId()) && getClient().equals(contact.getClient()) && getFirstname().equals(contact.getFirstname()) && getLastname().equals(contact.getLastname()) && getEmail().equals(contact.getEmail()) && getPhone().equals(contact.getPhone()) && getPosition().equals(contact.getPosition()) && getCreatedAt().equals(contact.getCreatedAt()) && getUpdatedAt().equals(contact.getUpdatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getClient(), getFirstname(), getLastname(), getEmail(), getPhone(), getPosition(), getCreatedAt(), getUpdatedAt());
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", client=" + client +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", position='" + position + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

