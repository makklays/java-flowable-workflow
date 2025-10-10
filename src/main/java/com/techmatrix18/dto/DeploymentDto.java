package com.techmatrix18.dto;

import java.time.LocalDateTime;

public class DeploymentDto {
    private String deploymentId;
    private String deploymentName;
    private LocalDateTime deployTime;

    // getters/setters

    public String getDeploymentId() { return deploymentId; }

    public void setDeploymentId(String deploymentId) { this.deploymentId = deploymentId; }

    public String getDeploymentName() { return deploymentName; }

    public void setDeploymentName(String deploymentName) { this.deploymentName = deploymentName; }

    public LocalDateTime getDeployTime() { return deployTime; }

    public void setDeployTime(LocalDateTime deployTime) { this.deployTime = deployTime; }
}

