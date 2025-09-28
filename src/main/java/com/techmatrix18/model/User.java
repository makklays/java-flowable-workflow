package com.techmatrix18.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.Objects;

/**
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @version 0.0.1
 */

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // автоинкремент
    private Long id;

    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "age")
    private String age;

    @Column(name = "is_man")
    private Boolean isMan;

    @Column(name = "address")
    private String address;

    @Column(name = "password")
    private String password;

    @Column(name = "start_work_at")
    private LocalDate startWorkAt;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt; // автоматически при вставке

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt; // автоматически при обновлении

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public Boolean getMan() {
        return isMan;
    }

    public void setMan(Boolean man) {
        isMan = man;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDate getStartWorkAt() {
        return startWorkAt;
    }

    public void setStartWorkAt(LocalDate startWorkAt) {
        this.startWorkAt = startWorkAt;
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
        if (!(o instanceof User user)) return false;
        return getId().equals(user.getId()) && getRoleId().equals(user.getRoleId()) && getUsername().equals(user.getUsername()) && getFirstname().equals(user.getFirstname()) && getLastname().equals(user.getLastname()) && getEmail().equals(user.getEmail()) && getPhone().equals(user.getPhone()) && getAge().equals(user.getAge()) && isMan.equals(user.isMan) && getAddress().equals(user.getAddress()) && getPassword().equals(user.getPassword()) && getStartWorkAt().equals(user.getStartWorkAt()) && getCreatedAt().equals(user.getCreatedAt()) && getUpdatedAt().equals(user.getUpdatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getRoleId(), getUsername(), getFirstname(), getLastname(), getEmail(), getPhone(), getAge(), isMan, getAddress(), getPassword(), getStartWorkAt(), getCreatedAt(), getUpdatedAt());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", roleId=" + roleId +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", age='" + age + '\'' +
                ", isMan=" + isMan +
                ", address='" + address + '\'' +
                ", password='" + password + '\'' +
                ", startWorkAt=" + startWorkAt +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

