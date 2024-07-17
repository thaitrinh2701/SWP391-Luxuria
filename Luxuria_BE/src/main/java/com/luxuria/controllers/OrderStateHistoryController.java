package com.luxuria.controllers;

import com.luxuria.models.OrderStateHistory;
import com.luxuria.services.IOrderStateHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/order_state_histories")
@RequiredArgsConstructor
public class OrderStateHistoryController {

    private final IOrderStateHistoryService orderStateHistoryService;

    @GetMapping("/{order_id}")
    public ResponseEntity<?> getHistoryOfOrder(@PathVariable("order_id") Long orderId) {
        try {
            List<OrderStateHistory> orderStateHistories = orderStateHistoryService.getHistoryOfOrder(orderId);
            return ResponseEntity.ok().body(orderStateHistories);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
