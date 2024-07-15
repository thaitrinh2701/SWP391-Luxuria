package com.luxuria.services;

import com.luxuria.models.OrderStateHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderStateHistoryService implements IOrderStateHistoryService {
    @Override
    public List<OrderStateHistory> getHistoryOfOrder(Long orderId) {
        return null;
    }

    @Override
    public void AddNewHistory(OrderStateHistory orderStateHistory) {
        
    }
}
