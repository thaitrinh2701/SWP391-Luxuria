package com.luxuria.configurations;

import com.luxuria.filters.JwtTokenFilter;
import com.luxuria.models.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtTokenFilter jwtTokenFilter;
    private final LogoutHandler logoutHandler;

    @Value("${api.prefix}")
    private String apiPrefix;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests((requests) ->
                        requests
                                .requestMatchers(
                                        String.format("%s/users/register", apiPrefix),
                                        String.format("%s/users/login", apiPrefix),
                                        String.format("%s/users/logout", apiPrefix),
                                        String.format("%s/users/forgot_password", apiPrefix),
                                        String.format("%s/users/reset_password**", apiPrefix),
                                        String.format("%s/roles/token", apiPrefix),
                                        String.format("%s/products", apiPrefix),
                                        String.format("%s/products/no_images", apiPrefix),
                                        String.format("%s/products/no_images/{product_id}", apiPrefix),
                                        String.format("%s/products/{product_id}", apiPrefix),
                                        String.format("%s/products/category/{category_id}", apiPrefix),
                                        String.format("%s/product_data", apiPrefix),
                                        String.format("%s/product_data/**", apiPrefix),
                                        String.format("%s/gold_price", apiPrefix)
                                ).permitAll()
                                .requestMatchers(GET,
                                        String.format("%s/users/view_all", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(POST,
                                        String.format("%s/users/create", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/users/update/{user_id}", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/users/delete/{user_id}", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(POST,
                                        String.format("%s/users/create", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/users/change_profile", apiPrefix))
                                .hasAnyRole(Role.CUSTOMER, Role.SALES_STAFF, Role.DESIGN_STAFF, Role.PRODUCTION_STAFF, Role.MANAGER, Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/users/change_password", apiPrefix))
                                .hasAnyRole(Role.CUSTOMER, Role.SALES_STAFF, Role.DESIGN_STAFF, Role.PRODUCTION_STAFF, Role.MANAGER, Role.ADMIN)
                                .requestMatchers(GET,
                                        String.format("%s/requests/view_all", apiPrefix)).hasRole(Role.SALES_STAFF)
                                .requestMatchers(GET,
                                        String.format("%s/requests/my_requests", apiPrefix)).hasRole(Role.CUSTOMER)
                                .requestMatchers(POST,
                                        String.format("%s/requests/make_request", apiPrefix)).hasRole(Role.CUSTOMER)
                                .requestMatchers(PUT,
                                        String.format("%s/requests/cancel_request/**", apiPrefix)).hasRole(Role.CUSTOMER)
                                .requestMatchers(PUT,
                                        String.format("%s/requests/approve_request/**", apiPrefix)).hasRole(Role.SALES_STAFF)
                                .requestMatchers(POST,
                                        String.format("%s/orders/create_order/{request_id}", apiPrefix)).hasRole(Role.SALES_STAFF)
                                .requestMatchers(POST,
                                        String.format("%s/orders/edit_order/{order_id}", apiPrefix)).hasRole(Role.SALES_STAFF)
                                .requestMatchers(GET,
                                        String.format("%s/orders/my_orders", apiPrefix)).hasRole(Role.CUSTOMER)
                                .requestMatchers(GET,
                                        String.format("%s/orders/view_order/**", apiPrefix))
                                .hasAnyRole(Role.CUSTOMER, Role.SALES_STAFF, Role.DESIGN_STAFF, Role.PRODUCTION_STAFF, Role.MANAGER, Role.ADMIN)
                                .requestMatchers(GET,
                                        String.format("%s/orders/view_all_orders", apiPrefix))
                                .hasAnyRole(Role.SALES_STAFF, Role.DESIGN_STAFF, Role.PRODUCTION_STAFF, Role.MANAGER, Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/orders/submit_price_quote/{order_id}", apiPrefix)).hasRole(Role.SALES_STAFF)
                                .requestMatchers(PUT,
                                        String.format("%s/orders/manager_price_quote/**", apiPrefix)).hasRole(Role.MANAGER)
                                .requestMatchers(PUT,
                                        String.format("%s/orders/customer_price_quote/**", apiPrefix)).hasRole(Role.CUSTOMER)
                                .requestMatchers(POST,
                                        String.format("%s/orders/submit_design/{order_id}", apiPrefix)).hasRole(Role.DESIGN_STAFF)
                                .requestMatchers(GET,
                                        String.format("%s/product_data/**", apiPrefix))
                                .hasAnyRole(Role.CUSTOMER, Role.SALES_STAFF, Role.DESIGN_STAFF, Role.PRODUCTION_STAFF, Role.MANAGER, Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/orders/approve_design/**", apiPrefix)).hasRole(Role.CUSTOMER)
                                .requestMatchers(PUT,
                                        String.format("%s/orders/complete_product/{order_id}", apiPrefix)).hasRole(Role.PRODUCTION_STAFF)
                                .requestMatchers(POST,
                                        String.format("%s/warranties/create_warranty", apiPrefix)).hasRole(Role.SALES_STAFF)
                                .requestMatchers(PUT,
                                        String.format("%s/orders/complete_order/{order_id}", apiPrefix)).hasRole(Role.SALES_STAFF)
                                .requestMatchers(POST,
                                        String.format("%s/products/create", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/products/update/{product_id}", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(PUT,
                                        String.format("%s/products/update_images/{product_id}", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(DELETE,
                                        String.format("%s/products/delete/{product_id}", apiPrefix)).hasRole(Role.ADMIN)
                                .requestMatchers(GET,
                                        String.format("%s/order_state_histories/{order_id}", apiPrefix))
                                .hasAnyRole(Role.CUSTOMER, Role.SALES_STAFF, Role.DESIGN_STAFF, Role.PRODUCTION_STAFF, Role.MANAGER, Role.ADMIN)
                                .anyRequest().authenticated())
                .logout((logout) -> {
                    logout.logoutUrl("api/v1/users/logout")
                            .addLogoutHandler(logoutHandler)
                            .logoutSuccessHandler(
                                    (request, response, authentication) ->
                                            SecurityContextHolder.clearContext());
                });

        http.cors(new Customizer<CorsConfigurer<HttpSecurity>>() {
            @Override
            public void customize(CorsConfigurer<HttpSecurity> httpSecurityCorsConfigurer) {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowedOrigins(List.of("*"));
                configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token", "newPassword"));
                configuration.setExposedHeaders(List.of("x-auth_token"));
                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                httpSecurityCorsConfigurer.configurationSource(source);
            }
        });

        return http.build();
    }


}
