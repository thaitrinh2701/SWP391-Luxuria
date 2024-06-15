package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Product implements Comparable<Product> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 200, nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "size", nullable = false)
    private float size;

    @ManyToOne
    @JoinColumn(name = "gold_id", nullable = false)
    private Gold gold;

    @Column(name = "gold_price", nullable = false)
    private float goldPrice;

    @Column(name = "gold_weight", nullable = false)
    private float goldWeight;

    @ManyToOne
    @JoinColumn(name = "gem_id", nullable = false)
    private Gem gem;

    @Column(name = "gem_price", nullable = false)
    private float gemPrice;

    @Column(name = "manufacturing_fee", nullable = false)
    private float manufacturingFee;

    @Column(name = "total_price", nullable = false)
    private float totalPrice;

    private String description;

    @Column(name = "is_original", nullable = false)
    private boolean isOriginal;

    @Override
    public int compareTo(Product o) {
        return this.id.compareTo(o.getId());
    }
}
