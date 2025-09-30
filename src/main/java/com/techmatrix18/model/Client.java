package com.techmatrix18.model;

import com.techmatrix18.enums.ClientType;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", unique = true)
    private String phone;

    @Column(name = "company")
    private String company;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private ClientType type;

    @Column(name = "registered_at")
    private LocalDateTime registeredAt;

    @Column(name = "source")
    private String source;

    @Column(name = "tags")
    private String tags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
}

