import React from 'react';
import TableView from '../components/TableView';

// Короткая запись компонента - стрелочная функция
const Users = () => {
    return (
        <div>
            <h1>Пользователи</h1>
            {/* Вызываем ваш компонент с таблицей */}
            <TableView />
        </div>
    );
};

export default Users;

