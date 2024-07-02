package com.luxuria.services;

import com.luxuria.dtos.UserChangeProfileDTO;
import com.luxuria.dtos.UserDTO;
import com.luxuria.models.Request;
import com.luxuria.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {

    User register(UserDTO userDTO) throws Exception;

    User createUser(UserDTO userDTO) throws Exception;

    String login(String email, String password) throws Exception;

    User findUserByEmail(String email) throws Exception;

    void saveUserToken(User user, String token);

    void revokedAllUserTokens(User user);

    User findUserByToken(String token) throws Exception;

    User findUserById(Long userId) throws Exception;

    void forgotPassword(String email) throws Exception;

    void resetPassword(String email, String newPassword) throws Exception;

    void changeProfile(User user, UserChangeProfileDTO userChangeProfileDTO) throws Exception;

    void changePassword(User user, String newPassword) throws Exception;

    void invalidateToken(String authHeader) throws Exception;

    void softDeleteUser(Long userId) throws Exception;

    void updateUser(Long userId, UserDTO userDTO) throws Exception;

    List<User> getAllUsers();
}
