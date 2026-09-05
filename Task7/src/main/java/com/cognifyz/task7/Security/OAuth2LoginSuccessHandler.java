package com.cognifyz.task7.Security;

import com.cognifyz.task7.Repository.UserRepository;
import com.cognifyz.task7.Services.JwtServices;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    public OAuth2LoginSuccessHandler(UserRepository userRepo, JwtServices jwtServices) {
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuthUser = (OAuth2User) authentication.getPrincipal();
        String gitHubName = oAuthUser.getAttribute("login");
        String name = oAuthUser.getAttribute("name");
        String email = oAuthUser.getAttribute("email");

        System.out.println("GitHub User Name: "+gitHubName);
        System.out.println("GitHub Name: "+name);
        System.out.println("GitHub Email: "+email);

        response.sendRedirect("http://localhost:5173");
    }
}
