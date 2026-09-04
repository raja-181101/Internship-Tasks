package com.cognifyz.task7.Controller;


import com.cognifyz.task7.DTO.RegistrationRequest;
import com.cognifyz.task7.DTO.UpdateUserRequest;
import com.cognifyz.task7.Model.User;
import com.cognifyz.task7.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id, Authentication authentication){
        User user = userService.getUserById(id);
        if(user==null){
            return ResponseEntity.notFound().build();
        }
        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(authority->authority.getAuthority().equals("ROLE_ADMIN"));
        Long loggedInUserId = (Long) authentication.getDetails();
        boolean isOwner = user.getId().equals(loggedInUserId);
        if (!isOwner && !isAdmin){
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message","You are not allowed to access this User"));
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody RegistrationRequest request){

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setAge(request.getAge());
        user.setGender(request.getGender());
        user.setCity(request.getCity());
        user.setPassword(request.getPassword());
        User createdUser = userService.createUser(user);
        return ResponseEntity.status(201).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserRequest user, Authentication authentication){
        User existingUser = userService.getUserById(id);

        if (existingUser == null){
            return ResponseEntity.notFound().build();
        }
        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(authority->authority.getAuthority().equals("ROLE_ADMIN"));
        Long loggedInUserId = (Long) authentication.getDetails();
        boolean isOwner = existingUser.getId().equals(loggedInUserId);
        if (!isOwner && !isAdmin){
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message","You are not allowed to access this User"));
        }
        User updatedUser = userService.updateUser(id,user);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id,Authentication authentication){
        User existingUser = userService.getUserById(id);
        if (existingUser == null){
            return ResponseEntity.notFound().build();
        }
        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(authority->authority.getAuthority().equals("ROLE_ADMIN"));
        Long loggedInUserId = (Long) authentication.getDetails();
        boolean isOwner = existingUser.getId().equals(loggedInUserId);
        if (!isOwner && !isAdmin){
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message","You are not allowed to access this User"));
        }
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message","user deleted successfully"));
    }
}
