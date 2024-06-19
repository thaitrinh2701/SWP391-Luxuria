package com.luxuria.services;

import com.luxuria.dtos.ProductDataDTO;
import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.models.Product;
import com.luxuria.models.ProductData;
import com.luxuria.repositories.ProductDataRepository;
import com.luxuria.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductDataService implements IProductDataService {

    private final ProductDataRepository productDataRepository;
    private final ProductRepository productRepository;

    @Override
    public List<ProductData> getProductDataByProductId(Long productId) throws Exception {
        if(!productRepository.existsById(productId)) {
            throw new DataNotFoundException("product: Sản phẩm không tồn tại");
        }
        return productDataRepository.findAllByProductId(productId);
    }

    @Override
    public byte[] getImage(Long productDataId) throws Exception {
        ProductData productData = productDataRepository.findById(productDataId)
                .orElseThrow(() -> new DataNotFoundException("Not found"));
        return Base64.getDecoder().decode(productData.getValue());
    }

    @Override
    public List<ProductData> getAllProductData() {
        return productDataRepository.findAll();
    }

    @Override
    public void addProductImages(Long productId, List<MultipartFile> files) throws Exception {
        Product product = productRepository.findById(productId).orElseThrow();
        for (MultipartFile file : files) {
            String base64Image = encodeBase64(file);
            ProductData productImage = ProductData.builder()
                    .product(product)
                    .value(base64Image)
                    .build();
            productDataRepository.save(productImage);
        }
    }
    private String encodeBase64(MultipartFile file) throws IOException {
        byte[] imageBytes = file.getBytes();
        return  Base64.getEncoder().encodeToString(imageBytes);
    }
}
