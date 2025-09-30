package com.techmatrix18.model;

import com.techmatrix18.enums.ActivityStatus;
import com.techmatrix18.enums.ActivityType;
import jakarta.persistence.*;
import java.time.LocalDateTime;

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

    // Клиент, к которому относится активность
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    // Контактное лицо (опционально, может быть null)
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
}

