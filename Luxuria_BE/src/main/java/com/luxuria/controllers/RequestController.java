package com.luxuria.controllers;

import com.luxuria.dtos.RequestDTO;
import com.luxuria.models.Request;
import com.luxuria.services.IRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/requests")
@RequiredArgsConstructor
public class RequestController {

    private final IRequestService requestService;

    @PostMapping("/make_request")
    public ResponseEntity<?> makeRequest(@RequestBody RequestDTO requestDTO) {
        try {
            Request request = requestService.makeRequest(requestDTO.getUserId());
            return ResponseEntity.ok().body(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/my_requests")
    public ResponseEntity<?> viewMyRequests(@RequestHeader("Authorization") String authHeader) {
        try {
            List<Request> request = requestService.getMyRequests(authHeader);
            request.sort(Collections.reverseOrder());
            return ResponseEntity.ok().body(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/view_all")
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requestList = requestService.getAllRequests();
//        Comparator<Request> comparator = (r1, r2) -> r2.getCreatedAt().compareTo(r1.getCreatedAt());
//        requestList.sort(comparator);
        requestList.sort(Collections.reverseOrder());
        return ResponseEntity.ok().body(requestList);
    }

    @PutMapping("/cancel_request/{request_id}")
    public ResponseEntity<String> cancelMyRequest(@PathVariable("request_id") Long requestId) {
        try {
            requestService.cancelRequest(requestId);
            return ResponseEntity.ok().body("Đã hủy yêu cầu ");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/approve_request/{request_id}/{response}")
    public ResponseEntity<String> approveRequest(
            @PathVariable("request_id") Long requestId,
            @PathVariable boolean response) {
        try {
            String msg = requestService.approveRequest(requestId, response) ?
                    "Yêu cầu được duyệt" : "Yêu cầu bị từ chối";
            return ResponseEntity.ok().body(msg);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
