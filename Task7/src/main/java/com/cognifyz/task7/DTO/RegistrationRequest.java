package com.cognifyz.task7.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationRequest {

    @NotBlank(message = "Name is Required")
    @Size(min = 3,max = 50, message = "Name should be 3 to 50 characters")
    private String name;

    @NotBlank(message = "Email is Required")
    @Email(message = "enter valid email")
    private String email;

    @NotNull(message = "Age is required")
    @Min(15)
    @Max(100)
    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Password is required")
    @Size(min = 8,message = "Password must contain at least 8 chars")
    private String password;
}
