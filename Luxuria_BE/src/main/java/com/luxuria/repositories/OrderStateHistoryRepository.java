package com.luxuria.repositories;

import com.luxuria.models.OrderStateHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderStateHistoryRepository extends JpaRepository<OrderStateHistory, Long> {

    @Query("SELECT o FROM OrderStateHistory o WHERE o.order.id=:order_id")
    List<OrderStateHistory> getAllByOrderId(@Param("order_id") Long orderId);
}
