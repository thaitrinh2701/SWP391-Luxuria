package com.luxuria.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    @JsonProperty("full_name")
    private String fullName;

    @NotBlank(message = "Email is required!")
    private String email;

    @JsonProperty("phone_number")
    @NotBlank(message = "Phone number is required!")
    private String phoneNumber;

    @NotBlank(message = "Password cannot be blank!")
    private String password;

    @JsonProperty("confirm_password")
    private String confirmPassword;

    @JsonProperty("role_id")
    @NotNull(message = "Role ID is required!")
    private Long roleId;
}
