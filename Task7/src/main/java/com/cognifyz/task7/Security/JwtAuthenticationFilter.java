package com.cognifyz.task7.Security;

import com.cognifyz.task7.Services.JwtServices;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private JwtServices jwtServices;

    public JwtAuthenticationFilter(JwtServices jwtServices) {
        this.jwtServices = jwtServices;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        String token = authHeader.substring(7);
        if (jwtServices.isTokenValid(token)){
            String email = jwtServices.extractEmail(token);
            String role = jwtServices.extractRole(token);
            Long userId = jwtServices.extractUserId(token);
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_"+role);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email,null, List.of(authority));
            authentication.setDetails(userId);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }else {
            System.out.println("Token is Invalid");
        }

        filterChain.doFilter(request,response);
    }
}
