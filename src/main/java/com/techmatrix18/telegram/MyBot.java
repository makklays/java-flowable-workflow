package com.techmatrix18.telegram;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

/**
 * MyBot - это класс, который реализует Telegram бота, используя библиотеку TelegramBots.
 *
 * @author Alexander Kuziv
 * @since 15.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */
@Component
public class MyBot extends TelegramLongPollingBot {

    @Value("${TELEGRAM_BOT_TOKEN}")
    private String botToken;

    @Value("${TELEGRAM_CHAT_ID}")
    private String chatId;

    @Value("${TELEGRAM_CHAT_ID_FOR_ALL}")
    private String chatIdForAll;

    // Создаем форматтер с нужным шаблоном
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("E, dd.MM.yyyy HH:mm:ss", new Locale("ru"));

    @Override
    public String getBotUsername() {
        return "your_bot_name";
    }

    @Override
    public String getBotToken() {
        return botToken;
    }

    @Override
    public void onUpdateReceived(Update update) {
        System.out.println("Получено обновление: " + update); // Проверка в консоли

        if (update.hasMessage() && update.getMessage().hasText()) {

            String text = update.getMessage().getText();
            Long chatId = update.getMessage().getChatId(); // user chat id
            Long channelId = update.getMessage().getChat().getId(); // channel id (when a bot in a channel)

            SendMessage message = new SendMessage();
            message.setChatId(chatId.toString());

            if (text.equals("/start")) {
                message.setText("Hello 👋");

            } else if (text.equals("/date")) {
                message.setText("Now: " + LocalDateTime.now().format(formatter));

            } else {
                message.setText("You said: " + text); // + channelId
            }

            try {
                execute(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (update.hasCallbackQuery()) {

            String data = update.getCallbackQuery().getData();
            Long chatId = update.getCallbackQuery().getMessage().getChatId();

            SendMessage message = new SendMessage();
            message.setChatId(chatId.toString());

            if (data.equals("BUY_BTC")) {
                message.setText("✅ BUY order executed");
            }
            else if (data.equals("IGNORE_BTC")) {
                message.setText("❌ Signal ignored");
            }

            try {
                execute(message);   // отправка сообщения
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public void sendSignal(String messageText) {

        // создаём сообщение
        SendMessage message = new SendMessage();
        message.setChatId(chatId.toString());
        message.setText(messageText);
        message.setText("📢 Signal: BUY BTC at 65000");

        // создаём клавиатуру
        InlineKeyboardMarkup markup = new InlineKeyboardMarkup();

        // строки кнопок
        List<List<InlineKeyboardButton>> rows = new ArrayList<>();

        // BUY кнопка
        InlineKeyboardButton buyBtn = new InlineKeyboardButton();
        buyBtn.setText("🟢 BUY");
        buyBtn.setCallbackData("BUY_BTC");

        // IGNORE кнопка
        InlineKeyboardButton ignoreBtn = new InlineKeyboardButton();
        ignoreBtn.setText("❌ IGNORE");
        ignoreBtn.setCallbackData("IGNORE_BTC");

        // добавляем в строку (ряд кнопок)
        rows.add(Arrays.asList(buyBtn, ignoreBtn));

        // прикрепляем клавиатуру
        markup.setKeyboard(rows);
        message.setReplyMarkup(markup);

        // отправка
        try {
            execute(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

