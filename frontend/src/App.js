import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// context для глобального состояния
import { AppProvider } from './context/AppContext';

import myLogo from './assets/fl-logo1.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    useEffect(() => {
        // Подключаемся к твоему новому Java WebSocket серверу
        const socket = new WebSocket("ws://localhost:8082/ws/signals");
        socket.onopen = () => {
            console.log("✅ WebSocket подключен к бэкенду");
            // Можно отправить тестовый тост, что связь установлена
            toast.success("Связь с торговым сервером установлена");
            playNotificationSound();
        };

        socket.onmessage = (event) => {
            console.log("📩 Получено сообщение:", event.data);
            const data = JSON.parse(event.data);
            // Проверяем поле 'type', которое мы задали в Java SignalDto
            //if (data.type === "SIGNAL") {
                // Используем поле 'label', куда мы в Java пишем текст сообщения
                toast.info(data.label, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                playNotificationSound();
            //}
        };
        socket.onerror = (error) => {
            console.error("❌ Ошибка WebSocket:", error);
        };
        return () => socket.close();
    }, []);

    const showToast = (message) => {
        toast.info(message); // или toast.success, toast.error
    };

    const playNotificationSound = () => {
        const audio = new Audio('/sounds/magic.wav'); // Путь к файлу в папке public
        audio.play().catch(error => console.error("Ошибка воспроизведения звука:", error));
    };

    return (
        <>
            <ToastContainer theme="dark" position="top-right" autoClose={3000} />
            <AppProvider>
                <Router>
                    <MainLayout/>
                </Router>

            </AppProvider>
        </>
    );
}

export default App;

