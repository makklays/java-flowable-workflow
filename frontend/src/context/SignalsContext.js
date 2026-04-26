import React, { createContext, useState, useContext, useEffect } from 'react';

const SignalsContext = createContext();

export const SignalsProvider = ({ children }) => {
    const [signals, setSignals] = useState([]);

    //console.log("SIGNAL STATE:", signals);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8082/ws/signals');

        socket.onmessage = (event) => {
            try {
                const msg = JSON.parse(event.data);

                // Получаю сигналы с backend
                if (msg.type === "SIGNAL") {

                    //console.log("RAW SIGNAL:", msg);

                    setSignals(prev => {
                        // Проверка: если prev не массив, делаем его пустым массивом
                        const safePrev = Array.isArray(prev) ? prev : [];

                        const newSignal = {
                            id: Date.now(),
                            symbol: msg.symbol || "UNKNOWN",
                            signal: msg.signal || "BUY",
                            price: msg.price || 0,
                            label: msg.label || "",
                            time: msg.time || Date.now()
                        };

                        return [newSignal, ...safePrev].slice(0, 50);
                    });
                }
            } catch (e) {
                console.error("Ошибка парсинга:", e);
            }
        };

        socket.onopen = () => console.log("✅ Сокет СИГНАЛОВ подключен к бэкенду");
        socket.onerror = (err) => console.error("❌ Ошибка сокета СИГНАЛОВ:", err);

        return () => socket.close();
    }, []);

    return (
        <SignalsContext.Provider value={signals}>
            {children}
        </SignalsContext.Provider>
    );
};

export const useSignals = () => useContext(SignalsContext);

