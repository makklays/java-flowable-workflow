package com.techmatrix18.clients;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.techmatrix18.model.Candle;
import com.techmatrix18.model.Symbol;
import okhttp3.*;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * BinanceApiClient - Класс для взаимодействия с Binance API
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 03.03.2026
 * @version 0.0.1
 */
@Component
public class BinanceApiClient {

    private final String API_KEY = "123api"; // или из .env или из бд ?
    private final String SECRET_KEY = "123secret";
    private final String baseUrl = "https://fapi.binance.com";

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public BinanceApiClient() { }

    // ---------------- SIGNATURE ----------------
    private String sign(String data) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        mac.init(key);

        byte[] raw = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

        StringBuilder hex = new StringBuilder();
        for (byte b : raw) {
            hex.append(String.format("%02x", b));
        }

        return hex.toString();
    }

    // ---------------- REQUEST ----------------
    private String sendSignedPost(String path, String params) throws Exception {
        String signature = sign(params);
        String body = params + "&signature=" + signature;
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + path))
                .header("X-MBX-APIKEY", API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response =
                httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }

    // ---------------- CREATE ORDER ----------------
    public String createMarketOrder(
            String symbol,
            String side,
            double quantity
    ) throws Exception {

        long timestamp = Instant.now().toEpochMilli();
        String params = "symbol=" + symbol +
                "&side=" + side +
                "&type=MARKET" +
                "&quantity=" + quantity +
                "&timestamp=" + timestamp;

        return sendSignedPost("/fapi/v1/order", params);
    }

    // ---------------- GET POSITIONS ----------------
    public String getPositions() throws Exception {
        long timestamp = Instant.now().toEpochMilli();
        String params = "timestamp=" + timestamp;
        String signature = sign(params);

        String url = baseUrl +
                "/fapi/v2/positionRisk?" +
                params +
                "&signature=" +
                signature;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("X-MBX-APIKEY", API_KEY)
                .GET()
                .build();

        HttpResponse<String> response =
                httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }

    // ---------------- GET SYMBOLS ----------------
    // метод для получения информации о торговых парах (символах) с Binance API
    public List<Symbol> fetchExchangeInfo(String marketType) throws Exception {
        String url = marketType.equals("SPOT")
                ? "https://api.binance.com/api/v3/exchangeInfo"
                : "https://fapi.binance.com/fapi/v1/exchangeInfo";

        System.setProperty("jsse.enableSNIExtension", "true"); // Попробуйте FALSE вместо TRUE

        ConnectionSpec spec = new ConnectionSpec.Builder(ConnectionSpec.MODERN_TLS)
                .tlsVersions(TlsVersion.TLS_1_2) // Только 1.2
                .build();

        OkHttpClient client = new OkHttpClient.Builder()
                .hostnameVerifier((hostname, session) -> true)
                //.connectionSpecs(Collections.singletonList(spec))
                .build();

        Request request = new Request.Builder()
                .url(url)
                .header("User-Agent", "Mozilla/5.0")
                .build();

        System.out.println("--- OkHttp Request ---");
        System.out.println("URL: " + url);

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

            String body = response.body().string();
            JsonNode root = objectMapper.readTree(body);
            JsonNode symbolsNode = root.get("symbols");

            List<Symbol> result = new ArrayList<>();
            if (symbolsNode.isArray()) {
                for (JsonNode sNode : symbolsNode) {
                    // Пропускаем неактивные пары
                    JsonNode statusNode = sNode.has("status") ? sNode.get("status") : sNode.get("contractStatus");
                    if (statusNode == null || !"TRADING".equals(statusNode.asText())) continue;

                    String symbolStr = sNode.get("symbol").asText();
                    String baseAsset = sNode.get("baseAsset").asText();
                    String quoteAsset = sNode.get("quoteAsset").asText();

                    // Универсальный и безопасный вариант:
                    String status = sNode.path("status").asText(); // Для SPOT
                    String contractStatus = sNode.path("contractStatus").asText(); // Для Futures
                    Boolean isActive = false;
                    if (!status.isEmpty()) {
                        isActive = status.equals("TRADING");
                    } else if (!contractStatus.isEmpty()) {
                        isActive = contractStatus.equals("TRADING");
                    } else {
                        // Если ни того, ни другого нет, проверяем ваше кастомное поле isActive (если оно бывает в JSON)
                        isActive = sNode.path("isActive").asBoolean(false);
                    }

                    int pricePrecision = 0;
                    int quantityPrecision = 0;
                    if ("SPOT".equals(marketType)) {
                        // Для Spot точности берём из фильтров
                        JsonNode filters = sNode.get("filters");
                        if (filters.isArray()) {
                            for (JsonNode f : filters) {
                                String type = f.get("filterType").asText();
                                if ("PRICE_FILTER".equals(type)) {
                                    String tickSize = f.get("tickSize").asText();
                                    pricePrecision = countDecimalPlaces(tickSize);
                                } else if ("LOT_SIZE".equals(type)) {
                                    String stepSize = f.get("stepSize").asText();
                                    quantityPrecision = countDecimalPlaces(stepSize);
                                }
                            }
                        }
                    } else {
                        // Для Futures используем стандартные поля
                        pricePrecision = sNode.get("pricePrecision").asInt();
                        quantityPrecision = sNode.get("quantityPrecision").asInt();
                    }

                    Symbol symbol = new Symbol(1, symbolStr, symbolStr, marketType, baseAsset, quoteAsset, pricePrecision, quantityPrecision, isActive);
                    result.add(symbol);
                }
            }
            System.out.println("Success! Symbols fetched: " + (symbolsNode != null ? symbolsNode.size() : 0));
            return result;
        }
    }

    // Вспомогательный метод для подсчёта количества знаков после запятой
    private int countDecimalPlaces(String numberStr) {
        if (numberStr.contains(".")) {
            String[] parts = numberStr.split("\\.");
            return parts[1].length();
        }
        return 0;
    }

    // ---------------- GET HISTORY DATA - CANDLES  ----------------
    // метод для получения информации об исторических данных (например, свечах) с Binance API
    public List<JsonNode> fetchHistoricalData(String symbol, String interval, long startTime, long endTime) throws Exception {
        String url = "https://api.binance.com/api/v3/klines?symbol=" + symbol + "&interval=" + interval
                + "&startTime=" + startTime + "&endTime=" + endTime;

        System.out.println("Requesting: " + url);
        HttpRequest request = HttpRequest.newBuilder()
                .header("User-Agent", "Mozilla/5.0") // Короткий агент
                //.header("Accept", "application/json")
                //.header("User-Agent", "Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0")
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Response: " + response.body());
        JsonNode root = objectMapper.readTree(response.body());

        List<JsonNode> result = new ArrayList<>();
        if (root.isArray()) {
            for (JsonNode kline : root) {
                result.add(kline);
            }
        }
        return result;
    }

    // Запрашивает исторические свечи у Binance. Лимит: 1000 свечей за один запрос.
    public List<Candle> fetchHistoricalCandles(int symbolId, String symbolTicker, String marketType,
                                               String timeframe, long startTime, long endTime) throws Exception {

        // 1. Формируем URL в зависимости от рынка
        String baseUrl = marketType.equals("SPOT")
                ? "https://api.binance.com"
                : "https://fapi.binance.com";

        String url = String.format("%s?symbol=%s&interval=%s&startTime=%d&endTime=%d&limit=1000",
                baseUrl, symbolTicker, timeframe, startTime, endTime);

        HttpRequest request = HttpRequest.newBuilder()
                .header("User-Agent", "Mozilla/5.0") // Короткий агент
                //.header("Accept", "application/json")
                //.header("User-Agent", "Mozilla/5.0 (X11; Linux x86_64; rv:134.0) Gecko/20100101 Firefox/134.0")
                .uri(URI.create(url))
                .GET()
                .build();

        // 2. Отправляем запрос
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("Binance API error: " + response.body());
        }

        JsonNode root = objectMapper.readTree(response.body());
        List<Candle> candles = new ArrayList<>();

        // 3. Парсим массив массивов
        if (root.isArray()) {
            for (JsonNode node : root) {
                Candle candle = new Candle();
                candle.setSymbolId((long) symbolId);
                candle.setTimeframe(timeframe);

                // Индексы согласно документации Binance:
                candle.setOpenTime(node.get(0).asLong());                               // Open time
                candle.setOpen(BigDecimal.valueOf(node.get(1).asDouble()));             // Open
                candle.setHigh(BigDecimal.valueOf(node.get(2).asDouble()));             // High
                candle.setLow(BigDecimal.valueOf(node.get(3).asDouble()));              // Low
                candle.setClose(BigDecimal.valueOf(node.get(4).asDouble()));            // Close
                candle.setVolume(BigDecimal.valueOf(node.get(5).asDouble()));           // Volume (base asset)
                candle.setQuoteAssetVolume(BigDecimal.valueOf(node.get(7).asDouble())); // Quote asset volume (USDT)
                candle.setTradesCount(node.get(8).asInt());                             // Number of trades

                // Данные по OI и Funding загружаются отдельными запросами (нюанс API)
                // Здесь мы оставляем их null, они заполняются позже в Service
                candles.add(candle);
            }
        }
        return candles;
    }

    /**
     * Получает историю Open Interest (только для фьючерсов).
     * Возвращает Map: время (timestamp) -> значение OI.
     */
    public Map<Long, Double> fetchOpenInterest(String symbol, String timeframe, long startTime, long endTime) throws Exception {
        Map<Long, Double> oiMap = new HashMap<>();
        // Эндпоинт для истории открытого интереса
        String url = String.format("https://fapi.binance.com", symbol, timeframe, startTime, endTime);

        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            JsonNode root = objectMapper.readTree(response.body());
            for (JsonNode node : root) {
                long time = node.get("timestamp").asLong();
                double oi = node.get("sumOpenInterest").asDouble();
                oiMap.put(time, oi);
            }
        }
        return oiMap;
    }

    /**
     * Получает историю Funding Rate (только для фьючерсов).
     * Обычно данные приходят раз в 8 часов.
     */
    public Map<Long, Double> fetchFundingRate(String symbol, long startTime, long endTime) throws Exception {
        Map<Long, Double> fundingMap = new HashMap<>();
        String url = String.format("https://fapi.binance.com", symbol, startTime, endTime);

        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() == 200) {
            JsonNode root = objectMapper.readTree(response.body());
            for (JsonNode node : root) {
                long time = node.get("fundingTime").asLong();
                double rate = node.get("fundingRate").asDouble();
                fundingMap.put(time, rate);
            }
        }
        return fundingMap;
    }
}

