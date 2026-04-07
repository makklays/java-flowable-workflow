package com.techmatrix18.enums;

/**
 * Timeframe - Перечисление для таймфреймов с кодами и длительностью в миллисекундах
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 05.03.2026
 * @version 0.0.1
 */
public enum Timeframe {
    M1("1m", 60_000L),
    M5("5m", 300_000L),
    M15("15m", 900_000L),
    M30("30m", 1_800_000L),
    H1("1h", 3_600_000L),
    H4("4h", 14_400_000L),
    H8("8h", 28_800_000L),    // Добавлено: 8 часов
    H12("12h", 43_200_000L),
    D1("1d", 86_400_000L),
    W1("1w", 604_800_000L),
    MN("1M", 2_592_000_000L); // Добавлено: 1 месяц (30 дней) в мс

    private final String code;
    private final long msec;

    Timeframe(String code, long msec) {
        this.code = code;
        this.msec = msec;
    }

    public String getCode() { return code; }
    public long getMsec() { return msec; }

    // Метод для расчета времени закрытия (ваша логика без поля close_time свечи в БД - экономия места бд)
    public long getCloseTime(long openTime) {
        return openTime + msec - 1;
    }

    // Поиск по строковому коду (например, из базы или API)
    public static Timeframe fromCode(String code) {
        for (Timeframe tf : values()) {
            if (tf.code.equals(code)) return tf;
        }
        throw new IllegalArgumentException("Unknown timeframe: " + code);
    }

    // получить минуты для ta4j таймфреймов и агрегаторов с 1m
    public int getMinutes() {
        return (int) (msec / 60_000L);
    }
}

