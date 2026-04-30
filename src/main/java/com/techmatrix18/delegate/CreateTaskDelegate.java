package com.techmatrix18.delegate;

import com.techmatrix18.repository.UserRepository;
import com.techmatrix18.telegram.TelegramService;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.delegate.DelegateExecution;
import org.flowable.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.Logger;

/**
 * CreateTaskDelegate - делегат для создания задачи в процессе Flowable.
 *
 * @author Alexander Kuziv
 * @since 30.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@Service("createTaskDelegate")
public class CreateTaskDelegate implements JavaDelegate {

    Logger log = Logger.getLogger(CreateTaskDelegate.class.getName());

    private final UserRepository userRepository;
    private final RepositoryService repositoryService;
    private final TelegramService telegramService;

    public CreateTaskDelegate(UserRepository userRepository, RepositoryService repositoryService, TelegramService telegramService) {
        this.userRepository = userRepository;
        this.repositoryService = repositoryService;
        this.telegramService = telegramService;
    }

    @Override
    public void execute(DelegateExecution execution) {
        // Получаем переменные из процесса
        String priority = (String) execution.getVariable("priority"); // it is not used anywhere
        Object createDate = execution.getVariable("createDate"); // it is not used anywhere

        // Получаем бизнес-ключ
        String bKey = execution.getProcessInstanceBusinessKey();
        // Получаем ID текущего шага из XML
        String activityId = execution.getCurrentActivityId();
        // Получаем ID процесса
        String processInstanceId = execution.getProcessInstanceId();
        // Получаем имя процесса (например, "Loan Approval")
        String processName = repositoryService
            .getProcessDefinition(execution.getProcessDefinitionId())
            .getName();

        // 1. Просто берем ID из процесса (уже инициированный пользователь)
        Long userId = (Long) execution.getVariable("initiatorId");

        //execution.setVariable("userId", userId);
        execution.setVariableLocal("userId_only_to_next_step_task", userId);

        // Date and Time for logging
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        String formattedDateTime = now.format(formatter);

        // Notifications to Telegram
        String text = "📉 ID:" + userId + ": инициализировал процесс " + processName + ".";
        telegramService.sendMessage(text);

        // 2. Нам не нужно искать "кто залогинен", мы доверяем данным процесса --> initiatorId
        log.info(formattedDateTime + " - 📧 Logging from CreateTaskDelegate: Creating task for user ID '" + userId + "'.");
        log.info("Executing logic for user ID: " + userId);

        // 3. Используем этот ID для бизнес-логики
        /*userRepository.findById(userId).ifPresent(user -> {
            // делаем что-то с пользователем
        });*/
    }
}

