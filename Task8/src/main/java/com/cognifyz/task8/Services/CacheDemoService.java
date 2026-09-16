package com.cognifyz.task8.Services;

import com.cognifyz.task8.Model.User;
import com.cognifyz.task8.Repository.UserRepository;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class CacheDemoService {

    private static final String CACHE_PREFIX =
            "task8:demo:user:";

    private final UserRepository userRepository;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    public CacheDemoService(
            UserRepository userRepository,
            StringRedisTemplate redisTemplate,
            ObjectMapper objectMapper
    ) {
        this.userRepository = userRepository;
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }


    public User getUserFromDatabase(String email) {

        return userRepository
                .findByEmail(email)
                .orElse(null);
    }

    public boolean isUserCached(String email) {

        return Boolean.TRUE.equals(
                redisTemplate.hasKey(
                        CACHE_PREFIX + email
                )
        );
    }

    public User addUserToCache(String email) {

        User user =
                getUserFromDatabase(email);

        if (user == null) {
            return null;
        }

        try {

            String json =
                    objectMapper.writeValueAsString(user);

            redisTemplate
                    .opsForValue()
                    .set(
                            CACHE_PREFIX + email,
                            json,
                            10,
                            TimeUnit.MINUTES
                    );

            return user;

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Unable to cache user",
                    exception
            );
        }
    }

    public User getUserFromRedis(String email) {

        String json =
                redisTemplate
                        .opsForValue()
                        .get(
                                CACHE_PREFIX + email
                        );

        if (json == null) {
            return null;
        }

        try {

            return objectMapper.readValue(
                    json,
                    User.class
            );

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Unable to read cached user",
                    exception
            );
        }
    }
    public Map<String, Object> getCacheStatus(
            String email
    ) {

        User user =
                getUserFromDatabase(email);

        Map<String, Object> response =
                new LinkedHashMap<>();

        if (user == null) {

            response.put("cached", false);
            response.put("name", "User");

            return response;
        }

        response.put(
                "cached",
                isUserCached(email)
        );

        response.put(
                "name",
                user.getName()
        );

        return response;
    }

    public Object getField(
            User user,
            String field
    ) {

        return switch (
                field.toLowerCase()
                ) {

            case "name" ->
                    user.getName();

            case "email" ->
                    user.getEmail();

            case "age" ->
                    user.getAge();

            case "city" ->
                    user.getCity();

            case "gender" ->
                    user.getGender();

            default ->
                    throw new IllegalArgumentException(
                            "Invalid field"
                    );
        };
    }
}
