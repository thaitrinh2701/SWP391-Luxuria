package com.luxuria.responses;

import com.luxuria.models.User;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserLoginResponse {

    private UserResponse userResponse;
    private String token;
}
