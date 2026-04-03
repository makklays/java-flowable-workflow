import React from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const ContactAdd = () => {

    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>Контакты</h1>
            <p>Здесь будут контакты...</p>
        </div>
    );
};

export default ContactAdd;

