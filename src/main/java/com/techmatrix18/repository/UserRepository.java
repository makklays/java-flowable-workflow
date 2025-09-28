package com.techmatrix18.repository;

import com.techmatrix18.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);

    List<User> findAll();

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    @Query("SELECT u FROM User u WHERE u.phone LIKE %:phone%")
    List<User> findByPartPhone(@Param("phone") String phone);

    @Query("SELECT u FROM User u WHERE u.email LIKE %:email%")
    List<User> findByPartEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE u.username LIKE %:username%")
    List<User> findByPartUsername(@Param("username") String username);
}

