package com.techmatrix18.controller.web;

import com.techmatrix18.model.Department;
import com.techmatrix18.model.Position;
import com.techmatrix18.model.Role;
import com.techmatrix18.model.User;
import com.techmatrix18.service.*;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
//import org.flowable.task.api.TaskService;
import org.flowable.engine.TaskService;
//import org.flowable.task.service.TaskService;
import org.flowable.engine.repository.ProcessDefinition;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.task.api.Task;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.2
 */

@Controller
public class FlowableViewController {

    Logger log = Logger.getLogger(UserViewController.class.getName());

    private final RuntimeService runtimeService;
    private final TaskService taskService;
    private final RepositoryService repositoryService;
    private final FlowableService flowableService;
    private final DepartmentService departmentService;
    private final PositionService positionService;
    private final RoleService roleService;
    private final UserService userService;

    public FlowableViewController(FlowableService flowableService,
                                  RuntimeService runtimeService,
                                  TaskService taskService,
                                  RepositoryService repositoryService,
                                  DepartmentService departmentService,
                                  PositionService positionService,
                                  RoleService roleService,
                                  UserService userService) {

        this.flowableService = flowableService;
        this.runtimeService = runtimeService;
        this.taskService = taskService;
        this.repositoryService = repositoryService;
        this.departmentService = departmentService;
        this.positionService = positionService;
        this.roleService = roleService;
        this.userService = userService;
    }

    /**
     * Get all BPMN processes of user (employee) in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/processes")
    public String addUser(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        User user = userService.getUserByUsername(userDetails.getUsername());
        model.addAttribute("user", user);

        List<Task> tasks = taskService.createTaskQuery()
                .taskAssignee(String.valueOf(user.getId())) // по user_id
                .list();
        model.addAttribute("tasks", tasks);

        Map<String, String> processNames = new HashMap<>();
        for (Task task : tasks) {
            ProcessDefinition pd = repositoryService.createProcessDefinitionQuery()
                    .processDefinitionId(task.getProcessDefinitionId())
                    .singleResult();
            processNames.put(task.getId(), pd.getName());
        }
        model.addAttribute("processNames", processNames);

        return "flowables/processes";
    }

    /**
     * Step 1 (Get) - process 'Employee Onboarding Process'
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
     * Step 1 (Post) - process 'Employee Onboarding Process'
     * Add a new user (employee) to CRM by BPMN process
     *
     * @param formData
     * @return redirect
     */
    @PostMapping("/flowables/forms/job-application/submit")
    public String submitJobApplicationForm(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Map<String, String> formData) {
        // get current User
        User user = userService.getUserByUsername(userDetails.getUsername());

        // 1 Prepare the variables
        Map<String, Object> variables = new HashMap<>(formData);

        // get department
        String departmentId = formData.get("department_id");
        Department department = departmentService.getById(Long.parseLong(departmentId));
        variables.put("department", department.getTitle());

        // get position
        String positionId = formData.get("position_id");
        Position position = positionService.getById(Long.parseLong(positionId));
        variables.put("position", position.getTitle());

        // get role
        String roleId = formData.get("role_id");
        Role role = roleService.getById(Long.parseLong(roleId));
        variables.put("role", role.getTitle());

        log.info("---------> " + variables.toString());

        // 2️ Start the process and store the ProcessInstance object
        variables.put("initiator", user.getId()); // user_id initiator - first step of bank
        variables.put("nextAssignee", "2"); // user_id next assignment - next step of bank
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
     * Step 2 (Get) - process 'Employee Onboarding Process'
     * Show form for action: approve or reject
     *
     * @param taskId
     * @param model
     * @return html
     */
    @GetMapping("/flowables/forms/approve-reject/{taskId}")
    public String getApproveRejectForm(@PathVariable String taskId, Model model) {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task == null) {
            throw new RuntimeException("Task not found");
        }

        Map <String, Object> variables = runtimeService.getVariables(task.getProcessInstanceId());
        model.addAttribute("task", task);
        model.addAttribute("variables", variables);

        return "flowables/forms/approve-reject";
    }

    /**
     * Step 2 (Post) - process 'Employee Onboarding Process'
     * Get action="approve" or action="reject" to CRM by BPMN process 'Employee Onboarding Process'
     *
     * @param taskId
     * @param formData
     * @return redirect
     */
    @PostMapping("/flowables/forms/approve-reject/submit")
    public String get(@RequestParam("taskId") String taskId, @RequestParam Map<String, Object> formData) {
        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task == null) {
            throw new RuntimeException("Task not found");
        }
        Map <String, Object> variables = runtimeService.getVariables(task.getProcessInstanceId());

        // get action
        Object action = formData.get("action");
        variables.put("action", action);

        taskService.complete(taskId, formData);
        return "redirect:/processes";
    }

    /**
     * Step 1 (Get) - process 'Leave Application'
     * Show a form 'Leave Application' about a leave user (employee) in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/flowables/forms/leave-application")
    public String getLeaveApplicationForm(Model model) {
        List<User> users = userService.getAll();
        model.addAttribute("users", users);

        return "flowables/forms/leave-application";
    }

    /**
     * Step 1 (Post) - process 'Leave Application'
     *
     * @param taskId
     * @param formData
     * @return redirect
     */
    @PostMapping("/flowables/forms/leave-application/submit")
    public String getLeaveApplication(@RequestParam("taskId") String taskId, @RequestParam Map<String, Object> formData) {
        // TODO

        return "redirect:/processes";
    }

    /**
     * Step 1 (Get) - process 'Fire Application'
     * Show a form 'Fire Application' about a leave user (employee) in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/flowables/forms/fire-application")
    public String getFireApplicationForm(Model model) {
        List<User> users = userService.getAll();
        model.addAttribute("users", users);

        return "flowables/forms/fire-application";
    }

    /**
     * Step 1 (Post) - process 'Fire Application'
     *
     * @param taskId
     * @param formData
     * @return redirect
     */
    @PostMapping("/flowables/forms/fire-application/submit")
    public String getFireApplication(@RequestParam("taskId") String taskId, @RequestParam Map<String, Object> formData) {
        // TODO

        return "redirect:/processes";
    }

    /**
     * Step 1 (Get) - process 'Company Dissolution Application'
     * Show a form 'Company Dissolution Application' about a dissolution company in CRM
     *
     * @param model
     * @return html
     */
    @GetMapping("/flowables/forms/company-dissolution-application")
    public String getDissolutionApplicationForm(Model model) {
        model.addAttribute("departments", departmentService.getAll());
        model.addAttribute("positions", positionService.getAll());
        model.addAttribute("roles", roleService.getAll());

        return "flowables/forms/dissolution-application";
    }

    /**
     * Step 1 (Post) - process 'Company Dissolution Application'
     *
     * @param taskId
     * @param formData
     * @return redirect
     */
    @PostMapping("/flowables/forms/company-dissolution-application/submit")
    public String getDissolutionApplication(@RequestParam("taskId") String taskId, @RequestParam Map<String, Object> formData) {
        // TODO

        return "redirect:/processes";
    }
}

