package com.techmatrix18.dto;

import com.techmatrix18.model.Client;
import com.techmatrix18.model.Contact;
import com.techmatrix18.model.enums.ActivityStatus;
import com.techmatrix18.model.enums.ActivityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ActivityDto {

    private Long id;

    @NotNull(message = "Client is required")
    private Client client;

    @NotNull(message = "Contact is required")
    private Contact contact;

    private ActivityType type;

    private String description;

    @NotBlank(message = "DateTime is required")
    private String dateTime;

    private ActivityStatus status;

    // getters/setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Client getClient() { return client; }

    public void setClient(Client client) { this.client = client; }

    public Contact getContact() { return contact; }

    public void setContact(Contact contact) { this.contact = contact; }

    public ActivityType getType() { return type; }

    public void setType(ActivityType type) { this.type = type; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getDateTime() { return dateTime; }

    public void setDateTime(String dateTime) { this.dateTime = dateTime; }

    public ActivityStatus getStatus() { return status; }

    public void setStatus(ActivityStatus status) { this.status = status; }
}

