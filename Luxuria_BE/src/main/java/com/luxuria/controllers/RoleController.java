package com.luxuria.controllers;

import com.luxuria.models.Role;
import com.luxuria.services.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/roles")
@RequiredArgsConstructor
public class RoleController {

    private final IRoleService roleService;

    @GetMapping("/token")
    public ResponseEntity<?> getRoleFromToken(@RequestHeader("Authorization") String authHeader) {
        try {
            Role role = roleService.getRoleFromToken(authHeader);
            return ResponseEntity.ok().body(role);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
