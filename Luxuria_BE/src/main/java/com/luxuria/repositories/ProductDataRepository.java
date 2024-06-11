package com.luxuria.repositories;

import com.luxuria.models.ProductData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductDataRepository extends JpaRepository<ProductData, Long> {

    List<ProductData> findAllByProductId(Long productId);

    void deleteAllByProductId(Long productId);

}
