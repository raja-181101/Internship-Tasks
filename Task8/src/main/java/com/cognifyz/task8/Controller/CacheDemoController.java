package com.cognifyz.task8.Controller;

import com.cognifyz.task8.Model.User;
import com.cognifyz.task8.Services.CacheDemoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cache/me")
public class CacheDemoController {

    private final CacheDemoService cacheDemoService;

    public CacheDemoController(
            CacheDemoService cacheDemoService
    ) {
        this.cacheDemoService =
                cacheDemoService;
    }

    @GetMapping("/status")
    public ResponseEntity<?> getCacheStatus(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        return ResponseEntity.ok(
                cacheDemoService
                        .getCacheStatus(email)
        );
    }


    @PostMapping
    public ResponseEntity<?> addToCache(
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        User user =
                cacheDemoService
                        .addUserToCache(email);

        if (user == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        user.getName()
                                + " added to Redis Cache",
                        "cached",
                        true,
                        "name",
                        user.getName()
                )
        );
    }
    @GetMapping("/database")
    public ResponseEntity<?> getFromDatabase(
            @RequestParam String field,
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        long start =
                System.nanoTime();

        User user =
                cacheDemoService
                        .getUserFromDatabase(email);

        if (user == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        Object value;

        try {

            value =
                    cacheDemoService
                            .getField(
                                    user,
                                    field
                            );

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }

        long end =
                System.nanoTime();

        double timeMs =
                (end - start)
                        / 1_000_000.0;

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "source",
                "DATABASE"
        );

        response.put(
                "field",
                field
        );

        response.put(
                "value",
                value
        );

        response.put(
                "timeMs",
                timeMs
        );

        return ResponseEntity.ok(response);
    }


 
    @GetMapping("/redis")
    public ResponseEntity<?> getFromRedis(
            @RequestParam String field,
            Authentication authentication
    ) {

        String email =
                authentication.getName();

        long start =
                System.nanoTime();

        User user =
                cacheDemoService
                        .getUserFromRedis(email);

        if (user == null) {

            return ResponseEntity
                    .status(404)
                    .body(
                            Map.of(
                                    "message",
                                    "User is not available in Redis Cache"
                            )
                    );
        }

        Object value;

        try {

            value =
                    cacheDemoService
                            .getField(
                                    user,
                                    field
                            );

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    exception.getMessage()
                            )
                    );
        }

        long end =
                System.nanoTime();

        double timeMs =
                (end - start)
                        / 1_000_000.0;

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "source",
                "REDIS"
        );

        response.put(
                "field",
                field
        );

        response.put(
                "value",
                value
        );

        response.put(
                "timeMs",
                timeMs
        );

        return ResponseEntity.ok(response);
    }
}
