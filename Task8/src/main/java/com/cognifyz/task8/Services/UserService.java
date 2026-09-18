package com.cognifyz.task8.Services;

import com.cognifyz.task8.DTO.UpdateUserRequest;
import com.cognifyz.task8.Model.Role;
import com.cognifyz.task8.Model.User;
import com.cognifyz.task8.Repository.UserRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
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

    @Cacheable(value = "users",key = "#id")
    public User getUserById(Long id){
        System.out.println("Fetching Users from Postgres: "+id);
        return repo.findById(id).orElse(null);
    }

    public User createUser(User user){
        user.setId(null);
        user.setRole(Role.USER);
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return repo.save(user);
    }
    @CachePut(value = "users",key = "#id")
    public User updateUser(Long id, UpdateUserRequest updatedUser){
        System.out.println("Updating Users from Postgres: "+id);
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
    @CachePut(value = "users", key = "#userId")
    public User connectGithub(Long userId, Long githubId, String githubUsername) {
        User user = repo.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }
        user.setGithubId(githubId);
        user.setGithubUsername(githubUsername);
        return repo.save(user);
    }

    @CacheEvict(value = "users",key = "#id")
    public boolean deleteUser(Long id){
        if (!repo.existsById(id)){
            return false;
        }
        repo.deleteById(id);
        return true;
    }
}
