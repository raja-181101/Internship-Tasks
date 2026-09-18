package com.cognifyz.task8.Repository;

import com.cognifyz.task8.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByGithubId(Long githubId);
}
