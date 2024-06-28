package com.luxuria.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
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

    @Min(value = 0, message = "Kích thước không bé hơn 0")
    private float size;

    @JsonProperty("gold_id")
    private Long goldId;

    @JsonProperty("gold_price")
    @Min(value = 0, message = "Giá vàng không bé hơn 0")
    private float goldPrice;

    @JsonProperty("gold_weight")
    @Min(value = 0, message = "Cân nặng vàng không bé hơn 0")
    private float goldWeight;

    @JsonProperty("gem_id")
    private Long gemId;

    @JsonProperty("gem_price")
    @Min(value = 0, message = "Giá đá không bé hơn 0")
    private float gemPrice;

    @JsonProperty("manufacturing_fee")
    @Min(value = 0, message = "Giá gia công không bé hơn 0")
    private float manufacturingFee;

    @JsonProperty("total_price")
    @Min(value = 0, message = "Tổng giá không bé hơn 0")
    private float totalPrice;

    private String description;

    @JsonProperty("is_original")
    private boolean isOriginal;
}
