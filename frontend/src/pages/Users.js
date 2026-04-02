import React from 'react';
import TableView from '../components/TableView';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const Users = () => {

    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>{t('users')}</h1>

            {/* Вызываем ваш компонент с таблицей */}
            <TableView />
        </div>
    );
};

export default Users;

