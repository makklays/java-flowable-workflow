package com.techmatrix18.dto;

import java.time.LocalDateTime;

public class TaskDto {
    private String id;
    private String name;
    private String assignee;
    private LocalDateTime createTime;

    // getters/setters

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getAssignee() { return assignee; }

    public void setAssignee(String assignee) { this.assignee = assignee; }

    public LocalDateTime getCreateTime() { return createTime; }

    public void setCreateTime(LocalDateTime createTime) { this.createTime = createTime; }
}

