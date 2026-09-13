package com.cognifyz.task8.Security;

import com.cognifyz.task8.Model.User;
import com.cognifyz.task8.Repository.UserRepository;
import com.cognifyz.task8.Services.JwtServices;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    public final OAuth2AuthorizedClientService oAuth2AuthorizedClientService;
    UserRepository userRepository;
    JwtServices jwtServices;

    public OAuth2LoginSuccessHandler(UserRepository userRepo, JwtServices jwtServices, OAuth2AuthorizedClientService oAuth2AuthorizedClientService) {
        this.oAuth2AuthorizedClientService = oAuth2AuthorizedClientService;
        this.userRepository = userRepo;
        this.jwtServices = jwtServices;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuthUser = (OAuth2User) authentication.getPrincipal();
        String gitHubName = oAuthUser.getAttribute("login");
        String name = oAuthUser.getAttribute("name");
        String email = oAuthUser.getAttribute("email");
        Number githubIdValue = oAuthUser.getAttribute("id");
        Long githubId = githubIdValue.longValue();

        Long githubLinkUserId = (Long) request.getSession().getAttribute("githubLinkUserId");

        OAuth2AuthorizedClient authorizedClient = oAuth2AuthorizedClientService.loadAuthorizedClient("github", authentication.getName());
        String githubAccessToken = authorizedClient.getAccessToken().getTokenValue();

        request.setAttribute("githubAccessToken",githubAccessToken);

        RestClient restClient = RestClient.create();
        List<Map<String,Object>> emails = restClient.get().uri("https://api.github.com/user/emails")
                        .header("Authorization","Bearer "+githubAccessToken)
                                .header("Accept","application/vnd.github+json")
                                        .retrieve().body(new ParameterizedTypeReference<List<Map<String, Object>>>() {});
        if (email == null && emails != null) {
            for (Map<String, Object> item : emails) {
                boolean primary = Boolean.TRUE.equals(item.get("primary"));
                boolean verified = Boolean.TRUE.equals(item.get("verified"));
                if (primary && verified) {
                    email = (String) item.get("email");
                    break;
                }
            }
        }

        if (githubLinkUserId != null) {
            User user = userRepository.findById(githubLinkUserId).orElse(null);
            if (user == null) {
                response.sendRedirect("http://localhost:5173/profile");
                return;
            }
            user.setGithubId(githubId);
            user.setGithubUsername(gitHubName);
            userRepository.save(user);
            request.getSession().removeAttribute("githubLinkUserId");
            request.getSession().setAttribute("githubAccessToken", githubAccessToken);
            response.sendRedirect("http://localhost:5173/profile?github=connected");
            return;
        }

        HttpSession session = request.getSession(true);
        session.setAttribute("githubAccessToken", githubAccessToken);
        User existingUser = userRepository.findByEmail(email).orElse(null);

        if (existingUser != null) {
            String token = jwtServices.generateToken(existingUser);
            String redirectUrl =
                    "http://localhost:5173/oauth-success"
                            + "?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
                            + "&role=" + URLEncoder.encode(existingUser.getRole().name(), StandardCharsets.UTF_8)
                            + "&userId=" + existingUser.getId()
                            + "&name=" + URLEncoder.encode(existingUser.getName(), StandardCharsets.UTF_8);
            response.sendRedirect(redirectUrl);

            return;
        }
        request.getSession().setAttribute("githubEmail", email);
        request.getSession().setAttribute("githubName", name != null ? name : gitHubName);
        request.getSession().setAttribute("githubUsername", gitHubName);

        response.sendRedirect("http://localhost:5173/complete-profile");

        System.out.println("GitHub User Name: "+gitHubName);
        System.out.println("GitHub Name: "+name);
        System.out.println("GitHub Email: "+email);
    }
}
