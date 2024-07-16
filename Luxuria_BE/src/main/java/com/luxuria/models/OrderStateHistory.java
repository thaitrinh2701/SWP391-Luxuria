package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_state_histories")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class OrderStateHistory implements Comparable<OrderStateHistory> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User user;

    @Column(name = "date_time")
    private LocalDateTime dateTime;

    private String description;

    @PrePersist
    protected void onCreate() {
        dateTime = LocalDateTime.now();
    }

    @Override
    public int compareTo(OrderStateHistory o) {
        return this.dateTime.compareTo(o.dateTime);
    }
}
