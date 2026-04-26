import React, { createContext, useState, useContext, useEffect } from 'react';

const PricesContext = createContext();

export const PricesProvider = ({ children }) => {
    const [prices, setPrices] = useState({});

    //console.log("CONTEXT STATE:", prices);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8082/ws/signals');

        socket.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);

                // 1. Обработка КАНДЛОВ (раз в минуту или чаще)
                if (msg.type === "CANDLE" && msg.symbol) {
                    setPrices(prev => ({
                        ...prev,
                        [msg.symbol]: {
                            ...prev[msg.symbol], // СОХРАНЯЕМ bid/ask, если они уже там были!
                            close: parseFloat(msg.close),
                            open: parseFloat(msg.open),
                            high: parseFloat(msg.high),
                            low: parseFloat(msg.low),
                            time: msg.openTime
                        }
                    }));
                }

                // 2. Обработка BID_ASK (поток bookTicker)
                if (msg.type === "BID_ASK") {
                    // В Java вы отправляете объект напрямую, без обертки "data"
                    const data = msg;
                    // ИСПРАВЛЕНИЕ: берем ключ "symbol", который мы прописали в Java
                    const symbol = data.symbol;
                    if (symbol) {
                        const upperSymbol = symbol.toUpperCase();
                        setPrices(prev => ({
                            ...prev,
                            [upperSymbol]: {
                                ...prev[upperSymbol],
                                bid: data.bid,
                                ask: data.ask,
                                spread: data.spread
                            }
                        }));
                    } else {
                        console.error("Symbol is missing in message:", msg);
                    }
                }
            } catch (e) {
                console.error("Ошибка парсинга:", e);
            }
        };

        socket.onopen = () => console.log("✅ Сокет ЦЕН подключен к бэкенду");
        socket.onerror = (err) => console.error("❌ Ошибка сокета ЦЕН:", err);

        return () => socket.close();
    }, []);

    return (
        <PricesContext.Provider value={prices}>
            {children}
        </PricesContext.Provider>
    );
};

export const usePrices = () => useContext(PricesContext);

