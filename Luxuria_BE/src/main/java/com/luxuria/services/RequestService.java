package com.luxuria.services;

import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.models.Request;
import com.luxuria.models.User;
import com.luxuria.repositories.RequestRepository;
import com.luxuria.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService implements IRequestService {

    private final UserRepository userRepository;
    private final RequestRepository requestRepository;
    private final IUserService userService;

    @Override
    public Request makeRequest(Long userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("user: User không tồn tại"));

        Request request = Request.builder()
                .isSalesStaffApproved(false)
                .isActive(true)
                .build();
        request.setUser(user);
        return requestRepository.save(request);
    }

    @Override
    public Request getRequestById(Long requestId) throws Exception {
        return requestRepository.findById(requestId)
                .orElseThrow(() -> new DataNotFoundException("request: Yêu cầu không tồn tại"));
    }

    @Override
    public List<Request> getRequestsByUserId(Long userId) throws Exception {
        userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("user: User không tồn tại"));
        return requestRepository.findByUserId(userId);
    }

    @Override
    public List<Request> getApprovedRequestsByUserId(Long userId) throws Exception {
        userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("user: User không tồn tại"));
        return requestRepository.findApprovedRequestsByUserId(userId);
    }

    @Override
    public void cancelRequest(Long requestId) throws Exception {
        Request request = getRequestById(requestId);
        request.setActive(false);
        requestRepository.save(request);
    }

    @Override
    public boolean approveRequest(Long requestId, boolean response) throws Exception {
        Request request = getRequestById(requestId);
        if (response) {
            request.setSalesStaffApproved(true);
            requestRepository.save(request);
            return true;
        } else {
            request.setActive(false);
            requestRepository.save(request);
            return false;
        }
    }

    @Override
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @Override
    public List<Request> getMyRequests(String authHeader) throws Exception {
        User user = userService.findUserByToken(authHeader);
        return getRequestsByUserId(user.getId());
    }

}
