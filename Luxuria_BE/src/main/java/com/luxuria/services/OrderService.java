package com.luxuria.services;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.exceptions.IncorrectProcedureException;
import com.luxuria.exceptions.PermissionDeniedException;
import com.luxuria.models.*;
import com.luxuria.models.Process;
import com.luxuria.repositories.*;
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
    @Override
    public Order getOrderById(Long orderId) throws Exception{
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new DataNotFoundException("order: Đơn hàng không tồn tại"));
    }

    @Override
    public Order submitDesign(Order order, List<MultipartFile> files) throws Exception {
        checkProcess(order, 3L);
        productDataRepository.deleteAllByProductId((order.getProduct().getId()));
        productService.uploadFiles(order.getProduct(), files);

        Process process = processRepository.findById(4L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(6L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);

        return orderRepository.save(order);
    }

    @Override
    public boolean approveDesign(Long orderId, boolean response) throws Exception {
        Order order = getOrderById(orderId);
        checkProcess(order, 4L);

        if (response) {
            Process process = processRepository.findById(5L)
                    .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
            State state = stateRepository.findById(7L)
                    .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
            order.setProcess(process);
            order.setState(state);
            orderRepository.save(order);
            return true;
        }
        State state = stateRepository.findById(3L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setState(state);
        orderRepository.save(order);
        return false;
    }

    @Override
    public void completeProduct(Order order) throws Exception {
        checkProcess(order, 5L);
        Process process = processRepository.findById(6L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(8L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);
        orderRepository.save(order);
    }

    @Override
    public List<Order> getMyOrders(String authHeader) throws Exception {
        User user = userService.findUserByToken(authHeader);
        return getOrdersByUserId(user.getId());
    }

    @Override
    public Order editPriceQuote(Long orderId, ProductDTO productDTO) throws Exception {
        Order order = getOrderById(orderId);
        checkProcess(order, 1L);
        productService.updatePrice(order.getProduct().getId(), productDTO);
        return order;
    }

    @Override
    public void completeOrder(Order order) throws Exception {
        checkProcess(order, 6L);
        Process process = processRepository.findById(7L)
                .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
        State state = stateRepository.findById(9L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setProcess(process);
        order.setState(state);
        orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) throws Exception {
        userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("user: User không tồn tại"));
        return orderRepository.findAllByUserId(userId);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order createOrder(Long requestId, ProductDTO productDTO) throws Exception {
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
        return orderRepository.save(order);
    }

    @Override
    public void submitPriceQuote(Long orderId) throws Exception {
        Order order = getOrderById(orderId);
        checkProcess(order, 1L);

        State state = stateRepository.findById(2L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setState(state);
        orderRepository.save(order);
    }

    @Override
    public boolean responsePriceQuoteFromManager(Long orderId, boolean response) throws Exception {
        Order order = getOrderById(orderId);
        checkProcess(order, 1L);

        if (response) {
            Process process = processRepository.findById(2L)
                    .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
            State state = stateRepository.findById(4L)
                    .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
            order.setProcess(process);
            order.setState(state);
            orderRepository.save(order);
            return true;
        }
        State state = stateRepository.findById(3L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setState(state);
        orderRepository.save(order);
        return false;
    }

    @Override
    public boolean responsePriceQuoteFromCustomer(Long orderId, boolean response) throws Exception {
        Order order = getOrderById(orderId);
        checkProcess(order, 2L);

        if (response) {
            Process process = processRepository.findById(3L)
                    .orElseThrow(() -> new DataNotFoundException("process: Quá trình không tồn tại"));
            State state = stateRepository.findById(5L)
                    .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
            order.setProcess(process);
            order.setState(state);
            order.setCustomerApproved(true);
            orderRepository.save(order);
            return true;
        }
        State state = stateRepository.findById(3L)
                .orElseThrow(() -> new DataNotFoundException("state: Trạng thái không tồn tại"));
        order.setState(state);
        orderRepository.save(order);
        return false;
    }

    public void checkProcess(Order order, Long processId) throws Exception{
        if (!order.getProcess().getId().equals(processId)) {
            throw new IncorrectProcedureException("process: Quy trình không hợp lệ");
        }
    }
}
