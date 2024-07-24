package com.luxuria.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class CreateProductResponse {
    @JsonProperty("product_id")
    private Long productId;
}
