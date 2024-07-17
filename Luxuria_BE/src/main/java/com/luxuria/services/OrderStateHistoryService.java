package com.luxuria.services;

import com.luxuria.models.Order;
import com.luxuria.models.OrderStateHistory;
import com.luxuria.models.State;
import com.luxuria.models.User;
import com.luxuria.repositories.OrderStateHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderStateHistoryService implements IOrderStateHistoryService {

    private final OrderStateHistoryRepository orderStateHistoryRepository;

    @Override
    public List<OrderStateHistory> getHistoryOfOrder(Long orderId) {
        return orderStateHistoryRepository.getAllByOrderId(orderId);
    }

    @Override
    public void AddNewHistory(Order order, State state, User requestedUser, String description) {
        OrderStateHistory orderStateHistory = OrderStateHistory.builder()
                .order(order)
                .state(state)
                .user(requestedUser)
                .description(description)
                .build();
        orderStateHistoryRepository.save(orderStateHistory);
    }
}
