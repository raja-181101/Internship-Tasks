package com.cognifyz.task8.Controller;

import com.cognifyz.task8.Services.GitHubServices;
import com.cognifyz.task8.Services.RateLimitService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/github")
public class GithubController {
    private final GitHubServices githubService;
    private final RateLimitService rateLimitService;

    public GithubController(GitHubServices githubService,RateLimitService rateLimitService) {
        this.githubService = githubService;
        this.rateLimitService = rateLimitService;
    }


    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(HttpSession session) {

        String rateLimitKey = session.getId();
        if (!rateLimitService.allowRequest(rateLimitKey)) {
            return ResponseEntity.status(429).body(Map.of("message", "Too many requests. Please try again later."));
        }

        String githubAccessToken = (String) session.getAttribute("githubAccessToken");
        if (githubAccessToken == null) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", "GitHub authentication is required"));
        }

        Map<String, Object> profile = githubService.getProfile(githubAccessToken);

        var repositories = githubService.getRepositories(githubAccessToken);

        return ResponseEntity.ok(Map.of("profile", profile, "repositories", repositories));
    }
    @GetMapping("/connect")
    public void connectGithub(Authentication authentication, HttpSession session, HttpServletResponse response) throws IOException {
        Long userId = (Long) authentication.getDetails();
        String userEmail = authentication.getName();
        session.setAttribute("githubLinkUserId", userId);
        session.setAttribute("githubLinkEmail",userEmail);
        response.sendRedirect("/oauth2/authorization/github");
    }
    @PostMapping("/connect")
    public ResponseEntity<?> connectGithub(Authentication authentication, HttpSession session) {
        Long userId = (Long) authentication.getDetails();
        String userEmail = authentication.getName();
        session.setAttribute("githubLinkUserId", userId);
        session.setAttribute("githubLinkEmail", userEmail);

        return ResponseEntity.ok(Map.of("authorizationUrl", "http://localhost:8081/oauth2/authorization/github"));
    }
}
