package com.techmatrix18.model;

import jakarta.persistence.*;

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
}

