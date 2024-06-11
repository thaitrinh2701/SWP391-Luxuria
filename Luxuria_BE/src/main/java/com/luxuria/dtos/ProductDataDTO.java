package com.luxuria.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDataDTO {
    @JsonProperty("product_id")
    private Long productId;

    private String value;
}
