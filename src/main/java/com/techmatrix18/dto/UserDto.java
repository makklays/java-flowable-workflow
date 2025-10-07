package com.techmatrix18.dto;

import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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

    @NotNull(message = "Department is required")
    private Department department;

    @NotNull(message = "Position is required")
    private Position position;

    @NotNull(message = "Role is required")
    private Role role;

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

    public Department getDepartment() { return department; }

    public void setDepartment(Department department) { this.department = department; }

    public Position getPosition() { return position; }

    public void setPosition(Position position) { this.position = position; }

    public Role getRole() { return role; }

    public void setRole(Role role) { this.role = role; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getAge() { return age; }

    public void setAge(String age) { this.age = age; }

    public Boolean getIsMan() { return isMan; }

    public void setIsMan(Boolean man) { isMan = man; }

    public Boolean getIsPictureSet() { return isPictureSet; }

    public void setIsPictureSet(Boolean pictureSet) { isPictureSet = pictureSet; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }
}

