package com.luxuria.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    @JsonProperty("request_id")
    @NotBlank(message = "Request ID is required!")
    private Long requestId;

    @JsonProperty("product_id")
    @NotBlank(message = "Product ID is required!")
    private Long productId;
}
