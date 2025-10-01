package com.techmatrix18.repository;

import com.techmatrix18.model.Contact;
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
public interface ContactRepository extends JpaRepository<Contact, Long> {

    Optional<Contact> findById(Long id);

    List<Contact> findAll();

    List<Contact> findByFirstname(String firstname);

    List<Contact> findByLastname(String lastname);

    Optional<Contact> findByEmail(String email);

    Optional<Contact> findByPhone(String phone);

    @Query("SELECT c FROM Contact c WHERE c.phone LIKE %:phone%")
    List<Contact> findByPartPhone(@Param("phone") String phone);

    @Query("SELECT c FROM Contact c WHERE u.email LIKE %:email%")
    List<Contact> findByPartEmail(@Param("email") String email);

    @Query("SELECT c FROM Contact c WHERE c.firstname LIKE %:firstname%")
    List<Contact> findByPartFirstname(@Param("firstname") String firstname);

    @Query("SELECT c FROM Contact c WHERE c.lastname LIKE %:lastname%")
    List<Contact> findByPartLastname(@Param("lastname") String lastname);
}

