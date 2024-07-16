package com.luxuria.controllers;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.dtos.ResponseOrderDTO;
import com.luxuria.models.Order;
import com.luxuria.models.ProductData;
import com.luxuria.responses.OrderDetailResponse;
import com.luxuria.services.IOrderService;
import com.luxuria.services.IProductDataService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {

    private final IOrderService orderService;
    private final IProductDataService productDataService;

    @GetMapping("/view_all_orders")
    public ResponseEntity<?> viewAllOrders() {
        List<Order> orderList = orderService.getAllOrders();
        orderList.sort(Collections.reverseOrder());
        return ResponseEntity.ok().body(orderList);
    }

    @GetMapping("/my_orders")
    public ResponseEntity<?> viewMyOrders(@RequestHeader("Authorization") String authHeader) {
        try {
            List<Order> order = orderService.getMyOrders(authHeader);
            order.sort(Collections.reverseOrder());
            return ResponseEntity.ok().body(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/view_order/{order_id}")
    public ResponseEntity<?> viewOrder(@PathVariable("order_id") Long orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
            List<ProductData> productData = productDataService.getProductDataByProductId(order.getProduct().getId());
            OrderDetailResponse orderDetailResponse = OrderDetailResponse.builder()
                    .order(order)
                    .productImages(productData)
                    .build();
            return ResponseEntity.ok().body(orderDetailResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create_order/{request_id}")
    public ResponseEntity<?> createOrder(
            @PathVariable(name = "request_id") Long requestId,
            @Valid @RequestBody ProductDTO productDTO,
            @RequestHeader("Authorization") String authHeader,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }

            //Order order = orderService.createOrder(requestId, productDTO);
            orderService.createOrder(requestId, productDTO, authHeader);

            //return ResponseEntity.ok().body(OrderResponse.fromOrderProduct(order));
            return ResponseEntity.ok().body("Tạo đơn hàng thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/edit_order/{order_id}")
    public ResponseEntity<?> editOrder(
            @PathVariable(name = "order_id") Long orderId,
            @Valid @RequestBody ProductDTO productDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }

            Order order = orderService.editPriceQuote(orderId, productDTO);

            return ResponseEntity.ok().body(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/submit_price_quote/{order_id}")
    public ResponseEntity<String> submitPriceQuote(@PathVariable(name = "order_id") Long orderId,
                                                   @RequestHeader("Authorization") String authHeader) {
        try {
            orderService.submitPriceQuote(orderId, authHeader);
            return ResponseEntity.ok().body("Submit price quote successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/manager_price_quote")
    public ResponseEntity<String> responsePriceQuoteFromManager(
            @RequestBody ResponseOrderDTO responseOrderDTO,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String message = orderService.responsePriceQuoteFromManager(responseOrderDTO, authHeader) ?
                    "Báo giá được duyệt" : "Báo giá bị từ chối";
            return ResponseEntity.ok().body(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/customer_price_quote")
    public ResponseEntity<String> responsePriceQuoteFromCustomer(
            @RequestBody ResponseOrderDTO responseOrderDTO,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String message = orderService.responsePriceQuoteFromCustomer(responseOrderDTO, authHeader) ?
                    "Báo giá được chấp nhận" : "Báo giá bị từ chối";
            return ResponseEntity.ok().body(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "/submit_design/{order_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submitDesign(@PathVariable("order_id") Long orderId,
                                          @ModelAttribute("files") List<MultipartFile> files,
                                          @RequestHeader("Authorization") String authHeader) {
        try {
            Order order = orderService.getOrderById(orderId);
            orderService.submitDesign(order, files, authHeader);
            return ResponseEntity.ok().body("Gửi bản thiết kế 3D thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/approve_design")
    public ResponseEntity<String> approveDesign(
            @RequestBody ResponseOrderDTO responseOrderDTO,
            @RequestHeader("Authorization") String authHeader) {
        try {
            String message = orderService.approveDesign(responseOrderDTO, authHeader) ?
                    "Bản thiết kế 3D được chấp nhận" : "Bản thiết kế 3D bị từ chối";
            return ResponseEntity.ok().body(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/complete_product/{order_id}")
    public ResponseEntity<String> completeProduct(
            @PathVariable(name = "order_id") Long orderId,
            @RequestHeader("Authorization") String authHeader) {
        try {
            Order order = orderService.getOrderById(orderId);
            orderService.completeProduct(order, authHeader);
            return ResponseEntity.ok().body("Gia công trang sức hoàn thành");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/complete_order/{order_id}")
    public ResponseEntity<String> completeOrder(
            @PathVariable(name = "order_id") Long orderId,
            @RequestHeader("Authorization") String authHeader) {
        try {
            Order order = orderService.getOrderById(orderId);
            orderService.completeOrder(order, authHeader);
            return ResponseEntity.ok().body("Hoàn thành đơn hàng");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
