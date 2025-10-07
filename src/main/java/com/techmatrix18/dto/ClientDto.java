package com.techmatrix18.dto;

import com.techmatrix18.model.enums.ClientType;
import jakarta.validation.constraints.NotBlank;

public class ClientDto {

    private Long id;

    @NotBlank(message = "Firstname is required")
    private String firstname;

    @NotBlank(message = "Lastname is required")
    private String lastname;

    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    private ClientType type;

    @NotBlank(message = "Source is required")
    private String source;

    private String tags;

    // getters/setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFirstname() { return firstname; }

    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }

    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getCompany() { return company; }

    public void setCompany(String company) { this.company = company; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public ClientType getType() { return type; }

    public void setType(ClientType type) { this.type = type; }

    public String getSource() { return source; }

    public void setSource(String source) { this.source = source; }

    public String getTags() { return tags; }

    public void setTags(String tags) { this.tags = tags; }
}

