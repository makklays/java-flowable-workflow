
-- V10__create_symbols_table.sql
-- Migration #10: create table symbols

-- Creating table 'symbols' for saving main data of symbols
CREATE TABLE symbols (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exchange_id INT(11) NOT NULL,           -- ID=1 Binance, ID=2 Bybit, etc.
    symbol VARCHAR(50) NOT NULL,
    original_symbol VARCHAR(100) NOT NULL, -- как пришло с биржи (BNC-USDT и т.д.)
    base_asset VARCHAR(20) NOT NULL,       -- BTC
    quote_asset VARCHAR(20) NOT NULL,      -- USDT
    market_type VARCHAR(20) NOT NULL,      -- SPOT, FUTURES, OPTIONS

    price_precision INTEGER NOT NULL,      -- Binance: Точность цены (кол-во знаков после запятой)
    quantity_precision INTEGER NOT NULL,   -- Binance: Точность количества (шаг лота)

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- защищает от дублей
    CONSTRAINT uk_symbol UNIQUE (exchange_id, symbol, market_type)
);

-- Index
CREATE INDEX idx_symbols_exchange ON symbols (exchange_id);
CREATE INDEX idx_symbols_lookup ON symbols (exchange_id, symbol);
CREATE INDEX idx_symbols_market_type ON symbols (market_type);

