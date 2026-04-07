import React from 'react';
import TableView from '../../components/TableView';
// Убрали импорт i18n, так как он не используется напрямую
import { useTranslation } from 'react-i18next';

const Users = () => {
    // Оставили только { t }, так как i18n здесь не вызывается
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('users')}</h1>

            {/* Вызываем ваш компонент с таблицей */}
            <TableView />
        </div>
    );
};

export default Users;

