package com.cognifyz.task5.Model;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class User {
    private Long id;

    @NotNull(message = "Age is Required")
    @Min(value = 15,message = "Age must be At Least 15")
    @Max(value = 100, message = "Age must not be more than 100")
    private Integer age;

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 to 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter Valid email")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
            message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "City is required")
    private String city;

    public User() {
    }

    public User(Long id, Integer age, String name, String email, String gender, String city) {
        this.id = id;
        this.age = age;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.city = city;
    }

}
