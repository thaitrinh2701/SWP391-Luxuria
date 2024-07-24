package com.luxuria.controllers;

import com.luxuria.dtos.UserChangeProfileDTO;
import com.luxuria.dtos.UserDTO;
import com.luxuria.dtos.UserForgotPasswordDTO;
import com.luxuria.dtos.UserLoginDTO;
import com.luxuria.models.User;
import com.luxuria.responses.UserLoginResponse;
import com.luxuria.responses.UserResponse;
import com.luxuria.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            if(!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("Mật khẩu không trùng khớp");
            }
            User user = userService.register(userDTO);
            UserResponse userResponse = UserResponse.fromUser(user);
            return ResponseEntity.ok().body(userResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO) {
        try {
            String token = userService.login(userLoginDTO.getEmail(), userLoginDTO.getPassword());
            User user = userService.findUserByEmail(userLoginDTO.getEmail());
            userService.revokedAllUserTokens(user);
            userService.saveUserToken(user, token);
            UserResponse userResponse = UserResponse.fromUser(user);
            UserLoginResponse userLoginResponse = UserLoginResponse.builder()
                    .userResponse(userResponse)
                    .token(token).build();
            return ResponseEntity.ok(userLoginResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("authorization") String authHeader) {
        try {
            userService.invalidateToken(authHeader);
            return ResponseEntity.ok().body("Đăng xuất thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/forgot_password")
    public ResponseEntity<String> forgotPassword(@RequestBody UserForgotPasswordDTO userForgotPasswordDTO) {
        try {
            userService.forgotPassword(userForgotPasswordDTO.getEmail());
            return ResponseEntity.ok().body("Vui lòng kiểm tra hòm thư email của bạn để đặt lại mật khẩu.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/reset_password")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestHeader String newPassword) {
        try {
            userService.resetPassword(email, newPassword);
            return ResponseEntity.ok().body("Đặt lại mật khẩu thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/change_profile")
    public ResponseEntity<String> changeProfile(
            @RequestHeader("authorization") String authHeader,
            @RequestBody UserChangeProfileDTO userChangeProfileDTO) {
        try {
            User user = userService.findUserByToken(authHeader);
            userService.changeProfile(user, userChangeProfileDTO);
            return ResponseEntity.ok().body("Sửa hồ sơ thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/change_password")
    public ResponseEntity<String> changePassword(
            @RequestHeader("authorization") String authHeader,
            @RequestBody Map<String, Object> requestBody) {
        try {
            String newPassword = (String) requestBody.get("new_password");
            User user = userService.findUserByToken(authHeader);
            userService.changePassword(user, newPassword);
            return ResponseEntity.ok().body("Đổi mật khẩu thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("view_all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDTO userDTO,
            BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            if(!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("Mật khẩu không trùng khớp");
            }
            User user = userService.createUser(userDTO);
            UserResponse userResponse = UserResponse.fromUser(user);
            return ResponseEntity.ok().body(userResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{user_id}")
    public ResponseEntity<String> updateUser(
            @PathVariable("user_id") Long userId,
            @RequestBody UserDTO userDTO) {
        try {
            userService.updateUser(userId, userDTO);
            return ResponseEntity.ok().body("Cập nhật thông tin thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/delete/{user_id}")
    public ResponseEntity<String> deleteUser(@PathVariable("user_id") Long userId) {
        try {
            userService.softDeleteUser(userId);
            return ResponseEntity.ok().body("Xóa người dùng thành công");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
