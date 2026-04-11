
-- V11__create_candles_table.sql
-- Migration #11: create table candles

-- Creating table 'candles' for saving main data of candles
CREATE TABLE candles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    exchange_id INT(11) NOT NULL,         -- ID=1 binance, ID=2 bybit, etc.
    symbol_id BIGINT NOT NULL,
    timeframe VARCHAR(10) NOT NULL,       -- '1m', '5m', '1h', '1d'

    open_time BIGINT NOT NULL,            -- timestamp in miliseconds (ms)
    open DECIMAL(24, 10) NOT NULL,
    high DECIMAL(24, 10) NOT NULL,
    low DECIMAL(24, 10) NOT NULL,
    close DECIMAL(24, 10) NOT NULL,

    volume NUMERIC(24, 10) NOT NULL,      -- Объем в базовой валюте (например, BTC)

    -- дополнительные поля
    quote_asset_volume DECIMAL(24, 10),   -- Объем в USDT
    trades_count INTEGER,                 -- Количество сделок
    open_interest DECIMAL(24, 10),        -- Открытый интерес / Будет NULL для SPOT
    funding_rate DECIMAL(12, 10),         -- Ставка финансирования / Будет NULL для SPOT

    -- защищает от дублей
    CONSTRAINT uk_candle UNIQUE (exchange_id, symbol_id, timeframe, open_time),

    -- Внешний ключ
    CONSTRAINT fk_candles_symbol FOREIGN KEY (symbol_id) REFERENCES symbols(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Индекс под основные запросы
CREATE INDEX idx_candles_lookup ON candles (exchange_id, symbol_id, timeframe, open_time);

-- Иногда полезно для быстрых выборок по времени
CREATE INDEX idx_candles_time ON candles (open_time);

