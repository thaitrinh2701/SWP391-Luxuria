package com.luxuria.repositories;

import com.luxuria.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findByRequestId(Long requestId);

    @Query("SELECT o FROM Order o WHERE o.request.user.id=:user_id")
    List<Order> findAllByUserId(@Param("user_id") Long userId);
}
