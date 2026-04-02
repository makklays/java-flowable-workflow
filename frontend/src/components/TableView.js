import React, { useState, useEffect, useReducer } from 'react';
import userService from '../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const TableView = () => {

    // 1. Состояние для пользователей
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    // 2. Исправленная функция клика
    const handleClick = (id) => {
        console.log("Клик по ID:", id);
    };

    // Просмотр роли по ID
    const handleView = (id) => {
        navigate(`/users/${id}`);
    };

    // Редактирование роли по ID
    const handleEdit = (e, id) => {
        e.preventDefault();
        navigate(`/users/${id}/edit`);
    };

    // Удаляем роль по ID
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Вы уверены, что хотите удалить пользователя c ID:" + id + " ?")) return;
        console.log("Удалить ID:", id);
        try {
            await userService.deleteUser(id);
            console.log("Пользователь успешно удален");
            // После удаления можно обновить список, например, вызвав функцию загрузки данных
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении пользователя", error);
        }
    }

    useEffect(() => {
        // Создаем асинхронную функцию внутри useEffect
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers(currentPage - 1, pageSize);
                // 3. Сохраняем данные в состояние (axios обычно возвращает данные в response.data)
                const users = response.data;
                if (users) {
                    setUsers(users); // ТЕПЕРЬ ДАННЫЕ ПОПАДУТ В ТАБЛИЦУ
                    console.log('---------- Число пользователей: ' + users.length );
                } else {
                    console.warn('---------- Ответ не содержит данных пользователей');
                }
                // Если ваш бэкенд (Spring/Node) возвращает объект Page, данные лежат в content
                setUsers(response.data.content || response.data);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("---------- Ошибка при загрузке пользователей:", error);
            }
        }

        fetchUsers(); // ОБЯЗАТЕЛЬНО вызываем функцию здесь

    }, [currentPage, pageSize]); // Массив зависимостей

    return (
        <>
            <div className="row align-items-center mb-3">
                {/* Заголовок */}
                <div className="col-md-6" style={{ fontSize: '20px', fontWeight: 'bold' }}>Пользователи</div>
                {/* Кнопка */}
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <Link to="/users/add" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Добавить
                    </Link>
                </div>
            </div>
            <table style={{width: '100%', border: '1px solid #e7e7e7', borderRadius: '10px', borderCollapse: 'collapse'}} className="table table-striped" >
                <thead>
                    <tr>
                        <th style={{width: '40px', textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" /></th>
                        <th style={{width: '60px', textAlign: 'center', verticalAlign: 'middle'}}>ID</th>
                        <th style={{verticalAlign: 'middle'}}>Display name</th>
                        <th style={{width: '280px', textAlign: 'center', verticalAlign: 'middle'}}>Username</th>
                        <th style={{width: '280px', textAlign: 'center', verticalAlign: 'middle'}}>Full name</th>
                        <th style={{width: '280px', textAlign: 'center', verticalAlign: 'middle'}}>Phone</th>
                        <th style={{width: '280px', textAlign: 'center', verticalAlign: 'middle'}}>E-mail</th>
                        <th style={{width: '120px', textAlign: 'center', verticalAlign: 'middle'}}>Age</th>
                        <th style={{width: '120px', textAlign: 'center', verticalAlign: 'middle'}}>Photo</th>
                        <th style={{width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map(user => (
                        <tr key={user.id}>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" value={user.id} /></td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{user.id}</td>
                            <td style={{verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(user.id)} >{user.displayname}</a>
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{user.username}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{user.firstname} {user.lastname}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{user.phone}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{user.email}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{user.age ? user.age : '-'}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{user.is_picture_set ? 'да' : 'нет'}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(user.id)} title="View" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                                <a href="#" onClick={(e) => { handleEdit(e, user.id) }} title="Edit" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="#" onClick={(e) => handleDelete(e, user.id)} title="Delete" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </a>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan="10" style={{textAlign: 'center', marginTop: '20px', verticalAlign: 'middle'}}>Нет данных...</td></tr>
                    )}
                </tbody>
            </table>

            {/* Проверяем, есть ли пользователи и больше ли одной страницы */}
            {users.length > 0 && totalPages > 1 && (
                <nav aria-label="Page navigation" className="mt-4">
                    <ul className="pagination justify-content-center">
                        {/* Кнопка Назад */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                &laquo;
                            </button>
                        </li>

                        {/* Генерация номеров страниц */}
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(pageNumber)}>
                                        {pageNumber}
                                    </button>
                                </li>
                            );
                        })}

                        {/* Кнопка Вперед */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}

// 4. Правильный экспорт
export default TableView;

