package com.techmatrix18.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.Map;

/**
 * Flowable Task Dto - DTO для передачи информации о задаче Flowable на фронтенд.
 *
 * @author Alexander Kuziv
 * @since 30.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class FlowableTaskDto {
    private String processName;
    private String id;
    private String name;
    @JsonProperty("formKey")
    private String formKey;
    private String processInstanceId;
    private Map<String, Object> processVariables;
    private Date createTime;

    // Геттеры и сеттеры

    public String getProcessName() { return processName; }
    public void setProcessName(String processName) { this.processName = processName; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFormKey() { return formKey; }
    public void setFormKey(String formKey) { this.formKey = formKey; }

    public String getProcessInstanceId() { return processInstanceId; }
    public void setProcessInstanceId(String processInstanceId) { this.processInstanceId = processInstanceId; }

    public Map<String, Object> getProcessVariables() { return processVariables; }
    public void setProcessVariables(Map<String, Object> processVariables) { this.processVariables = processVariables; }

    public Date getCreateTime() { return createTime; }
    public void setCreateTime(Date createTime) { this.createTime = createTime; }
}

