package com.techmatrix18.repository;

import com.techmatrix18.model.Department;
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
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findById(Long id);

    List<Department> findAll();

    Optional<Department> findByTitle(String title);

    @Query("SELECT d FROM Department d WHERE d.title LIKE %:title%")
    List<Department> findByPartTitle(@Param("title") String title);
}

