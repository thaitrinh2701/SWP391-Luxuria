package com.luxuria.services;

import com.luxuria.models.Role;

public interface IRoleService {
    Role getRoleFromToken(String authHeader) throws Exception;
}
