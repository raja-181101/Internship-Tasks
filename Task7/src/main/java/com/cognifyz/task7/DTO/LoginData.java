package com.cognifyz.task7.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginData {

    @NotBlank(message = "Email is required")
    @Email(message = "Enter Valid Email")
    private String email;


    @NotBlank(message = "Password is required")
    private String password;
}
