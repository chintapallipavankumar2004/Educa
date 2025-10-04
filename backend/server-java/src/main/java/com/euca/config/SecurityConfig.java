package com.euca.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
    http.csrf().disable(); // CSRF protection can be added later; for API usage with same-site cookies, evaluate options
    // Allow API endpoints and H2 console (dev) without authentication
    http.authorizeHttpRequests((auth) -> auth
        .requestMatchers(new AntPathRequestMatcher("/api/**"))
        .permitAll()
        .requestMatchers(new AntPathRequestMatcher("/h2-console/**"))
        .permitAll()
    );
    // Allow H2 console frames
    http.headers().frameOptions().sameOrigin();
        http.httpBasic(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    public CookieSerializer cookieSerializer(){
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setCookieName("session_cookie_name");
        serializer.setUseHttpOnlyCookie(true);
        serializer.setSameSite("Lax");
        serializer.setUseSecureCookie(false);
        return serializer;
    }
}
