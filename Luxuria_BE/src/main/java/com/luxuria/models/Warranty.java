package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "warranties")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Warranty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "warranty_time")
    private String warrantyTime;

    @PrePersist
    protected void onCreate() {
        deliveryDate = LocalDate.now();
    }
}
