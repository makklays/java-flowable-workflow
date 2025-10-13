package com.techmatrix18.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import jakarta.mail.internet.MimeMessage;

@Configuration
public class MailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        return new JavaMailSender() {
            @Override
            public MimeMessage createMimeMessage() {
                return null;
            }

            @Override
            public MimeMessage createMimeMessage(java.io.InputStream contentStream) {
                return null;
            }

            @Override
            public void send(MimeMessage mimeMessage) {
                System.out.println("✅ Mock send(MimeMessage) called");
            }

            @Override
            public void send(MimeMessage... mimeMessages) {
                System.out.println("✅ Mock send(MimeMessage[]) called");
            }

            @Override
            public void send(SimpleMailMessage simpleMessage) {
                System.out.println("✅ Mock send(SimpleMailMessage) called");
            }

            @Override
            public void send(SimpleMailMessage... simpleMessages) {
                System.out.println("✅ Mock send(SimpleMailMessage[]) called");
            }

            @Override
            public void send(MimeMessagePreparator mimeMessagePreparator) {
                System.out.println("✅ Mock send(MimeMessagePreparator) called");
            }

            @Override
            public void send(MimeMessagePreparator... mimeMessagePreparators) {
                System.out.println("✅ Mock send(MimeMessagePreparator[]) called");
            }
        };
    }
}

