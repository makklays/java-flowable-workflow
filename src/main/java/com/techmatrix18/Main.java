package com.techmatrix18;

import com.techmatrix18.security.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/**
 * This is Main class
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 05-09-2025
 * @version 0.0.1
 */

@SpringBootApplication
public class Main {

    public static void main(String[] args) {
        System.out.println("Hello Flowable!");

        // jwt to log
        String jwtToken = PasswordGenerator.generateToken();
        //System.out.println("----------- jwtToken ---------> " + jwtToken);

        // password to log
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode("admin"); // хранить это в password
        //System.out.println("----------- password ---------> " + hashedPassword);

        SpringApplication.run(Main.class, args);
    }
}

class PasswordGenerator {
    public static String generateToken() {
        // безопасный ключ 256 бит
        String secret = "MySuperSuperSecretKey1234567890MySuperSuperSecretKey1234567890";
        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject("admin")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}

