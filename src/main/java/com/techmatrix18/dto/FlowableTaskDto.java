package com.techmatrix18.dto;

/**
 * Flowable Task Dto - DTO для передачи информации о задаче Flowable на фронтенд.
 *
 * @author Alexander Kuziv
 * @since 30.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
public class FlowableTaskDto {
    private String id;
    private String name;
    private String formKey;
    private String processInstanceId;

    // Геттеры и сеттеры

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFormKey() { return formKey; }
    public void setFormKey(String formKey) { this.formKey = formKey; }

    public String getProcessInstanceId() { return processInstanceId; }
    public void setProcessInstanceId(String processInstanceId) { this.processInstanceId = processInstanceId; }
}

