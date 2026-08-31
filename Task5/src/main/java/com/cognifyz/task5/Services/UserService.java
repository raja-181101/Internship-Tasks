package com.cognifyz.task5.Services;

import com.cognifyz.task5.Model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private List<User> Users = new ArrayList<>();
    private long nextId = 1;

    public List<User> getAllUsers(){
        return Users;
    }

    public User getUserById(Long id){
        return Users.stream()
                .filter(User -> User.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public User createUser(User user){
        user.setId(nextId++);
        Users.add(user);
        return user;
    }
    public User updateUser(Long id, User updatedUser){
        User existingUser = getUserById(id);
        if(existingUser == null){
            return null;
        }
        existingUser.setName(updatedUser.getName());
        existingUser.setAge(updatedUser.getAge());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setCity(updatedUser.getCity());
        existingUser.setGender(updatedUser.getGender());
        return existingUser;
    }

    public boolean deleteUser(Long id){
        return Users.removeIf(User -> User.getId().equals(id));
    }
}
