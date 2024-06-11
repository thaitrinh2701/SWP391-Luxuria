package com.luxuria.responses;

import com.luxuria.models.Order;
import com.luxuria.models.ProductData;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class OrderDetailResponse {

    private Order order;

    private List<ProductData> productImages;
}
