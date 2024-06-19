package com.luxuria.services;

import com.luxuria.models.ProductData;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProductDataService {
    List<ProductData> getProductDataByProductId(Long productId) throws Exception;

    byte[] getImage(Long productDataId) throws Exception;

    List<ProductData> getAllProductData();

    void addProductImages(Long productId, List<MultipartFile> files) throws Exception;
}
