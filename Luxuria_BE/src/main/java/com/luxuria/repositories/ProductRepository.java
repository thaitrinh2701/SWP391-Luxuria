package com.luxuria.repositories;

import com.luxuria.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE p.isOriginal = true")
    List<Product> findAllOriginalProducts();

    @Query("SELECT p FROM Product p WHERE p.isOriginal = true AND p.category.id=:category_id")
    List<Product> findAllOriginalProductsByCategory(@Param("category_id") Long categoryId);
}
