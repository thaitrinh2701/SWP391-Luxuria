package com.luxuria.controllers;

import com.luxuria.models.ProductData;
import com.luxuria.services.IProductDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/product_data")
@RequiredArgsConstructor
public class ProductDataController {

    private final IProductDataService productDataService;

    @GetMapping("/{product_id}")
    public ResponseEntity<?> viewProductDataOfProduct(@PathVariable("product_id") Long productId) {
        try {
            List<ProductData> productDataList = productDataService.getProductDataByProductId(productId);
            return ResponseEntity.ok().body(productDataList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/view_all")
    public ResponseEntity<?> viewAllProductData() {
        try {
            List<ProductData> productDataList = productDataService.getAllProductData();
            return ResponseEntity.ok().body(productDataList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/product_data/image/{product_data_id}")
    public ResponseEntity<?> getImage(@PathVariable("product_data_id") Long productDataId) {
        try {
            byte[] image = productDataService.getImage(productDataId);
            return ResponseEntity.ok().body(image);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
