import React from 'react';
import ThemeToggle from '../components/ThemeToggle';

// Короткая запись компонента - стрелочная функция
const Settings = () => {
    return (
        <div>
            <h1>Настройки</h1>
            <p>Здесь будут настройки пользователя...</p>

            <ThemeToggle />
        </div>
    );
};

export default Settings;