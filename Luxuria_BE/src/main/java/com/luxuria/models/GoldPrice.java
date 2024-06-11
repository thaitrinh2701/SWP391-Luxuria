package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gold_prices")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class GoldPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "gold_id", nullable = false)
    private Gold gold;

    @Column(name = "buy_price", nullable = false)
    private float buyPrice;

    @Column(name = "sell_price", nullable = false)
    private float sellPrice;

    @Column(name = "buy_rate", nullable = false)
    private float buyRate;

    @Column(name = "sell_rate", nullable = false)
    private float sellRate;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
