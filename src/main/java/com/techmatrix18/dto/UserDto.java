package com.techmatrix18.dto;

import jakarta.validation.constraints.NotBlank;

public class UserDto {

    private Long id;

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Firstname is required")
    private String firstname;

    @NotBlank(message = "Lastname is required")
    private String lastname;

    @NotBlank(message = "Displayname is required")
    private String displayname;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String age;

    private Boolean isMan;

    private Boolean isPictureSet;

    private String address;

    // getters/setters

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFirstname() { return firstname; }

    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }

    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getDisplayname() { return displayname; }

    public void setDisplayname(String displayname) { this.displayname = displayname; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getAge() { return age; }

    public void setAge(String age) { this.age = age; }

    public Boolean getMan() { return isMan; }

    public void setMan(Boolean man) { isMan = man; }

    public Boolean getPictureSet() { return isPictureSet; }

    public void setPictureSet(Boolean pictureSet) { isPictureSet = pictureSet; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }
}

