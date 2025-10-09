package com.techmatrix18.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class JwtService {

    //@Value("${jwt.secret}")
    private String secretKey = "MySuperSuperSecretKey1234567890MySuperSuperSecretKey1234567890";

    //@Value("${jwt.expiration}")
    private long expiration = 3600000; // в миллисекундах, например 86400000 = 1 день

    /**
     * Generate JWT token by username (or email)
     */
    public String generateToken(Authentication authentication) {
        String username = authentication.getName(); // get username
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Get username (subject) from token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Validating token
     */
    public boolean isTokenValid(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(username)) && !isTokenExpired(token);
    }

    /**
     * Check expired of token
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Get expired date of token
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Get one field from payload
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Generate string secret to key
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        //return Keys.hmacShaKeyFor(keyBytes);
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Autorithation by username and password
     * @param token
     * @param userDetails
     * @param request
     * @return
     */
    public UsernamePasswordAuthenticationToken getAuthentication(
            String token, UserDetails userDetails, HttpServletRequest request) {

        return new UsernamePasswordAuthenticationToken(
                userDetails, // principal
                null,        // credentials (don't need, use JWT)
                userDetails.getAuthorities() // roles, etc.
        );
    }
}

