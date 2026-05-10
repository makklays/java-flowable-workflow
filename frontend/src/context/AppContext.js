import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);

    // ДОБАВЛЯЕМ состояние для ID пользователя
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [user, setUser] = useState(localStorage.getItem('username') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    // --- ЛОГИКА ПОДКЛЮЧЕНИЯ CSS ПО РОЛИ ---
    useEffect(() => {
        const CSS_ID = 'admin-style';

        if (role !== 'user_bank' && role !== 'admin') {
            // Если стиля еще нет в head, добавляем его
            if (!document.getElementById(CSS_ID)) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/css/main10.css'; // Путь должен вести в папку public/styles/
                link.id = CSS_ID;
                document.head.appendChild(link);
            }
        } else {
            // Если роль сменилась (выход) или не админ — удаляем стиль
            const el = document.getElementById(CSS_ID);
            if (el) el.remove();
        }

        // Опционально: очистка при размонтировании провайдера
        return () => {
            const el = document.getElementById(CSS_ID);
            if (el) el.remove();
        };
    }, [role]); // Следим за изменением стейта role
    // --------------------------------------

    const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 24));
    const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 12));

    const login = (userData) => {
        // 1. Обновляем стейты (чтобы React сразу перерисовал компоненты)
        setUserId(userData.id);
        setUser(userData.username);
        setRole(userData.role);

        // 2. Сохраняем в localStorage
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('token', userData.token);

        console.log("Пользователь:", userData);
        console.log("Пользователь ID:", userData.id);
        console.log("Пользователь вошел:", userData.username);
        console.log("Пользователя роль:", userData.role);
        console.log("Пользователя token:", userData.token);
    };

    const logout = () => {
        // Очищаем всё
        setUserId(null);
        setUser(null);
        setRole(null);

        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <AppContext.Provider value={{
            fontSize,
            increaseFont,
            decreaseFont,
            userId,
            user,
            role,
            login,
            logout
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Хук для удобного использования в компонентах
export const useApp = () => useContext(AppContext);

