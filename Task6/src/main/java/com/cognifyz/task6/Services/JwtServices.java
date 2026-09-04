package com.cognifyz.task6.Services;

import com.cognifyz.task6.Model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtServices {
    private final String SECRET = "181101161144211811011611442118110116114422";
    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(
                SECRET.getBytes(StandardCharsets.UTF_8)
        );
    }
    public String generateToken(User user) {
        long expirationTime = 1000 * 60 * 60;
        return Jwts.builder().subject(user.getEmail())
                .claim("role", user.getRole().name())
                .claim("userId", user.getId())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getKey())
                .compact();
    }

    public Claims extractClaims(String token){
        return Jwts.parser().verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractEmail(String token){
        return extractClaims(token).getSubject();
    }
    public Long extractUserId(String token) {
        Number userId = extractClaims(token).get("userId", Number.class);
        return userId.longValue();
    }
    public String extractRole(String token){
        return extractClaims(token).get("role", String.class);
    }
    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (JwtException e) {
            return false;
        }
    }

}
