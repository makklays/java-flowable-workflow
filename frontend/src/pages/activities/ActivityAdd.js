import React from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const ActivityAdd = () => {

    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>{t('activities')}</h1>
            <p>Здесь будут активности...</p>
        </div>
    );
};

export default ActivityAdd;