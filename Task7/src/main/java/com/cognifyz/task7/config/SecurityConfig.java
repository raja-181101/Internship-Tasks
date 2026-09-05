    package com.cognifyz.task7.config;

    import com.cognifyz.task7.Security.JwtAuthenticationFilter;
    import com.cognifyz.task7.Security.OAuth2LoginSuccessHandler;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.HttpMethod;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

    import java.util.List;

    @Configuration
    public class SecurityConfig {
        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

        public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler) {
            this.jwtAuthenticationFilter = jwtAuthenticationFilter;
            this.oAuth2LoginSuccessHandler = oAuth2LoginSuccessHandler;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
            http.cors(cors->cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf-> csrf.disable())
                    .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                    .authorizeHttpRequests(auth-> auth
                            .requestMatchers("/api/auth/**").permitAll()
                            .requestMatchers(HttpMethod.POST,"/api/users").permitAll()
                            .requestMatchers(HttpMethod.GET,"/api/users").hasRole("ADMIN")
                            .requestMatchers(HttpMethod.DELETE,"/api/users/**").hasAnyRole("USER","ADMIN")
                            .requestMatchers(HttpMethod.GET,"/api/users/**").hasAnyRole("USER","ADMIN")
                            .requestMatchers(HttpMethod.PUT,"/api/users/**").hasAnyRole("USER","ADMIN")
                            .anyRequest().authenticated())
                    .oauth2Login(oauth->oauth.successHandler(oAuth2LoginSuccessHandler))
                    .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

            return http.build();
        }

        public CorsConfigurationSource corsConfigurationSource(){
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(List.of("http://localhost:5173"));
            configuration.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
            configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**",configuration);
            return source;
        }
    }
