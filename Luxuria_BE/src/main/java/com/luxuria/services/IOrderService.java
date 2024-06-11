package com.luxuria.services;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.models.Order;
import com.luxuria.models.Product;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IOrderService {
    List<Order> getOrdersByUserId(Long userId) throws Exception;

    List<Order> getAllOrders();

    Order createOrder(Long requestId, ProductDTO productDTO) throws Exception;

    void submitPriceQuote(Long orderId) throws Exception;

    boolean responsePriceQuoteFromManager(Long orderId, boolean response) throws Exception;

    boolean responsePriceQuoteFromCustomer(Long orderId, boolean response) throws Exception;

    Order getOrderById(Long orderId) throws Exception;

    Order submitDesign(Order order, List<MultipartFile> files) throws Exception;

    boolean approveDesign(Long orderId, boolean response) throws Exception;

    void completeProduct(Order order) throws Exception;

    List<Order> getMyOrders(String authHeader) throws Exception;

    Order editPriceQuote(Long orderId, ProductDTO productDTO) throws Exception;

    void completeOrder(Order order) throws Exception;
}
