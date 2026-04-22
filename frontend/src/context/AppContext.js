import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);

    // ДОБАВЛЯЕМ состояние для ID пользователя
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [user, setUser] = useState(localStorage.getItem('username') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

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

