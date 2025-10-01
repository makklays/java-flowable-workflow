package com.techmatrix18.service;

import org.flowable.dmn.api.DmnDecisionService;
import org.flowable.dmn.engine.DmnEngine;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DMNService {

    private final DmnDecisionService dmnDecisionService;

    public DMNService(DmnEngine dmnEngine) {
        this.dmnDecisionService = dmnEngine.getDmnDecisionService();
    }

    public String evaluateRisk(int age, int income) {
        Map<String, Object> variables = new HashMap<>();
        variables.put("age", age);
        variables.put("income", income);

        // execute() return List<Map<String, Object>>
        List<Map<String, Object>> result = dmnDecisionService
                .createExecuteDecisionBuilder()
                .decisionKey("riskCategoryDecision")
                .variables(variables)
                .execute();

        // We take the first result
        return result.get(0).get("RiskCategory").toString();
    }
}

