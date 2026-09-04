package com.cognifyz.task7.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @JsonIgnore
    @NotBlank(message = "Password is Required")
    @Size(min = 8, message = "Password must be At Least 8 Characters")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;
}
