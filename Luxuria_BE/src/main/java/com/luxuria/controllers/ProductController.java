package com.luxuria.controllers;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.models.Product;
import com.luxuria.models.ProductData;
import com.luxuria.responses.CreateProductResponse;
import com.luxuria.responses.ProductResponse;
import com.luxuria.services.IProductDataService;
import com.luxuria.services.IProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;
    private final IProductDataService productDataService;

    @GetMapping
    public ResponseEntity<?> viewAllProducts() {
        try {
            List<ProductResponse> productResponses = productService.getAllOriginalProducts();
            productResponses.sort(Collections.reverseOrder());
            return ResponseEntity.ok().body(productResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/no_images")
    public ResponseEntity<?> viewAllProductsWithoutImages() {
        try {
            List<Product> products = productService.getAllOriginalProductsWithoutImages();
            products.sort(Collections.reverseOrder());
            return ResponseEntity.ok().body(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/category/{category_id}")
    public ResponseEntity<?> viewOriginalProductsByCategory(@PathVariable("category_id") Long categoryId) {
        try {
            List<ProductResponse> productResponses = productService.viewOriginalProductsByCategory(categoryId);
            productResponses.sort(Collections.reverseOrder());
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

    @GetMapping("/no_images/{product_id}")
    public ResponseEntity<?> viewProductWithoutImage(@PathVariable("product_id") Long productId) {
        try {
            Product product = productService.getProductById(productId);
            return ResponseEntity.ok().body(product);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
//    @PostMapping(value ="/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> createOriginalProduct(
//            @Valid @ModelAttribute("productDTO") ProductDTO productDTO,
//            @ModelAttribute("files") List<MultipartFile> files,
//            BindingResult result) {
//        try {
//            if (result.hasErrors()) {
//                List<String> errorMessages = result.getFieldErrors()
//                        .stream()
//                        .map(FieldError::getDefaultMessage)
//                        .toList();
//                return ResponseEntity.badRequest().body(errorMessages);
//            }
//            Product product = productService.createProduct(productDTO);
//            productService.uploadFiles(product, files);
//            return ResponseEntity.ok().body("Thêm sản phẩm thành công");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @PostMapping("/create")
    public ResponseEntity<?> createOriginalProduct(
            @RequestBody ProductDTO productDTO) {
        try {
            Product product = productService.createProduct(productDTO);
            CreateProductResponse response = CreateProductResponse.builder()
                    .productId(product.getId())
                    .build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{product_id}")
    public ResponseEntity<?> updateOriginalProduct(
            @PathVariable("product_id") Long productId,
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
            productService.updateOriginalProduct(productId, productDTO);
            return ResponseEntity.ok().body("Cập nhật sản phẩm thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{product_id}")
    public ResponseEntity<String> deleteOriginalProduct(@PathVariable("product_id") Long productId) {
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok().body("Xóa sản phẩm thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/update_images/{product_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateOriginalProductData(
            @PathVariable("product_id") Long productId,
            @ModelAttribute("files") List<MultipartFile> files) {
        try {
            if (!files.isEmpty()) {
                productService.updateOriginalProductData(productId, files);
            }
            return ResponseEntity.ok().body("Cập nhật ảnh sản phẩm thành công");
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
