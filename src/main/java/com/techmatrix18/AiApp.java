package com.techmatrix18;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.DefaultChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

/*
 * ОШИБКА! Spring Boot не видит OpenAI API ключ. Он не создаёт бин OpenAiApi, потому что ключ пустой.
 * Error: OpenAI API key must be set. Use the connection property: spring.ai.openai.api-key or spring.ai.openai.chat.api-key property.
 */

@SpringBootApplication
public class AiApp {
    public static void main(String[] args) {
        SpringApplication.run(AiApp.class, args);
    }
}

@Component
class TestApiKey {
    @Value("${OPENAI_API_KEY}")
    private String key;

    @PostConstruct
    public void print() {
        System.out.println("API Key: " + key);
    }
}

// Этот класс теперь должен быть в отдельном файле AiConfig.java или прямо здесь
@Configuration
class AiConfig {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder) {
        // Spring Boot автоматически создаст и настроит builder
        // на основе ваших данных из application.yaml
        return builder.build();
    }
}
/*@Configuration
class AiConfig {
    @Bean
    public ChatClient chatClient(OpenAiApi openAiApi) {
        // ChatModel — интерфейс, OpenAiChatModel реализует его
        ChatModel model = OpenAiChatModel.builder()
                .openAiApi(openAiApi)
                .build();

        // Конструктор DefaultChatClient принимает ChatModel
        return new DefaultChatClient((DefaultChatClient.DefaultChatClientRequestSpec) model);
    }
}*/

// @RestController
class ChatController {
    private final ChatClient chatClient; // Используем интерфейс

    public ChatController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String userMessage) {
        String response = chatClient.prompt()
                .system("Ты дружелюбный ассистент.")
                .user(userMessage)
                .call()
                .content();
        return response;
    }
}

