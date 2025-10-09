package com.techmatrix18.security;

import com.techmatrix18.model.User;
import com.techmatrix18.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        //System.out.println("--------------- username ---------------> " + username);
        //System.out.println("--------------- user ---------------> " + user.toString());

        // Transform User to UserDetails
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .authorities(user.getRole().getTitle()) // add roles, etc.
                .build();
    }
}

