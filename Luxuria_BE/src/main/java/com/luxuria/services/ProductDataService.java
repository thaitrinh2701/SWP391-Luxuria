package com.luxuria.services;

import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.models.ProductData;
import com.luxuria.repositories.ProductDataRepository;
import com.luxuria.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
