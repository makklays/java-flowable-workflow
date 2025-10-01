package com.techmatrix18.repository;

import com.techmatrix18.model.Client;
import com.techmatrix18.model.Deal;
import com.techmatrix18.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * @author Alexander Kuziv
 * @since 01.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findById(Long id);

    List<Client> findAll();

    List<Client> findByLastname(String lastname);

    Optional<Client> findByEmail(String email);

    Optional<Client> findByPhone(String phone);

    @Query("SELECT c FROM Client c WHERE c.phone LIKE %:phone%")
    List<User> findByPartPhone(@Param("phone") String phone);

    @Query("SELECT c FROM Client c WHERE u.email LIKE %:email%")
    List<User> findByPartEmail(@Param("email") String email);

    @Query("SELECT c FROM Client c WHERE c.lastname LIKE %:lastname%")
    List<User> findByPartLastname(@Param("lastname") String lastname);

    List<Deal> findByOwnerId(Long ownerId);
}

