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
 * @company TechMatrix18
 * @version 0.0.1
 */

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // автоинкремент
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")  // внешний ключ
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")  // внешний ключ
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")  // внешний ключ
    private Position position;

    @Column(name = "tenant_id")
    private String tenantId; // позже добавить таблицу 'tenants'

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "display_name")
    private String displayname;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "age")
    private String age;

    @Column(name = "is_man")
    private Boolean isMan;

    @Column(name = "is_picture_set")
    private Boolean isPictureSet; // показывать аватар или нет

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

    public Role getRole() { return role; }

    public void setRole(Role role) { this.role = role; }

    public Department getDepartment() { return department; }

    public void setDepartment(Department department) { this.department = department; }

    public Position getPosition() { return position; }

    public void setPosition(Position position) { this.position = position; }

    public String getTenantId() { return tenantId; }

    public void setTenantId(String tenantId) { this.tenantId = tenantId; }

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getFirstname() { return firstname; }

    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }

    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getDisplayname() { return displayname; }

    public void setDisplayname(String displayname) { this.displayname = displayname; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getAge() { return age; }

    public void setAge(String age) { this.age = age; }

    public Boolean getMan() { return isMan; }

    public void setMan(Boolean man) { isMan = man; }

    public Boolean getPictureSet() { return isPictureSet; }

    public void setPictureSet(Boolean pictureSet) { isPictureSet = pictureSet; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public LocalDate getStartWorkAt() { return startWorkAt; }

    public void setStartWorkAt(LocalDate startWorkAt) { this.startWorkAt = startWorkAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return getId().equals(user.getId()) && getRole().equals(user.getRole()) && getDepartment().equals(user.getDepartment()) && getPosition().equals(user.getPosition()) && getTenantId().equals(user.getTenantId()) && getUsername().equals(user.getUsername()) && getFirstname().equals(user.getFirstname()) && getLastname().equals(user.getLastname()) && getDisplayname().equals(user.getDisplayname()) && getEmail().equals(user.getEmail()) && getPhone().equals(user.getPhone()) && getAge().equals(user.getAge()) && isMan.equals(user.isMan) && isPictureSet.equals(user.isPictureSet) && getAddress().equals(user.getAddress()) && getPassword().equals(user.getPassword()) && getStartWorkAt().equals(user.getStartWorkAt()) && getCreatedAt().equals(user.getCreatedAt()) && getUpdatedAt().equals(user.getUpdatedAt());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getRole(), getDepartment(), getPosition(), getTenantId(), getUsername(), getFirstname(), getLastname(), getDisplayname(), getEmail(), getPhone(), getAge(), isMan, isPictureSet, getAddress(), getPassword(), getStartWorkAt(), getCreatedAt(), getUpdatedAt());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", role=" + role +
                ", department=" + department +
                ", position=" + position +
                ", tenantId='" + tenantId + '\'' +
                ", username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", displayname='" + displayname + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", age='" + age + '\'' +
                ", isMan=" + isMan +
                ", isPictureSet=" + isPictureSet +
                ", address='" + address + '\'' +
                ", password='" + password + '\'' +
                ", startWorkAt=" + startWorkAt +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}

