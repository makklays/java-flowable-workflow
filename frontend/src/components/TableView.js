import React, { useState, useEffect, useReducer } from 'react';
import userService from '../services/userService';

const TableView = () => {

    // 1. Состояние для пользователей
    const [users, setUsers] = useState([]);

    // 2. Исправленная функция клика
    const handleClick = (id) => {
        console.log("Клик по ID:", id);
    };

    useEffect(() => {
        // Создаем асинхронную функцию внутри useEffect
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                // 3. Сохраняем данные в состояние (axios обычно возвращает данные в response.data)
                const users = response.data;
                if (users) {
                    setUsers(users); // ТЕПЕРЬ ДАННЫЕ ПОПАДУТ В ТАБЛИЦУ
                    console.log('Число пользователей: ' + users.length );
                }
            } catch (error) {
                console.error("Ошибка при загрузке пользователей:", error);
            }
        }

        fetchUsers(); // ОБЯЗАТЕЛЬНО вызываем функцию здесь

    }, []); // Массив зависимостей

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
                <th><input type="checkbox" name="checkbox_all" /></th>
                <th>ID</th>
                <th>Username</th>
                <th>E-mail</th>
                <th>Actions</th>
            </tr>

            {users.map(user => (
                <tr key={user.id}>
                    <td><input type="checkbox" name="checkbox_all" value={user.id} /></td>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleClick(user.id) }} >view</a> |
                        <a href="#" onClick={(e) => { e.preventDefault(); handleClick(user.id) }} >edit</a> |
                        <a href="#" onClick={(e) => { e.preventDefault(); handleClick(user.id) }} >delete</a>
                    </td>
                </tr>
            ))}
        </table>
    );
}

// 4. Правильный экспорт
export default TableView;

