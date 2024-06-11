package com.luxuria.services;

import com.luxuria.models.Warranty;

public interface IWarrantyService {
    Warranty createWarranty(Long productId, Long userId) throws Exception;
}
