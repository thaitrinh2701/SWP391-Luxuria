package com.luxuria.repositories;

import com.luxuria.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByUserId(Long userId);

    @Query("SELECT r from Request r WHERE r.isSalesStaffApproved = true")
    List<Request> findApprovedRequestsByUserId(Long userId);
}
