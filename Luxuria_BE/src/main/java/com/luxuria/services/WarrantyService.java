package com.luxuria.services;

import com.luxuria.models.Product;
import com.luxuria.models.User;
import com.luxuria.models.Warranty;
import com.luxuria.repositories.WarrantyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WarrantyService implements IWarrantyService {

    private final WarrantyRepository warrantyRepository;
    private final ProductService productService;
    private final UserService userService;
    @Override
    public Warranty createWarranty(Long productId, Long userId) throws Exception {
        Product product = productService.getProductById(productId);
        User user = userService.findUserById(userId);
        Warranty warranty = Warranty.builder()
                .product(product)
                .user(user)
                .warrantyTime("6 tháng")
                .build();
        return warrantyRepository.save(warranty);
    }
}
