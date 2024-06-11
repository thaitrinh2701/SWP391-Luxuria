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
public class ProductResponse {

    private Product product;
    private List<ProductData> productDataList;
}
