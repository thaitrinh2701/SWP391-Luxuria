package com.luxuria.services;

import com.luxuria.dtos.ProductDTO;
import com.luxuria.dtos.ProductDataDTO;
import com.luxuria.models.Product;
import com.luxuria.models.ProductData;
import com.luxuria.responses.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProductService {
    List<ProductResponse> getAllOriginalProducts() throws Exception;

    Product getProductById(Long productId) throws Exception;

    Product createProduct(ProductDTO productDTO) throws Exception;

    ProductData createProductData(Long productId, ProductDataDTO productDataDTO) throws Exception;

    List<ProductData> uploadFiles(Product product, List<MultipartFile> files) throws Exception;

    Product updatePrice(Long productId, ProductDTO productDTO) throws Exception;

    List<ProductResponse> viewOriginalProductsByCategory(Long categoryId) throws Exception;

    void updateOriginalProduct(Long productId, ProductDTO productDTO) throws Exception;

    void updateOriginalProductData(Long productId, List<MultipartFile> files) throws Exception;

    void deleteProduct(Long productId) throws Exception;

    List<Product> getAllOriginalProductsWithoutImages();
}
