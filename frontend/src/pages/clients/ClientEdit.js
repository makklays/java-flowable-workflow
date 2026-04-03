import React from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const ClientEdit = () => {

    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>Клиенты</h1>
            <p>Здесь будут клиенты...</p>
        </div>
    );
};

export default ClientEdit;

