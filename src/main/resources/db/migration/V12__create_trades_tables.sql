
-- V12__create_trades_table.sql
-- Migration #12: create table trades

-- Creating table 'trades' for saving main data of trades
CREATE TABLE trades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT NOT NULL,                                -- ID пользователя
    exchange_id INT NOT NULL,                               -- ID=1 Binance, ID=2 ByBit, etc. (для получения ключей и закрытия сделки)
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

    -- Поля для аналитики сделки

    -- Экстремумы (обновляются фоновым процессом Java, пока статус OPEN)
    max_pnl DECIMAL(24, 10) DEFAULT 0,                      -- рекордная нереализованная прибыль
    max_drawdown DECIMAL(24, 10) DEFAULT 0,                 -- худшая просадка за время сделки
    high_price_reached DECIMAL(24, 10) DEFAULT NULL,        -- максимальная цена (пик), зафиксированная рынком за всё время, пока сделка была открыта
    low_price_reached DECIMAL(24, 10) DEFAULT NULL,         -- минимальная цена (дно), зафиксированная рынком за всё время

    -- Метрики эффективности (считаются при закрытии)
    mae DECIMAL(24, 10) DEFAULT 0,                          -- максимальное отклонение цены против вашей позиции в валюте (или пунктах)
    mfe DECIMAL(24, 10) DEFAULT 0,                          -- максимальное отклонение цены в сторону вашей прибыли за всё время сделки
    efficiency_ratio DECIMAL(10, 4) DEFAULT NULL,           -- коэффициент эффективности сделки (от 0 до 1)

    -- Рыночный контекст
    entry_volatility DECIMAL(10, 4) DEFAULT NULL,           -- волатильность рынка на момент входа (для оценки адекватности риска)
    slippage DECIMAL(24, 10) DEFAULT 0,                     -- разница между ценой запроса и ценой реального исполнения (качество входа)

    -- Автоматизация
    is_close_auto BOOLEAN DEFAULT FALSE,                    -- сделка закрыта автоматически (роботом или лимитным ордером)

    opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,          -- время открытия сделки
    closed_at TIMESTAMP NULL,                               -- время закрытия сделки

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_status ON trades(user_id, status);    -- для личного кабинета (открытые/закрытые)
CREATE INDEX idx_symbol ON trades(symbol);                  -- для фильтрации по монетам
CREATE INDEX idx_status ON trades(status);                  -- для фильтрации по status
CREATE INDEX idx_opened_at ON trades(opened_at);            -- для отчетов по датам

