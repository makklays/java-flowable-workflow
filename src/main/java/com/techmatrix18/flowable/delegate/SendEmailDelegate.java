package com.techmatrix18.flowable.delegate;

import com.techmatrix18.service.UserService;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service("sendEmailDelegate")
public class SendEmailDelegate implements JavaDelegate {
    private final UserService userService;

    public SendEmailDelegate(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void execute(DelegateExecution execution) {
        String email = (String) execution.getVariable("email");
        userService.sendWelcomeEmail(email);
    }
}

