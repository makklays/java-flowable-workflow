package com.techmatrix18.controller.web;

import com.techmatrix18.service.*;
import org.flowable.engine.RuntimeService;
//import org.flowable.task.api.TaskService;
import org.flowable.engine.TaskService;
//import org.flowable.task.service.TaskService;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.task.api.Task;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class FlowableViewController {

    Logger log = Logger.getLogger(UserViewController.class.getName());

    private final RuntimeService runtimeService;
    private final TaskService taskService;
    private final FlowableService flowableService;
    private final DepartmentService departmentService;
    private final PositionService positionService;
    private final RoleService roleService;

    public FlowableViewController(FlowableService flowableService,
                                  RuntimeService runtimeService,
                                  TaskService taskService,
                                  DepartmentService departmentService,
                                  PositionService positionService,
                                  RoleService roleService) {

        this.flowableService = flowableService;
        this.runtimeService = runtimeService;
        this.taskService = taskService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.roleService = roleService;
    }

    /**
     * get all BPMN processes of user (employee) in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/processes")
    public String addUser(Model model) {
        //model.addAttribute("processes", flowableService.getProcessesByUser("1"));

        return "flowables/processes";
    }

    /**
     * Show a form 'Job Application' about a new user (employee) in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/flowables/forms/job-application")
    public String getJobApplicationForm(Model model) {
        model.addAttribute("departments", departmentService.getAll());
        model.addAttribute("positions", positionService.getAll());
        model.addAttribute("roles", roleService.getAll());

        return "flowables/forms/job-application";
    }

    /**
     * Add a new user (employee) to CRM by BPMN process 'Employee Onboarding Process'
     *
     * @param formData
     * @return redirect
     */
    @PostMapping("/flowables/forms/job-application/submit")
    public String submitJobApplicationForm(@RequestParam Map<String, String> formData) {

        // 1 Prepare the variables
        Map<String, Object> variables = new HashMap<>(formData);

        System.out.println("---------> " + variables.toString());

        // 2️ Start the process and store the ProcessInstance object
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceByKey("jobApplication", variables);

        // 3️ Get the first task of this process
        Task task = taskService.createTaskQuery()
                .processInstanceId(processInstance.getId())
                .singleResult(); // first task of process

        if (task != null) {
            // 4 Complete current task
            taskService.complete(task.getId(), variables);
        }

        return "redirect:/processes";
    }

    /**
     * Show a form 'Leave Application' about a leave user (employee) in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/flowables/forms/leave-application")
    public String getLeaveApplicationForm(Model model) {
        model.addAttribute("departments", departmentService.getAll());
        model.addAttribute("positions", positionService.getAll());
        model.addAttribute("roles", roleService.getAll());

        return "flowables/forms/leave-application";
    }

    /**
     * Show a form 'Fire Application' about a leave user (employee) in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/flowables/forms/fire-application")
    public String getFireApplicationForm(Model model) {
        model.addAttribute("departments", departmentService.getAll());
        model.addAttribute("positions", positionService.getAll());
        model.addAttribute("roles", roleService.getAll());

        return "flowables/forms/fire-application";
    }
}

