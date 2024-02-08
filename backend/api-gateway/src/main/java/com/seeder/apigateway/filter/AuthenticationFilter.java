package com.seeder.apigateway.filter;

import com.seeder.apigateway.exception.UnauthorizedAccessException;
import com.seeder.apigateway.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthenticationFilter
        extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (
                (exchange, chain) -> {
                    String requestPath = exchange.getRequest().getURI().getPath();

                    if (shouldSkipAuthentication(requestPath)) {
                        return chain.filter(exchange);
                    }
                    if (validator.isSecured.test(exchange.getRequest())) {
                        if (
                                !exchange
                                        .getRequest()
                                        .getHeaders()
                                        .containsKey(HttpHeaders.AUTHORIZATION)
                        ) {
                            throw new UnauthorizedAccessException(
                                    "Authorization header is not present"
                            );
                        }
                        String authHeader = exchange
                                .getRequest()
                                .getHeaders()
                                .get(HttpHeaders.AUTHORIZATION)
                                .get(0);
                        if (authHeader != null && authHeader.startsWith("Bearer ")) {
                            authHeader = authHeader.substring(7);
                        }

                        try {
                            jwtUtil.validateToken(authHeader);
                        } catch (Exception ex) {
                            log.error("invalid access...!");
                            throw new UnauthorizedAccessException(
                                    "Missing authorization header"
                            );
                        }
                    }
                    return chain.filter(exchange);
                }
        );
    }

    private boolean shouldSkipAuthentication(String requestPath) {
        String excludedPattern1 = "/api/v1/users/signup";
        String excludedPattern2 = "/api/v1/users/login";
        String excludePattern3 = "/reset-password";
        return requestPath.endsWith(excludedPattern1) || requestPath.endsWith(excludedPattern2)|| requestPath.endsWith(excludePattern3);
    }
    public static class Config {
    }
}
