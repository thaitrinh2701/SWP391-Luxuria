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

    @NotBlank(message = "Phone number is required!")
    private String name;

    @JsonProperty("category_id")
    @NotBlank(message = "Category ID is required!")
    private Long categoryId;

    @NotBlank(message = "Size is required!")
    private float size;

    @JsonProperty("gold_id")
    @NotBlank(message = "Gold ID is required!")
    private Long goldId;

    @JsonProperty("gold_price")
    private float goldPrice;

    @JsonProperty("gold_weight")
    @NotBlank(message = "Gold weight is required!")
    private float goldWeight;

    @JsonProperty("gem_id")
    @NotBlank(message = "Gem ID is required!")
    private Long gemId;

    @JsonProperty("gem_price")
    @NotBlank(message = "Gem price is required!")
    private float gemPrice;

    @JsonProperty("manufacturing_fee")
    @NotBlank(message = "Manufacturing fee is required!")
    private float manufacturingFee;

    @JsonProperty("total_price")
    @NotBlank(message = "Total price is required!")
    private float totalPrice;

    private String description;

    @JsonProperty("is_original")
    @NotBlank(message = "Is original is required!")
    private boolean isOriginal;
}
