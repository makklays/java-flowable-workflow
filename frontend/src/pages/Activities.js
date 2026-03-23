import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Импортируем хук

// Короткая запись компонента - стрелочная функция
const Activities = () => {

    const { t } = useTranslation(); // 2. Инициализируем t

    return (
        <div>
            <h1>{t('activities')}</h1>
            <p>Здесь будут активности...</p>
        </div>
    );
};

export default Activities;