package com.techmatrix18.flowable.delegate;

import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.User;
import com.techmatrix18.service.DepartmentService;
import com.techmatrix18.service.PositionService;
import com.techmatrix18.service.RoleService;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;
import com.techmatrix18.service.UserService;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service("createEmployeeDelegate")
public class CreateEmployeeDelegate implements JavaDelegate {
    private final UserService userService;
    private final DepartmentService departmentService;
    private final PositionService positionService;
    private final RoleService roleService;

    public CreateEmployeeDelegate(UserService userService,
                                  DepartmentService departmentService,
                                  PositionService positionService,
                                  RoleService roleService) {

        this.userService = userService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.roleService = roleService;
    }

    @Override
    public void execute(DelegateExecution execution) {

        // get variables
        String username = (String) execution.getVariable("username");
        String firstname = (String) execution.getVariable("firstname");
        String lastname = (String) execution.getVariable("lastname");
        String displayname = (String) execution.getVariable("displayname");
        String positionId = (String) execution.getVariable("position_id");
        String departmentId = (String) execution.getVariable("department_id");
        String roleId = (String) execution.getVariable("role_id");
        String email = (String) execution.getVariable("email");
        String phone = (String) execution.getVariable("phone");
        Double salary = (Double) execution.getVariable("salary");
        String age = (String) execution.getVariable("age");
        String isMan = (String) execution.getVariable("isMan");
        String isPictureSet = (String) execution.getVariable("isPictureSet");
        String address = (String) execution.getVariable("address");

        Department department = departmentService.getById(Long.valueOf(departmentId));
        Position position = positionService.getById(Long.valueOf(positionId));
        Role role = roleService.getById(Long.valueOf(roleId));

        // ad a new user (employee) to CRM
        User user = new User();
        user.setUsername(username);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setDisplayname(displayname);
        user.setDepartment(department);
        user.setPosition(position);
        user.setRole(role);
        user.setEmail(email);
        user.setPhone(phone);
        //user.setSalary(salary);
        user.setAge(age);
        user.setMan(Boolean.getBoolean(isMan));
        user.setPictureSet(Boolean.getBoolean(isPictureSet));
        user.setAddress(address);
        user.setStartWorkAt(LocalDate.now());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        userService.addUser(user);

        execution.setVariable("status", "created");
    }
}

