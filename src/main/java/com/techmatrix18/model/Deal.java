package com.techmatrix18.model;

import com.techmatrix18.enums.DealStage;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Entity
@Table(name = "deals")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;             // Внешний ключ на клиента

    @Column(name = "name", nullable = false)
    private String name;               // Название сделки

    @Column(name = "amount", precision = 15, scale = 2, nullable = false)
    private BigDecimal amount;         // Сумма

    @Column(name = "currency", length = 3, nullable = false)
    private String currency;           // Валюта, например, "USD", "EUR"

    @Column(name = "stage", nullable = false)
    @Enumerated(EnumType.STRING)
    private DealStage stage;           // Этап сделки

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;       // Дата начала

    @Column(name = "close_date")
    private LocalDate closeDate;       // Дата закрытия (если есть)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;               // Ответственный менеджер (User)
}

