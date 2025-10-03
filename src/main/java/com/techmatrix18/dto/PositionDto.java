package com.techmatrix18.dto;

import jakarta.validation.constraints.NotBlank;

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

