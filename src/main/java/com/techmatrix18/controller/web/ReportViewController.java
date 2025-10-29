package com.techmatrix18.controller.web;

import com.techmatrix18.service.ActivityService;
import com.techmatrix18.service.ContactService;
import com.techmatrix18.service.DealService;
import com.techmatrix18.service.RedisService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.TemplateEngine;
import java.util.Locale;
import java.util.Map;
import java.util.logging.Logger;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.WebContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.thymeleaf.web.IWebExchange;

import org.thymeleaf.context.WebContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;


/**
 * Report controller with endpoints for reports pages and
 * 'olap_' column's tables in DB (by Martin Kleppman's book Designing Data-Intensive Applications)
 *
 * @author Alexander Kuziv
 * @since 29.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class ReportViewController {

    Logger log = Logger.getLogger(RoleViewController.class.getName());

    private final ActivityService activityService;
    private final ContactService contactService;
    private final DealService dealService;
    private final RedisService redisService;
    private final TemplateEngine templateEngine;

    public ReportViewController(ActivityService activityService,
                                ContactService contactService,
                                DealService dealService,
                                RedisService redisService,
                                TemplateEngine templateEngine) {
        this.activityService = activityService;
        this.contactService = contactService;
        this.dealService = dealService;
        this.redisService = redisService;
        this.templateEngine = templateEngine;
    }

    @GetMapping("/reports")
    @ResponseBody
    public String allReports(HttpServletRequest request,
                             HttpServletResponse response,
                             Map<String, Object> variables) {

        String cachedPage = redisService.getValue("reports:index");

        if (cachedPage != null) {
            log.info("Returning cached HTML");
            return cachedPage; // Возвращаем закэшированное
        }

        // Генерируем HTML с помощью Thymeleaf
        //WebContext context = new WebContext(request, response, request.getServletContext(), request.getLocale(), variables);
        Context context = new Context();
        context.setVariables(variables);
        String html = templateEngine.process("reports/index", context);

        // Сохраняем в Redis
        redisService.saveValue("reports:index", html);
        log.info("Returning HTML");

        return html;
    }
}

