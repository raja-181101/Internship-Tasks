package com.cognifyz.task8.Controller;

import com.cognifyz.task8.DTO.GitHubCompleteProfileRequest;
import com.cognifyz.task8.Model.Role;
import com.cognifyz.task8.Model.User;
import com.cognifyz.task8.Repository.UserRepository;
import com.cognifyz.task8.Services.JwtServices;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/oauth")
public class OAuthController {
    private final UserRepository userRepository;
    private final JwtServices jwtServices;

    public OAuthController(UserRepository userRepository, JwtServices jwtServices) {
        this.userRepository = userRepository;
        this.jwtServices = jwtServices;
    }

    @PostMapping("/complete-profile")
    public ResponseEntity<?> completeProfile(@Valid @RequestBody GitHubCompleteProfileRequest request, HttpSession session) {
        String email = (String) session.getAttribute("githubEmail");
        String name = (String) session.getAttribute("githubName");
        if (email == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "GitHub session expired. Please login with GitHub again."));
        }
        User existingUser = userRepository.findByEmail(email).orElse(null);
        if (existingUser != null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "User already exists"));
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setAge(request.getAge());
        user.setGender(request.getGender());
        user.setCity(request.getCity());
        user.setRole(Role.USER);
        user.setPassword(null);
        user = userRepository.save(user);
        String token = jwtServices.generateToken(user);
        session.removeAttribute("githubEmail");
        session.removeAttribute("githubName");
        session.removeAttribute("githubUsername");
        Map<String, Object> response = new HashMap<>();
        response.put("message", "GitHub registration successful");
        response.put("token", token);
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        return ResponseEntity.ok(response);
    }
}
