package com.techmatrix18.repository;

import com.techmatrix18.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

/**
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findById(Long id);

    List<Role> findAll();

    Page<Role> findAll(Pageable pageable);

    Optional<Role> findByTitle(String title);

    @Query("SELECT r FROM Role r WHERE r.title LIKE %:title%")
    List<Role> findByPartTitle(@Param("title") String title);
}

