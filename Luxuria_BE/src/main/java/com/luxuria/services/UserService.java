package com.luxuria.services;

import com.luxuria.components.EmailUntil;
import com.luxuria.components.JwtTokenUntil;
import com.luxuria.dtos.UserChangeProfileDTO;
import com.luxuria.dtos.UserDTO;
import com.luxuria.exceptions.DataNotFoundException;
import com.luxuria.exceptions.PermissionDeniedException;
import com.luxuria.models.Role;
import com.luxuria.models.Token;
import com.luxuria.models.TokenType;
import com.luxuria.models.User;
import com.luxuria.repositories.RoleRepository;
import com.luxuria.repositories.TokenRepository;
import com.luxuria.repositories.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUntil jwtTokenUntil;
    private final AuthenticationManager authenticationManager;
    private final EmailUntil emailUntil;

    @Override
    public User register(UserDTO userDTO) throws Exception {
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("role: Role này không tồn tại"));
        if (!role.getName().equalsIgnoreCase("CUSTOMER")) {
            throw new PermissionDeniedException("role: Không thể đăng ký các role khác");
        }
        return createUser(userDTO);
    }

    @Override
    public User createUser(UserDTO userDTO) throws Exception {
        String email = userDTO.getEmail();

        if (userRepository.existsByEmail(email)) {
            throw new DataIntegrityViolationException("email: Email này đã tồn tại");
        }

        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("role: Role này không tồn tại"));

        User newUser = User.builder()
                .fullName(userDTO.getFullName())
                .email(userDTO.getEmail())
                .phoneNumber(userDTO.getPhoneNumber())
                .password(userDTO.getPassword())
                .isActive(true)
                .build();
        newUser.setRole(role);
        String password = userDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encodedPassword);

        return userRepository.save(newUser);
    }

    @Override
    public String login(String email, String password) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            throw new DataNotFoundException("Email hoặc mật khẩu không đúng");
        }
        User existingUser = user.get();

        if (!existingUser.isActive()) {
            throw new BadCredentialsException("Tài khoản đã bị vô hiệu hóa");
        }

        //check password
        if (!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new BadCredentialsException("Email hoặc mật khẩu không đúng");
        }

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                email, password, existingUser.getAuthorities()
        );
        //authenticate with Java Spring security
        authenticationManager.authenticate(authenticationToken);

        return jwtTokenUntil.generateToken(existingUser);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        return userRepository.findByEmail(email).orElseThrow(() -> new DataNotFoundException("email: User không tồn tại"));
    }

    @Override
    public void saveUserToken(User user, String token) {
        var saveToken = Token.builder()
                .user(user)
                .token(token)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false).build();
        tokenRepository.save(saveToken);
    }

    @Override
    public void revokedAllUserTokens(User user) {
        List<Token> validTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validTokens.isEmpty()) {
            return;
        }
        validTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validTokens);
    }

    @Override
    public User findUserByToken(String authHeader) throws Exception {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new PermissionDeniedException("token: Unauthorized");
        }

        final String token = authHeader.substring(7);
        final String email = jwtTokenUntil.extractEmail(token);
        if (email == null) {
            throw new DataNotFoundException("email: Email không tồn tại");
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("email: User không tồn tại"));
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        return userRepository.findById(userId).orElseThrow(() -> new DataNotFoundException("userId: User không tồn tại"));
    }

    @Override
    public void forgotPassword(String email) throws Exception {
        findUserByEmail(email);
        try {
            emailUntil.sendResetPasswordEmail(email);
        } catch (MessagingException e) {
            throw new RuntimeException("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại.");
        }
    }

    @Override
    public void resetPassword(String email, String newPassword) throws Exception {
        User user = findUserByEmail(email);
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    public void changeProfile(User user, UserChangeProfileDTO userChangeProfileDTO) throws Exception {
        user.setFullName(userChangeProfileDTO.getFullName());
        user.setPhoneNumber(userChangeProfileDTO.getPhoneNumber());
        userRepository.save(user);
    }

    @Override
    public void changePassword(User user, String newPassword) throws Exception {
        String encodedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    public void invalidateToken(String authHeader) throws Exception {
        User user = findUserByToken(authHeader);
        revokedAllUserTokens(user);
    }

    @Override
    public void softDeleteUser(Long userId) throws Exception {
        User user = findUserById(userId);
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public void updateUser(Long userId, UserDTO userDTO) throws Exception {
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("role: Role này không tồn tại"));
        User user = findUserById(userId);
        user.setFullName(userDTO.getFullName());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setRole(role);
        String newPassword = passwordEncoder.encode(userDTO.getPassword());
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
