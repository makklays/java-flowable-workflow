package com.techmatrix18.flowable.delegate;

import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.User;
import com.techmatrix18.service.SlackService;
import com.techmatrix18.service.TelegramService;
import com.techmatrix18.service.UserService;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.logging.Logger;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.3
 */

@Service("sendMessagesDelegate")
public class SendMessagesDelegate implements JavaDelegate {

    Logger log = Logger.getLogger(SendMessagesDelegate.class.getName());

    private final UserService userService;
    private final TelegramService telegramService;
    private final SlackService slackService;

    public SendMessagesDelegate(UserService userService, TelegramService telegramService, SlackService slackService) {
        this.userService = userService;
        this.telegramService = telegramService;
        this.slackService = slackService;
    }

    /**
     * Delegate execution for registering a new employee from the "Job Application" BPMN process.
     *
     * @param execution the {@link DelegateExecution} containing process variables from the BPMN process
     */
    @Override
    public void execute(DelegateExecution execution) {
        // variables
        String username = (String) execution.getVariable("username");
        String firstname = (String) execution.getVariable("firstname");
        String lastname = (String) execution.getVariable("lastname");
        String displayname = (String) execution.getVariable("displayname");
        String department = (String) execution.getVariable("department");
        String position = (String) execution.getVariable("position");
        String role = (String) execution.getVariable("role");
        String email = (String) execution.getVariable("email");
        String phone = (String) execution.getVariable("phone");
        String isMan = (String) execution.getVariable("isMan");
        String isPictureSet = (String) execution.getVariable("isPictureSet");
        String age = (String) execution.getVariable("age");
        String address = (String) execution.getVariable("address");
        String password = (String) execution.getVariable("password");

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        log.info(formattedDateTime + " - 📧 Sending welcome email to: " + email + " (" + displayname + ")");

        // department
        Department departmentObj = new Department();
        departmentObj.setTitle(department);

        // position
        Position positionObj = new Position();
        positionObj.setTitle(position);

        // role
        Role roleObj = new Role();
        roleObj.setTitle(role);

        // user
        User user = new User();
        user.setUsername(username);
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setDisplayname(displayname);
        user.setDepartment(departmentObj);
        user.setPosition(positionObj);
        user.setRole(roleObj);
        user.setTenantId("1");
        user.setPhone(phone);
        user.setEmail(email);
        user.setAge(age);
        user.setMan(Boolean.parseBoolean(isMan));
        user.setPictureSet(Boolean.parseBoolean(isPictureSet));
        user.setAddress(address);
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode( password ));
        user.setStartWorkAt(LocalDate.now());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        // save User in database
        userService.addUser(user);

        // send messages
        // userService.sendWelcomeEmail(email);
        // telegramService.sendMessage("Welcome " + displayname + " (" + email + ")");
        slackService.sendSlackMessage(":rocket:" + formattedDateTime + " - 📧 Registered across BPMN process 'Job Application' a new employee in CRM: " + displayname + " - Department: " + department + ", " + position+ ", age: " + age);
    }
}

