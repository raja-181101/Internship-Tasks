package com.cognifyz.task8.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        long startTime = System.currentTimeMillis();
        String requestId = UUID.randomUUID().toString();
        response.setHeader("X-Request-ID", requestId);
        response.setHeader("Access-Control-Expose-Headers", "X-Request-ID");
        logger.info(
                "Incoming Request | ID={} | Method={} | URI={}",
                requestId,
                request.getMethod(),
                request.getRequestURI()
        );
        try {
            filterChain.doFilter(request, response);
        } finally {
            long executionTime = System.currentTimeMillis() - startTime;

            logger.info(
                    "Completed Request | ID={} | Status={} | Time={}ms",
                    requestId,
                    response.getStatus(),
                    executionTime
            );
        }
    }

}
