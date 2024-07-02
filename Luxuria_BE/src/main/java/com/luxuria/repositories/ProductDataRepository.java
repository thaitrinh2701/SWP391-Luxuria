package com.luxuria.repositories;

import com.luxuria.models.ProductData;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductDataRepository extends JpaRepository<ProductData, Long> {

    List<ProductData> findAllByProductId(Long productId);

    @Modifying
    @Query("DELETE FROM ProductData pd WHERE pd.product.id=:product_id")
    void deleteAllByProductId(@Param("product_id") Long productId);

}
