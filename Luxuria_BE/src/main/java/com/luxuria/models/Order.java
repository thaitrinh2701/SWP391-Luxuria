package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Order implements Comparable<Order> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "order_created_at", nullable = false)
    private LocalDateTime orderCreatedAt;

    @ManyToOne
    @JoinColumn(name = "process_id", nullable = false)
    private Process process;

    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    @Column(name = "is_customer_approved", nullable = false)
    private boolean isCustomerApproved;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @PrePersist
    protected void onCreate() {
        orderCreatedAt = LocalDateTime.now();
    }

    @Override
    public int compareTo(Order o) {
        return this.orderCreatedAt.compareTo(o.orderCreatedAt);
    }
}
