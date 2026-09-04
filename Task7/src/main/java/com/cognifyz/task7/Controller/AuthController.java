package com.cognifyz.task7.Controller;

import com.cognifyz.task7.DTO.LoginData;
import com.cognifyz.task7.Model.User;
import com.cognifyz.task7.Services.JwtServices;
import com.cognifyz.task7.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;
    private final JwtServices jwtServices;

    public AuthController(UserService userService,JwtServices jwtServices) {
        this.userService = userService;
        this.jwtServices = jwtServices;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginData request){
        User user = userService.login(request.getEmail(),request.getPassword());
        System.out.println("Email: "+request.getEmail());
        if (user==null){
            Map<String,String> error = new HashMap<>();
            error.put("message","Invalid Email or Password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(error);
        }
        String token = jwtServices.generateToken(user);
        Map<String,Object> response = new HashMap<>();
        response.put("message","Login Successful");
        response.put("id",user.getId());
        response.put("name",user.getName());
        response.put("email",user.getEmail());
        response.put("role",user.getRole());
        response.put("token",token);
        return ResponseEntity.ok(response);
    }
}
