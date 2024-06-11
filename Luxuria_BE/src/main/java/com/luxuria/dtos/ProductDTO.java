package com.luxuria.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {

    private String name;

    @JsonProperty("category_id")
    private Long categoryId;

    private float size;

    @JsonProperty("gold_id")
    private Long goldId;

    @JsonProperty("gold_price")
    private float goldPrice;

    @JsonProperty("gold_weight")
    private float goldWeight;

    @JsonProperty("gem_id")
    private Long gemId;

    @JsonProperty("gem_price")
    private float gemPrice;

    @JsonProperty("manufacturing_fee")
    private float manufacturingFee;

    @JsonProperty("total_price")
    private float totalPrice;

    private String description;

    @JsonProperty("is_original")
    private boolean isOriginal;
}
