package com.techmatrix18.dto;

import com.techmatrix18.model.Client;
import com.techmatrix18.model.Contact;
import com.techmatrix18.enums.ActivityStatus;
import com.techmatrix18.enums.ActivityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ActivityDto {

    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Client is required")
    private Client client;

    @NotNull(message = "Contact is required")
    private Contact contact;

    @NotNull(message = "Type is required")
    private ActivityType type;

    private String description;

    @NotBlank(message = "DateTime is required")
    private String dateTime;

    @NotNull(message = "Status is required")
    private ActivityStatus status;

    // constructors

    private ActivityDto() { }

    public static class Builder {
        private Long id;
        private String title;
        private Client client;
        private Contact contact;
        private ActivityType type;
        private String description;
        private String dateTime;
        private ActivityStatus status;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder client(Client client) { this.client = client; return this; }
        public Builder contact(Contact contact) { this.contact = contact; return this; }
        public Builder type(ActivityType type) { this.type = type; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder dateTime(String dateTime) { this.dateTime = dateTime; return this; }
        public Builder status(ActivityStatus status) { this.status = status; return this; }
        public ActivityDto build() {
            ActivityDto dto = new ActivityDto();
            dto.id = this.id;
            dto.title = this.title;
            dto.client = this.client;
            dto.contact = this.contact;
            dto.type = this.type;
            dto.description = this.description;
            dto.dateTime = this.dateTime;
            dto.status = this.status;
            return dto;
        }
    }

    // getters/setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Client getClient() { return client; }

    public void setClient(Client client) { this.client = client; }

    public Contact getContact() { return contact; }

    public void setContact(Contact contact) { this.contact = contact; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public ActivityType getType() { return type; }

    public void setType(ActivityType type) { this.type = type; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public String getDateTime() { return dateTime; }

    public void setDateTime(String dateTime) { this.dateTime = dateTime; }

    public ActivityStatus getStatus() { return status; }

    public void setStatus(ActivityStatus status) { this.status = status; }
}

