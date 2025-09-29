package com.techmatrix18.config;

import com.techmatrix18.service.CustomIdentityService;
import org.springframework.context.annotation.Configuration;

/**
 * Конфигурация Flowable
 * В этом учебном проекте IdentityService не нужен,
 * поэтому конфигурация пустая. Spring Boot Starter сам создаёт движок.
 *
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Configuration
public class FlowableConfig {

    private final CustomIdentityService customIdentityService;

    public FlowableConfig(CustomIdentityService customIdentityService) {
        this.customIdentityService = customIdentityService;
    }
}

