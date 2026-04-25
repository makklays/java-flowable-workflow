import React, { createContext, useState, useContext, useEffect } from 'react';

const PricesContext = createContext();

export const PricesProvider = ({ children }) => {
    const [prices, setPrices] = useState({});

    console.log("CONTEXT STATE:", prices);

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
                    const data = msg.data || msg;
                    const symbol = data.s;

                    setPrices(prev => ({
                        ...prev,
                        [symbol]: {
                            ...prev[symbol], // СОХРАНЯЕМ данные свечи, если они уже были!
                            bid: parseFloat(data.b),
                            ask: parseFloat(data.a),
                            bidQty: parseFloat(data.B),
                            askQty: parseFloat(data.A)
                        }
                    }));
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

