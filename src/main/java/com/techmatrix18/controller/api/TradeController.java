package com.techmatrix18.controller.api;

import com.techmatrix18.dto.OpenTradeDto;
import com.techmatrix18.dto.SymbolDto;
import com.techmatrix18.dto.TradeDto;
import com.techmatrix18.mapper.SymbolMapper;
import com.techmatrix18.mapper.TradeMapper;
import com.techmatrix18.model.Symbol;
import com.techmatrix18.model.Trade;
import com.techmatrix18.service.TradeService;
import com.techmatrix18.telegram.TelegramService;
import com.techmatrix18.utils.TradingSessions;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
import java.util.logging.Logger;

/**
 * Controller for add trades in the system.
 *
 * @author Alexander Kuziv
 * @since 19.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"}) // Разрешает запросы с твоего фронта
@RestController
@Tag(name = "Trades", description = "Trade management API")
@RequestMapping("/api/v1/trades")
public class TradeController {
    private final TradeService tradeService;
    private final TelegramService telegramService;
    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    public TradeController(TradeService tradeService, TelegramService telegramService) {
        this.tradeService = tradeService;
        this.telegramService = telegramService;
    }

    private static final Logger log = Logger.getLogger(RoleController.class.getName());

    @GetMapping
    @Operation(summary = "Get all trades", description = "Returns list of all trades")
    public ResponseEntity<List<Trade>> getAll() {
        log.info("Fetching all trades");
        List<Trade> trades = tradeService.getAll();
        return ResponseEntity.ok(trades);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get trade by ID", description = "Returns a trade by its unique ID")
    public ResponseEntity<Trade> getTrade(@PathVariable Long id) {
        log.info("Fetching trade with ID = " + id);
        Trade trade = tradeService.getById(id);
        if (trade == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trade);
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get all user's trades", description = "Returns a complete history of trades for a user")
    public ResponseEntity<List<Trade>> getAllUserTrades(@PathVariable Long userId) {
        log.info("Fetching all trades for user: " + userId);
        List<Trade> trades = tradeService.getTradesByUserId(userId);
        return ResponseEntity.ok(trades);
    }

    @GetMapping("/user/{userId}/active")
    @Operation(summary = "Get currently user's trades", description = "Returns a list of currently (OPEN) trades for a user")
    public ResponseEntity<List<Trade>> getActiveUserTrades(@PathVariable Long userId) {
        log.info("Fetching active trades for user: " + userId);
        List<Trade> trades = tradeService.getActiveTrades(userId);
        return ResponseEntity.ok(trades);
    }

    @GetMapping("/user/{userId}/closed")
    @Operation(summary = "Get closed user's trades", description = "Returns a list of closed (CLOSED) trades for a user")
    public ResponseEntity<List<Trade>> getClosedUserTrades(@PathVariable Long userId) {
        log.info("Fetching closed trades for user: " + userId);
        List<Trade> trades = tradeService.getClosedTrades(userId);
        return ResponseEntity.ok(trades);
    }

    @PostMapping("/open")
    @Operation(summary = "Open trade (open order)", description = "Creates a new trade in the system")
    public ResponseEntity<Trade> openTrade(@RequestBody OpenTradeDto dto) {
        log.info("Opening trade for user " + dto.getUserId() + " on " + dto.getSymbol());
        Trade trade = tradeService.openTrade(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(trade);
    }

    @PostMapping("/{id}/edit")
    @Operation(summary = "Edit trade (edit order)", description = "Edits an active trade by ID")
    public ResponseEntity<Trade> edit(
            @PathVariable Long id,
            @RequestParam BigDecimal stopLoss,
            @RequestParam BigDecimal takeProfit
    ) {
        return ResponseEntity.ok(tradeService.editTrade(id, stopLoss, takeProfit));
    }

    @PostMapping("/{id}/close")
    @Operation(summary = "Close trade (close order)", description = "Closes an active trade by ID and calculates PnL")
    public ResponseEntity<Trade> close(
            @PathVariable Long id,
            @RequestParam BigDecimal closePrice,
            @RequestParam(required = false) String reason
    ) {
        return ResponseEntity.ok(tradeService.closeTrade(id, closePrice, reason));
    }

    @GetMapping(value = "/info-trading-sessions", produces = "text/plain;charset=UTF-8")
    @Operation(summary = "Get info about trading's sessions", description = "Returns text with names of trading's sessions")
    public ResponseEntity<String> getTradingSessions(Locale locale) {
        log.info("Requesting trading sessions info for locale: " + locale);

        LocalDateTime now = LocalDateTime.now();
        int hour = now.getHour();

        // 1. Определяем приветствие (можно тоже вынести в i18n bundle при желании)
        String greeting;
        if (hour >= 6 && hour < 12) greeting = "Доброе утро";
        else if (hour >= 12 && hour < 18) greeting = "Добрый день";
        else if (hour >= 18 && hour < 23) greeting = "Добрый вечер";
        else greeting = "Доброй ночи";

        // 2. Загружаем локализацию сессий
        ResourceBundle bundle = null;
        try {
            bundle = ResourceBundle.getBundle("i18n.messages", locale);
        } catch (MissingResourceException e) {
            log.info("Локализация не найдена для " + locale + ", использую дефолт");
            bundle = ResourceBundle.getBundle("i18n.messages", Locale.ENGLISH); // Дефолт
        }
        String tradeSession = TradingSessions.getMarketInfoString(LocalTime.now(ZoneOffset.UTC), bundle);

        // 3. Формируем итоговую строку
        // Убираем дублирование даты/времени, оставляя одну красивую цепочку
        String sessionInfo = String.format("%s! %s | %s | %s",
            greeting,
            now.format(dateFormatter),
            now.format(timeFormatter),
            tradeSession);

        return ResponseEntity.ok(sessionInfo);
    }

    /**
     * Отправка тестового сообщения в Телеграм из front-end
     */
    @PostMapping("/send-test-message-to-tg")
    public ResponseEntity<String> uploadChart(
            @RequestParam("file") MultipartFile file,
            @RequestParam("pair") String pair,
            @RequestParam("timeframe") String timeframe,
            @RequestParam("side") String side,
            @RequestParam("lot") String lot,
            @RequestParam("price") String price,
            @RequestParam("tp") String tp,
            @RequestParam("sl") String sl,
            @RequestParam("signal") String signal) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Файл пустой");
            }

            // 1. Получаем бинарные данные картинки из фронтенда
            byte[] imageBytes = file.getBytes();
            String fileName = file.getOriginalFilename();

            BigDecimal currentPrice = new BigDecimal(price);
            // Задаем проценты (1% для SL, 2% для TP)
            BigDecimal slPercent = new BigDecimal("0.01");
            BigDecimal tpPercent = new BigDecimal("0.02");
            String direction = "LONG";
            BigDecimal slPrice;
            BigDecimal tpPrice;

            if ("LONG".equals(direction)) {
                // Для LONG: TP выше текущей цены, SL — ниже
                tpPrice = currentPrice.add(currentPrice.multiply(tpPercent));
                slPrice = currentPrice.subtract(currentPrice.multiply(slPercent));
            } else {
                // Для SHORT: TP ниже текущей цены, SL — выше
                tpPrice = currentPrice.subtract(currentPrice.multiply(tpPercent));
                slPrice = currentPrice.add(currentPrice.multiply(slPercent));
            }

            // Округляем до 2 знаков после запятой (для криптовалюты)
            tpPrice = tpPrice.setScale(2, RoundingMode.HALF_UP);
            slPrice = slPrice.setScale(2, RoundingMode.HALF_UP);

            // 1. Расчет риска на сделку в % от цены входа
            // Формула: (|Цена_входа - SL| / Цена_входа) * 100
            BigDecimal priceDiffSL = currentPrice.subtract(slPrice).abs();
            BigDecimal riskPercent = priceDiffSL
                    .divide(currentPrice, 4, RoundingMode.HALF_UP)
                    .multiply(new BigDecimal("100"))
                    .setScale(2, RoundingMode.HALF_UP);

            // 2. Расчет соотношения Risk:Reward (RR)
            // Формула: |Цена_входа - TP| / |Цена_входа - SL|
            BigDecimal priceDiffTP = currentPrice.subtract(tpPrice).abs();
            BigDecimal rrRatio = priceDiffTP.divide(priceDiffSL, 1, RoundingMode.HALF_UP); // Обычно пишут 1 знак, например 1:3.0

            // 2. Формируем подпись к фотографии
            String text_message = String.format("📊 Сделка %s / %s\n" +
                    "Сторона: %s \n\r" +
                    "Объем: %s лот \n\r" +
                    "Цена: %s USDT\n\r" +
                    "TP: %s \n\r" +
                    "SL: %s \n\r" +
                    "Риск: %s%%\n\r" +
                    "RiskReward: 1:%s\n\r" +
                    "Сигнал: %s.",
                pair,
                timeframe,
                side,
                lot,
                price,
                tpPrice,
                slPrice,
                riskPercent,    // Подставится в %s%% (двойной процент экранирует символ %)
                rrRatio,        // Подставится в 1:%s
                signal);

            // 3. ПЕРЕДАЕМ В ВАШ РАБОЧИЙ МЕТОД
            // Адаптируйте вызов под ваш сервис. Обычно методы отправки фото в Telegram API
            // принимают либо массив байт (byte[]), либо объект InputFile, либо файл напрямую.

            // Пример:
            // telegramBotService.sendPhotoToTelegram(imageBytes, fileName, caption);
            telegramService.sendMessageForAll(text_message); // отправка сообщения всем в канал Телеграмма

            return ResponseEntity.ok("Скриншот успешно обработан и отправлен в Telegram");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка на стороне сервера: " + e.getMessage());
        }
    }
}

