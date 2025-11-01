package com.techmatrix18.service;

import com.techmatrix18.model.OlapCrm;
import com.techmatrix18.repository.OlapCrmRepository;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * @author Alexander Kuziv
 * @since 30.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class OlapCrmService {
    private final OlapCrmRepository olapCrmRepository;

    public OlapCrmService(OlapCrmRepository olapCrmRepository) {
        this.olapCrmRepository = olapCrmRepository;
    }

    public OlapCrm getById(Long id) {
        return olapCrmRepository.findById(id).orElse(null);
    }

    public OlapCrm getByOwnerId(Long ownerId) {
        return olapCrmRepository.findByOwnerId(ownerId).orElse(null);
    }

    public List<OlapCrm> getAll() {
        return olapCrmRepository.findAll();
    }

    public List<OlapCrm> getByMoreSumAmount(java.math.BigDecimal sumAmount) {
        return olapCrmRepository.findByMoreSumAmount(sumAmount);
    }

    public List<OlapCrm> getByLessSumAmount(java.math.BigDecimal sumAmount) {
        return olapCrmRepository.findByLessSumAmount(sumAmount);
    }

    public OlapCrm save(OlapCrm olapCrm) {
        return olapCrmRepository.save(olapCrm);
    }

    public OlapCrm deleteById(Long id) {
        OlapCrm olapCrm = getById(id);
        olapCrmRepository.deleteById(id);
        return olapCrm;
    }
}

