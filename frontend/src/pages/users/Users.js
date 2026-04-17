import React from 'react';
import TableView from '../../components/TableView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faPenToSquare, faTrashCan, faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons';
// Убрали импорт i18n, так как он не используется напрямую
import { useTranslation } from 'react-i18next';

const Users = () => {
    // Оставили только { t }, так как i18n здесь не вызывается
    const { t } = useTranslation();

    return (
        <div>
            <div className="row">
                <div className="col-md-6" style={{ marginBottom: '10px' }} >
                    <h1><FontAwesomeIcon icon={faUserGroup} className="me-2" /> {t('users')}</h1>
                    <p style={{ color: '#6c757d' }}>Список пользователей компании</p>
                </div>
            </div>

            {/* Вызываем ваш компонент с таблицей */}
            <TableView />
        </div>
    );
};

export default Users;

