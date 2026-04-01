package com.techmatrix18.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Position Dto
 *
 * @author Alexander Kuziv
 * @since 01.04.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
public class PositionDto {

    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    // getters/setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

