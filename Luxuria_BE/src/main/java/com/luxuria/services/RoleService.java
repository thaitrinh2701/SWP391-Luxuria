package com.luxuria.services;

import com.luxuria.components.JwtTokenUntil;
import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.exceptions.PermissionDeniedException;
import com.luxuria.models.Role;
import com.luxuria.models.User;
import com.luxuria.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService{

    private final JwtTokenUntil jwtTokenUntil;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @Override
    public Role getRoleFromToken(String authHeader) throws Exception {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new PermissionDeniedException("token: Unauthorized");
        }

        final String token = authHeader.substring(7);
        final String email = jwtTokenUntil.extractEmail(token);
        if (email == null) {
            throw new DataNotFoundException("email: Email không tồn tại");
        }
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("email: User không tồn tại"));
        return user.getRole();
    }
}
