package com.luxuria.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.luxuria.models.Product;
import com.luxuria.models.ProductData;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ProductResponse implements Comparable<ProductResponse> {

    private Product product;
    private List<ProductData> productDataList;

    @Override
    public int compareTo(ProductResponse o) {
        return this.product.getId().compareTo(o.product.getId());
    }
}
