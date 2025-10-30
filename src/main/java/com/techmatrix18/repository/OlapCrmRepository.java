package com.techmatrix18.repository;

import com.techmatrix18.model.OlapCrm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * @author Alexander Kuziv
 * @since 30.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public interface OlapCrmRepository extends JpaRepository<OlapCrm, Long> {

    Optional<OlapCrm> findById(Long id);

    List<OlapCrm> findAll();

    Optional<OlapCrm> findByOwnerId(Long ownerId);

    @Query("SELECT oc FROM OlapCrm oc WHERE oc.sumAmount >= :sumAmount")
    List<OlapCrm> findByMoreSumAmount(@Param("sumAmount") BigDecimal sumAmount);

    @Query("SELECT oc FROM OlapCrm oc WHERE oc.sumAmount < :sumAmount")
    List<OlapCrm> findByLessSumAmount(@Param("sumAmount") BigDecimal sumAmount);
}

