package com.techmatrix18.controller.web;

import com.techmatrix18.model.OlapCrm;
import com.techmatrix18.service.*;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.TemplateEngine;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import org.thymeleaf.context.Context;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
    private final OlapCrmService olapCrmService;

    public ReportViewController(ActivityService activityService,
                                ContactService contactService,
                                DealService dealService,
                                RedisService redisService,
                                TemplateEngine templateEngine,
                                OlapCrmService olapCrmService) {
        this.activityService = activityService;
        this.contactService = contactService;
        this.dealService = dealService;
        this.redisService = redisService;
        this.templateEngine = templateEngine;
        this.olapCrmService = olapCrmService;
    }

    @GetMapping("/reports")
    @ResponseBody
    public String allReports(Model model, HttpServletRequest request,
                             HttpServletResponse response,
                             Map<String, Object> variables) {

        //String cachedPage = redisService.getValue("reports:index");
        String cachedPage = null;

        if (cachedPage != null) {
            log.info("Returning cached HTML");
            return cachedPage; // Возвращаем закэшированное
        }

        // get data for the report
        List<OlapCrm> report = olapCrmService.getAll();
        //model.addAttribute("report", report);

        // Generate HTML using Thymeleaf
        Context context = new Context();
        context.setVariables(variables);
        context.setVariable("report", report);
        String html = templateEngine.process("reports/index", context);

        // Save in Redis
        redisService.saveValue("reports:index", html);
        log.info("Returning HTML");

        return html;
    }

    @GetMapping("/reports/report-crm")
    public String reportCrm(Model model) {
        List<OlapCrm> report = olapCrmService.getAll();
        model.addAttribute("report", report);
        return "reports/report-crm";
    }
}

