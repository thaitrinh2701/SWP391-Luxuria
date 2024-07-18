package com.luxuria.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.luxuria.models.OrderStateHistory;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderStateHistoryResponse {

    private Long id;

    @JsonProperty("state_id")
    private Long stateId;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("date_time")
    private LocalDateTime dateTime;

    @JsonProperty("description")
    private String description;

    public static OrderStateHistoryResponse fromOrderStateHistory(OrderStateHistory orderStateHistory) {
        return OrderStateHistoryResponse.builder()
                .id(orderStateHistory.getId())
                .stateId(orderStateHistory.getState().getId())
                .fullName(orderStateHistory.getUser().getFullName())
                .dateTime(orderStateHistory.getDateTime())
                .description(orderStateHistory.getDescription())
                .build();
    }
}
