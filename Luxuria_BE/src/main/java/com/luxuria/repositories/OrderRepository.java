package com.luxuria.repositories;

import com.luxuria.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByRequestId(Long requestId);
}
