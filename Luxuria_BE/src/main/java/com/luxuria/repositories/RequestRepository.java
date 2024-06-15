package com.luxuria.repositories;

import com.luxuria.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByUserId(Long userId);

    @Query("SELECT r from Request r WHERE r.isSalesStaffApproved = true AND r.user.id=:user_id")
    List<Request> findApprovedRequestsByUserId(@Param("user_id") Long userId);
}
