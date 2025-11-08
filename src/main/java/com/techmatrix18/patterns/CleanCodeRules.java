package com.techmatrix18.patterns;

import com.techmatrix18.model.User;
import com.techmatrix18.service.UserService;
import java.util.Collections;
import java.util.List;

/**
 * Clear Code class
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 08-11-2025
 * @version 0.0.1
 */

public class CleanCodeRules {

    private final UserService userService;
    public CleanCodeRules(UserService userService) {
        this.userService = userService;
    }

    public List<User> getUsersByPartPhone(String partPhone) {
        if (partPhone == null) {
            return Collections.emptyList();
        }

        List<User> users = userService.getUsersByPartPhone(partPhone);
        return users != null ? users : Collections.emptyList();
    }
}

/*
for (String user : cleanCodeRules.getUsersByPartPhone("098")) {
    System.out.println(user);
}
*/

