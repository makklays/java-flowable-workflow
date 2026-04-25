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

                console.log("WS Incoming:", msg);

                if (msg.type === "CANDLE" && msg.symbol) {
                    setPrices(prev => {
                        const newState = {
                            ...prev,
                            [msg.symbol]: {
                                close: parseFloat(msg.close),
                                open: parseFloat(msg.open),
                                high: parseFloat(msg.high),
                                low: parseFloat(msg.low),
                                time: msg.openTime
                            }
                        };
                        return newState;
                    });

                    console.log("Updated Prices State:", prices);
                }
            } catch (e) {
                console.error("Ошибка парсинга в контексте:", e);
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

