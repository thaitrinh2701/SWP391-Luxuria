package com.luxuria.services;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.dtos.ResponseOrderDTO;
import com.luxuria.models.Order;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IOrderService {
    List<Order> getOrdersByUserId(Long userId) throws Exception;

    List<Order> getAllOrders();

    //Order createOrder(Long requestId, ProductDTO productDTO) throws Exception;

    void createOrder(Long requestId, ProductDTO productDTO, String authHeader) throws Exception;

    //void submitPriceQuote(Long orderId) throws Exception;

    void submitPriceQuote(Long orderId, String authHeader) throws Exception;

    //boolean responsePriceQuoteFromManager(Long orderId, boolean response) throws Exception;

    boolean responsePriceQuoteFromManager(ResponseOrderDTO responseOrderDTO, String authHeader) throws Exception;

    boolean responsePriceQuoteFromCustomer(ResponseOrderDTO responseOrderDTO, String authHeader) throws Exception;

    Order getOrderById(Long orderId) throws Exception;

    void submitDesign(Order order, List<MultipartFile> files, String authHeader) throws Exception;

    boolean approveDesign(ResponseOrderDTO responseOrderDTO, String authHeader) throws Exception;

    void completeProduct(Order order, String authHeader) throws Exception;

    List<Order> getMyOrders(String authHeader) throws Exception;

    Order editPriceQuote(Long orderId, ProductDTO productDTO) throws Exception;

    void completeOrder(Order order, String authHeader) throws Exception;
}
