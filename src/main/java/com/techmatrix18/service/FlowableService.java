package com.techmatrix18.service;

import com.techmatrix18.dto.DeploymentDto;
import com.techmatrix18.dto.HistoricTaskDto;
import com.techmatrix18.dto.ProcessDto;
import com.techmatrix18.dto.TaskDto;
import com.techmatrix18.repository.FlowableRepository;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class FlowableService {

    private final FlowableRepository repository;

    public FlowableService(FlowableRepository repository) {
        this.repository = repository;
    }

    // ---------------- Processes ----------------
    public List<ProcessDto> getProcessesByUser(String userId) {
        List<Object[]> rows = repository.findProcessesByUser(userId);
        if (rows == null || rows.isEmpty()) return Collections.emptyList();

        List<ProcessDto> processes = new ArrayList<>();
        for (Object[] row : rows) {
            ProcessDto dto = new ProcessDto();
            dto.setProcessInstanceId((String) row[0]);
            dto.setProcessName((String) row[1]);
            dto.setProcessKey((String) row[2]);
            dto.setProcessVersion(((Number) row[3]).intValue());
            dto.setStartTime(row[4] != null ? ((Timestamp) row[4]).toLocalDateTime() : null);
            dto.setEndTime(row[5] != null ? ((Timestamp) row[5]).toLocalDateTime() : null);
            processes.add(dto);
        }
        return processes;
    }

    // ---------------- Active tasks ----------------
    public List<TaskDto> getActiveTasksByUser(String userId) {
        List<Object[]> rows = repository.findActiveTasksByUser(userId);
        if (rows == null || rows.isEmpty()) return Collections.emptyList();

        List<TaskDto> tasks = new ArrayList<>();
        for (Object[] row : rows) {
            TaskDto dto = new TaskDto();
            dto.setId((String) row[0]);
            dto.setName((String) row[1]);
            dto.setAssignee((String) row[2]);
            dto.setCreateTime(row[3] != null ? ((Timestamp) row[3]).toLocalDateTime() : null);
            tasks.add(dto);
        }
        return tasks;
    }

    // ---------------- Historic tasks ----------------
    public List<HistoricTaskDto> getHistoricTasksByUser(String userId) {
        List<Object[]> rows = repository.findHistoricTasksByUser(userId);
        if (rows == null || rows.isEmpty()) return Collections.emptyList();

        List<HistoricTaskDto> historicTasks = new ArrayList<>();
        for (Object[] row : rows) {
            HistoricTaskDto dto = new HistoricTaskDto();
            dto.setTaskId((String) row[0]);
            dto.setTaskName((String) row[1]);
            dto.setAssignee((String) row[2]);
            dto.setStartTime(row[3] != null ? ((Timestamp) row[3]).toLocalDateTime() : null);
            dto.setEndTime(row[4] != null ? ((Timestamp) row[4]).toLocalDateTime() : null);
            historicTasks.add(dto);
        }
        return historicTasks;
    }

    // ---------------- Deployments ----------------
    public List<DeploymentDto> getAllDeployments() {
        List<Object[]> rows = repository.findAllDeployments();
        if (rows == null || rows.isEmpty()) return Collections.emptyList();

        List<DeploymentDto> deployments = new ArrayList<>();
        for (Object[] row : rows) {
            DeploymentDto dto = new DeploymentDto();
            dto.setDeploymentId((String) row[0]);
            dto.setDeploymentName((String) row[1]);
            dto.setDeployTime(row[3] != null ? ((Timestamp) row[3]).toLocalDateTime() : null);
            deployments.add(dto);
        }
        return deployments;
    }
}

