package com.luxuria.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.luxuria.models.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderResponse {

    private Long id;

    @JsonProperty("request_id")
    private Long requestId;

    @JsonProperty("product_id")
    private Long productId;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("gold_id")
    private Long goldId;

    @JsonProperty("order_created_at")
    private LocalDateTime orderCreatedAt;

    @JsonProperty("total_money")
    private float totalMoney;

    @JsonProperty("process_id")
    private Long processId;

    @JsonProperty("state_id")
    private Long stateId;

    @JsonProperty("is_customer_approved")
    private boolean isCustomerApproved;

    public static OrderResponse fromOrder(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .requestId(order.getRequest().getId())
                .productId(order.getProduct().getId())
                .orderCreatedAt(order.getOrderCreatedAt())
                .totalMoney(order.getProduct().getTotalPrice())
                .processId(order.getProcess().getId())
                .stateId(order.getState().getId())
                .isCustomerApproved(order.isCustomerApproved())
                .build();
    }

    public static OrderResponse fromOrderProduct(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .requestId(order.getRequest().getId())
                .productId(order.getProduct().getId())
                .productName(order.getProduct().getName())
                .goldId(order.getProduct().getGold().getId())
                .orderCreatedAt(order.getOrderCreatedAt())
                .totalMoney(order.getProduct().getTotalPrice())
                .processId(order.getProcess().getId())
                .stateId(order.getState().getId())
                .isCustomerApproved(order.isCustomerApproved())
                .build();
    }
}
