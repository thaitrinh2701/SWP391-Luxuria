package com.luxuria.services;

import com.luxuria.models.Request;

import java.util.List;

public interface IRequestService {

    Request makeRequest(Long userId) throws Exception;

    Request getRequestById(Long requestId) throws Exception;

    List<Request> getRequestsByUserId(Long userId) throws Exception;

    List<Request> getApprovedRequestsByUserId(Long userId) throws Exception;

    boolean approveRequest(Long requestId, boolean response) throws Exception;

    List<Request> getAllRequests();

    List<Request> getMyRequests(String authHeader) throws Exception;

    void cancelRequest(Long requestId) throws Exception;
}
