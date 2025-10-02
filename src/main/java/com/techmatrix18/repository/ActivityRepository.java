package com.techmatrix18.repository;

import com.techmatrix18.model.enums.ActivityStatus;
import com.techmatrix18.model.Activity;
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
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    Optional<Activity> findById(Long id);

    List<Activity> findAll();


// no title field in Activity
//    List<Activity> findByTitle(String title);
//
//    @Query("SELECT a FROM Activity a WHERE a.description LIKE %:title%")
//    List<Activity> findByPartTitle(@Param("title") String title);

    List<Activity> findByOwnerId(Long ownerId);

    List<Activity> findByClientIdAndStatus(Long clientId, ActivityStatus status);
}

