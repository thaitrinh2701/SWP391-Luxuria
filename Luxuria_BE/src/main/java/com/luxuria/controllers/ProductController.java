package com.luxuria.controllers;

import com.luxuria.dtos.ProductDataDTO;
import com.luxuria.models.Product;
import com.luxuria.models.ProductData;
import com.luxuria.responses.ProductResponse;
import com.luxuria.services.IProductDataService;
import com.luxuria.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;
    private final IProductDataService productDataService;

    @GetMapping
    public ResponseEntity<?> viewAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            List<ProductResponse> productResponses = new ArrayList<>();
            for (Product product: products) {
                List<ProductData> productDataList = productDataService.getProductDataByProductId(product.getId());
                ProductResponse productResponse = ProductResponse.builder()
                        .product(product)
                        .productDataList(productDataList)
                        .build();
                productResponses.add(productResponse);
            }
            return ResponseEntity.ok().body(productResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<?> viewProduct(@PathVariable("product_id") Long productId) {
        try {
            Product product = productService.getProductById(productId);
            List<ProductData> productDataList = productDataService.getProductDataByProductId(product.getId());
            ProductResponse productResponse = ProductResponse.builder()
                    .product(product)
                    .productDataList(productDataList)
                    .build();
            return ResponseEntity.ok().body(productResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping(value = "/upload/{product_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadProductData(@PathVariable("product_id") Long productId,
                                               @ModelAttribute("files") List<MultipartFile> files) {
        try {
            Product existProduct = productService.getProductById(productId);
            List<ProductData> productDataList = productService.uploadFiles(existProduct, files);
            return ResponseEntity.ok().body(productDataList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
