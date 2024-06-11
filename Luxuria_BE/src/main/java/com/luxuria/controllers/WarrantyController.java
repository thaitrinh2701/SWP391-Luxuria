package com.luxuria.controllers;

import com.luxuria.dtos.WarrantyDTO;
import com.luxuria.models.Warranty;
import com.luxuria.services.IWarrantyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/warranties")
@RequiredArgsConstructor
public class WarrantyController {

    private final IWarrantyService warrantyService;
    @PostMapping("/create_warranty")
    public ResponseEntity<?> createWarranty(@RequestBody WarrantyDTO warrantyDTO) {
        try {
            Warranty warranty = warrantyService.createWarranty(warrantyDTO.getProductId(), warrantyDTO.getUserId());
            return ResponseEntity.ok().body(warranty);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
