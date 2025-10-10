package com.techmatrix18.dto;

import java.time.LocalDateTime;

public class ProcessDto {
    private String processInstanceId;
    private String processName;
    private String processKey;
    private Integer processVersion;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // getters/setters

    public String getProcessInstanceId() { return processInstanceId; }

    public void setProcessInstanceId(String processInstanceId) { this.processInstanceId = processInstanceId; }

    public String getProcessName() { return processName; }

    public void setProcessName(String processName) { this.processName = processName; }

    public String getProcessKey() { return processKey; }

    public void setProcessKey(String processKey) { this.processKey = processKey; }

    public Integer getProcessVersion() { return processVersion; }

    public void setProcessVersion(Integer processVersion) { this.processVersion = processVersion; }

    public LocalDateTime getStartTime() { return startTime; }

    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }

    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
}

