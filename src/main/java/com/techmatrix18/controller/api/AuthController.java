package com.techmatrix18.controller.api;

import com.techmatrix18.security.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"}) // Разрешает запросы с твоего фронта
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        //log.info("-------------------------- Username ---> " + username);
        //log.info("-------------------------- Password ---> " + password);

        // Authentication of the user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        // Используем модель с полем userId (добавленое поле для расширения данных для frontend в Local Storage)
        com.techmatrix18.security.CustomUserDetails userDetails = (com.techmatrix18.security.CustomUserDetails) authentication.getPrincipal();

        //log.info("Authenticated? {}", authentication.isAuthenticated());

        // Generation JWT
        String token = jwtService.generateToken(authentication);

        // Return the token as JSON
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("username", userDetails.getUsername());

        response.put("id", String.valueOf(userDetails.getId()));

        // Получаем роль (обычно это первый элемент в Authorities)
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("USER");
        response.put("role", role);

        // Можно добавить любое другое поле, например время входа
        response.put("loginTime", LocalDateTime.now().toString());

        return ResponseEntity.ok(response);
    }
}

