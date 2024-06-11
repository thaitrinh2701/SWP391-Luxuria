package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_data")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ProductData {

    public static final int MAXIMUM_IMAGES_PER_PRODUCT = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private String value;
}
