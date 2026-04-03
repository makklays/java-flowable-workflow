import React from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const DealView = () => {

    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>Сделки</h1>
            <p>Здесь будут сделки...</p>
        </div>
    );
};

export default DealView;

