package com.luxuria.services;

import com.luxuria.models.Order;
import com.luxuria.models.OrderStateHistory;
import com.luxuria.models.State;
import com.luxuria.models.User;

import java.util.List;

public interface IOrderStateHistoryService {

    List<OrderStateHistory> getHistoryOfOrder(Long orderId);

    void AddNewHistory(Order order, State state, User requestedUser, String description);
}
