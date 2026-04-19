
-- V12__create_trades_table.sql
-- Migration #12: create table trades

-- Creating table 'trades' for saving main data of trades
CREATE TABLE trades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL,                                -- ID пользователя
    exchange_id INT NOT NULL,                           -- ID=1 Binance, ID=2 ByBit, etc. (для получения ключей и закрытия сделки)
    exchange VARCHAR(25) NOT NULL,                          -- Binance, ByBit, etc.
    symbol_id BIGINT NOT NULL,                              -- 1, 2 и т.д. (для получения ключей и закрытия сделки)
    symbol VARCHAR(25) NOT NULL,                            -- BTCUSDT, AAPL и т.д.

    side ENUM('BUY', 'SELL') NOT NULL,                      -- направление сделки
    quantity DECIMAL(24, 10) NOT NULL,                      -- объем сделки (лот)

    fee_entry DECIMAL(24, 10) DEFAULT 0,                    -- комиссия за вход
    fee_exit  DECIMAL(24, 10) DEFAULT 0,                    -- комиссия за выход
    leverage INT DEFAULT 1,                                 -- плечо для фьючерсов

    open_price  DECIMAL(24, 10) NOT NULL,                   -- цена открытия сделки
    close_price DECIMAL(24, 10) DEFAULT NULL,               -- цена закрытия сделки

    stop_loss DECIMAL(24, 10) DEFAULT NULL,                 -- STOP_LOSS
    take_profit DECIMAL(24, 10) DEFAULT NULL,               -- TAKE_PROFIT

    status ENUM('OPEN', 'CLOSED') NOT NULL DEFAULT 'OPEN',

    trade_comment VARCHAR(255) DEFAULT NULL,                -- комментарий к сделке
    close_reason VARCHAR(25) DEFAULT NULL,                  -- причина закрытия сделки STOP_LOSS, TAKE_PROFIT, MANUAL

    profit_loss DECIMAL(24, 10) DEFAULT NULL,

    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_status ON trades(user_id, status);    -- для личного кабинета (открытые/закрытые)
CREATE INDEX idx_symbol ON trades(symbol);                  -- для фильтрации по монетам
CREATE INDEX idx_status ON trades(status);                  -- для фильтрации по status
CREATE INDEX idx_opened_at ON trades(opened_at);            -- для отчетов по датам

