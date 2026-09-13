package com.cognifyz.task8.Services;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
    private Bucket createBucket() {
        Refill refill = Refill.intervally(10, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(10, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    public boolean allowRequest(String key) {
        Bucket bucket = buckets.computeIfAbsent(key, k -> createBucket());
        return bucket.tryConsume(1);
    }
}
