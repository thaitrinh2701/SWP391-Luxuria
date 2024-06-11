package com.luxuria.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "states")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    private String description;
}
