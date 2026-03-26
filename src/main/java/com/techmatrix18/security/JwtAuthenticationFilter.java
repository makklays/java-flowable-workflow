package com.techmatrix18.security;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, CustomUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        //System.out.println("-------> JWT Filter hit: " + request.getRequestURI() + " | Authorization: " + request.getHeader("Authorization"));

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);

            try {
                username = jwtService.extractUsername(token);
            } catch (ExpiredJwtException e) {
                // Ошибка протухшего токена — возвращаем 401
                // Ловим ВСЕ ошибки: ExpiredJwtException, MalformedJwtException, SignatureException
                // Просто логируем и НЕ вызываем return!
                System.err.println("JWT Error: " + e.getMessage());
                // Мы не устанавливаем username, поэтому проверка (username != null) ниже не сработает
                //return;
            } catch (Exception e) {
                // ЛЮБАЯ другая ошибка (кривая подпись, невалидный формат)
                // ВАЖНО: просто логируем и НЕ вызываем return,
                // чтобы запрос пошел дальше как анонимный (сработает permitAll)
                System.out.println("JWT parse error: " + e.getMessage());
            }
        }


        //System.out.println("------ username ---> " + username);
        //System.out.println("------ token ---> " + token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            //System.out.println("------ userDetails ---> " + String.valueOf(userDetails));

            if (jwtService.isTokenValid(token, userDetails.getUsername())) {

                //System.out.println("------> jwt token is_valid ");

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                //System.out.println("---------> JWT valid for user: " + authentication.getName());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}

