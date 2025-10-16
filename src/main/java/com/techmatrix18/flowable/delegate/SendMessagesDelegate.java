package com.techmatrix18.flowable.delegate;

import com.techmatrix18.controller.web.UserViewController;
import com.techmatrix18.service.SlackService;
import com.techmatrix18.service.TelegramService;
import com.techmatrix18.service.UserService;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;
import java.util.logging.Logger;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.2
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

    @Override
    public void execute(DelegateExecution execution) {
        String email = (String) execution.getVariable("email");
        String displayname = (String) execution.getVariable("displayname");
        String department = (String) execution.getVariable("department");
        String position = (String) execution.getVariable("position");
        String age = (String) execution.getVariable("age");

        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        log.info(formattedDateTime + " - 📧 Sending welcome email to: " + email + " (" + displayname + ")");

        // userService.sendWelcomeEmail(email);
        // telegramService.sendMessage("Welcome " + displayname + " (" + email + ")");
        slackService.sendSlackMessage(":rocket:" + formattedDateTime + " - 📧 Registered across BPMN process 'Job Application' a new employee in CRM: " + displayname + " - Department: " + department + ", " + position+ ", age: " + age);
    }
}

