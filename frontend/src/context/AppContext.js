import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Состояние для размера шрифта (наши "Увеличить/Уменьшить")
    const [fontSize, setFontSize] = useState(16);
    // Состояние для текущего пользователя (после логина)
    const [user, setUser] = useState(null);

    const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 24));
    const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 12));

    const login = (userData) => {
        //setUser(userData);
        setUser(userData.username);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('token', userData.token); // Сохраняем JWT для API
    };

    const logout = () => {
        // Очищаем всё
        setUser(null);
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        // Можно добавить принудительный редирект, если импортировать useNavigate
        window.location.href = '/login';
    };

    return (
        <AppContext.Provider value={{
            fontSize,
            increaseFont,
            decreaseFont,
            user,
            setUser,
            login,
            logout
        }}>
            {children}
        </AppContext.Provider>
    );
};

// Хук для удобного использования в компонентах
export const useApp = () => useContext(AppContext);

