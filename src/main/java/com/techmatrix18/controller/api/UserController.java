package com.techmatrix18.controller.api;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.RestController;
import java.util.logging.Logger;

/**
 * Controller for registering users in the system.
 * Processes HTTP-requests, related to user registration.
 *
 * @author Alexander Kuziv
 * @since 30.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Users", description = "User management API")
public class UserController {

    Logger log = Logger.getLogger(UserController.class.getName());
}

