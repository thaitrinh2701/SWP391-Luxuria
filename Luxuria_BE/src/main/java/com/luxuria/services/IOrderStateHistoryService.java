package com.luxuria.services;

import com.luxuria.models.OrderStateHistory;

import java.util.List;

public interface IOrderStateHistoryService {

    List<OrderStateHistory> getHistoryOfOrder(Long orderId);

    void AddNewHistory(OrderStateHistory orderStateHistory);
}
