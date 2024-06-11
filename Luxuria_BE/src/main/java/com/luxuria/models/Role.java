package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    public static final String ADMIN = "ADMIN";
    public static final String CUSTOMER = "CUSTOMER";
    public static final String SALES_STAFF = "SALES_STAFF";
    public static final String DESIGN_STAFF = "DESIGN_STAFF";
    public static final String PRODUCTION_STAFF = "PRODUCTION_STAFF";
    public static final String MANAGER = "MANAGER";
}
