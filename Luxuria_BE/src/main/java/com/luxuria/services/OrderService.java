package com.luxuria.services;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.dtos.ResponseOrderDTO;
import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.exceptions.IncorrectProcedureException;
import com.luxuria.exceptions.PermissionDeniedException;
import com.luxuria.models.*;
import com.luxuria.models.Process;
import com.luxuria.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProcessRepository processRepository;
    private final RequestRepository requestRepository;
    private final StateRepository stateRepository;
    private final ProductDataRepository productDataRepository;
    private final IRequestService requestService;
    private final IProductService productService;
    private final IUserService userService;
    private final IOrderStateHistoryService orderStateHistoryService;
    @Override
    public Order getOrderById(Long orderId) throws Exception{
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new DataNotFoundException("order: Đơn hàng không tồn tại"));
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) throws Exception {
        userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("user: User không tồn tại"));
        return orderRepository.findAllByUserId(userId);
    }

    @Override
    public List<Order> getMyOrders(String authHeader) throws Exception {
        User user = userService.findUserByToken(authHeader);
        return getOrdersByUserId(user.getId());
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

//    @Override
//    public Order createOrder(Long requestId, ProductDTO productDTO) throws Exception {
//        Request request = requestService.getRequestById(requestId);
//        if (!request.isSalesStaffApproved() || !request.isActive()) {
//            throw new DataNotFoundException("request: Yêu cầu không phù hợp");
//        }
//        Process process = processRepository.findById(1L)
//                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
//        State state = stateRepository.findById(1L)
//                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
//
//        Product product = productService.createProduct(productDTO);
//
//        Order order = Order.builder()
//                .request(request)
//                .product(product)
//                .process(process)
//                .state(state)
//                .isCustomerApproved(false)
//                .isActive(true)
//                .build();
//
//        request.setActive(false);
//        requestRepository.save(request);
//        return orderRepository.save(order);
//    }

    @Override
    public void createOrder(Long requestId, ProductDTO productDTO, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        Request request = requestService.getRequestById(requestId);
        if (!request.isSalesStaffApproved() || !request.isActive()) {
            throw new DataNotFoundException("request: Yêu cầu không phù hợp");
        }
        Process process = processRepository.findById(1L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(1L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));

        Product product = productService.createProduct(productDTO);

        Order order = Order.builder()
                .request(request)
                .product(product)
                .process(process)
                .state(state)
                .isCustomerApproved(false)
                .isActive(true)
                .build();

        request.setActive(false);
        requestRepository.save(request);
        Order newOrder = orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(newOrder, state, requestedUser, "");
    }

    @Override
    public Order editPriceQuote(Long orderId, ProductDTO productDTO) throws Exception {
        Order order = getOrderById(orderId);
        checkProcess(order, 1L);
        productService.updatePrice(order.getProduct().getId(), productDTO);
        return order;
    }

    @Override
    public void submitPriceQuote(Long orderId, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        Order order = getOrderById(orderId);
        checkProcess(order, 1L);

        State state = stateRepository.findById(2L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setState(state);
        orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(order, state, requestedUser, "");
    }

    @Override
    public boolean responsePriceQuoteFromManager(ResponseOrderDTO responseOrderDTO, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        Order order = getOrderById(responseOrderDTO.getOrderId());
        checkProcess(order, 1L);

        if (responseOrderDTO.isResponse()) {
            Process process = processRepository.findById(2L)
                    .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
            State state = stateRepository.findById(4L)
                    .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
            order.setProcess(process);
            order.setState(state);
            orderRepository.save(order);

            orderStateHistoryService.AddNewHistory(order, state, requestedUser, "");
            return true;
        }
        Process process = processRepository.findById(1L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(3L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);
        orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(order, state, requestedUser, responseOrderDTO.getDescription());
        return false;
    }

    @Override
    public boolean responsePriceQuoteFromCustomer(ResponseOrderDTO responseOrderDTO, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        Order order = getOrderById(responseOrderDTO.getOrderId());
        checkProcess(order, 2L);

        if (responseOrderDTO.isResponse()) {
            Process process = processRepository.findById(3L)
                    .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
            State state = stateRepository.findById(5L)
                    .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
            order.setProcess(process);
            order.setState(state);
            order.setCustomerApproved(true);
            orderRepository.save(order);

            orderStateHistoryService.AddNewHistory(order, state, requestedUser, "");
            return true;
        }
        State state = stateRepository.findById(3L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setState(state);
        order.setCustomerApproved(false);
        order.setActive(false);
        orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(order, state, requestedUser, responseOrderDTO.getDescription());
        return false;
    }

    @Override
    @Transactional
    public void submitDesign(Order order, List<MultipartFile> files, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        checkProcess(order, 3L);
        productDataRepository.deleteAllByProductId((order.getProduct().getId()));
        productService.uploadFiles(order.getProduct(), files);

        Process process = processRepository.findById(4L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(6L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);
        orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(order, state, requestedUser, "");
    }

    @Override
    public boolean approveDesign(ResponseOrderDTO responseOrderDTO, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        Order order = getOrderById(responseOrderDTO.getOrderId());
        checkProcess(order, 4L);

        if (responseOrderDTO.isResponse()) {
            Process process = processRepository.findById(5L)
                    .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
            State state = stateRepository.findById(7L)
                    .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
            order.setProcess(process);
            order.setState(state);
            orderRepository.save(order);

            orderStateHistoryService.AddNewHistory(order, state, requestedUser, "");
            return true;
        }
        Process process = processRepository.findById(3L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(3L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);
        orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(order, state, requestedUser, responseOrderDTO.getDescription());
        return false;
    }

    @Override
    public void completeProduct(Order order, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        checkProcess(order, 5L);
        Process process = processRepository.findById(6L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(8L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);
        orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(order, state, requestedUser, "");
    }

    @Override
    public void completeOrder(Order order, String authHeader) throws Exception {
        User requestedUser = userService.findUserByToken(authHeader);
        checkProcess(order, 6L);
        Process process = processRepository.findById(7L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(9L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);
        orderRepository.save(order);

        orderStateHistoryService.AddNewHistory(order, state, requestedUser, "");
    }

    public void checkProcess(Order order, Long processId) throws Exception{
        if (!order.getProcess().getId().equals(processId)) {
            throw new IncorrectProcedureException("process: Quy trình không hợp lệ");
        }
    }
}
