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
public class ResponseOrderDTO {

    @JsonProperty("order_id")
    @NotBlank(message = "Order ID is required!")
    private Long orderId;

    private boolean response;

    private String description;
}
