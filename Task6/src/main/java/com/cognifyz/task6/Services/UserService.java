package com.cognifyz.task6.Services;

import com.cognifyz.task6.DTO.UpdateUserRequest;
import com.cognifyz.task6.Model.Role;
import com.cognifyz.task6.Model.User;
import com.cognifyz.task6.Repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder passwordEncoder;

    public User login(String email, String password){
        User user = repo.findByEmail(email).orElse(null);
        System.out.println("username: "+email);
        if (user==null){
            return null;
        }
        boolean passwordMatches = passwordEncoder.matches(password, user.getPassword());
        if (!passwordMatches){
            return null;
        }
        return user;

    }

    public UserService(UserRepository repo, BCryptPasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers(){
        return repo.findAll();
    }

    public User getUserById(Long id){
        return repo.findById(id).orElse(null);
    }

    public User createUser(User user){
        user.setId(null);
        user.setRole(Role.USER);
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return repo.save(user);
    }
    public User updateUser(Long id, UpdateUserRequest updatedUser){
        User existingUser = repo.findById(id).orElse(null);
        if(existingUser == null){
            return null;
        }
        existingUser.setName(updatedUser.getName());
        existingUser.setAge(updatedUser.getAge());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setCity(updatedUser.getCity());
        existingUser.setGender(updatedUser.getGender());
        return repo.save(existingUser);
    }

    public boolean deleteUser(Long id){
        if (!repo.existsById(id)){
            return false;
        }
        repo.deleteById(id);
        return true;
    }
}
