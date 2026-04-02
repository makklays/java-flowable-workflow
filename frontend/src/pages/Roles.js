import React, { useState, useEffect, useReducer } from 'react';
import roleService from '../services/roleService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const Roles = () => {

    // 1. Состояние для пользователей
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([]);

    // 2. Исправленная функция клика
    const handleClick = (id) => {
        console.log("Клик по ID:", id);
    };

    // Просмотр роли по ID
    const handleView = (id) => {
        navigate(`/roles/${id}`);
    };

    // Редактирование роли по ID
    const handleEdit = (e, id) => {
        e.preventDefault();
        navigate(`/roles/${id}/edit`);
    };

    // Удаляем роль по ID
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Вы уверены, что хотите удалить роль c ID:" + id + " ?")) return;
        console.log("Удалить ID:", id);
        try {
            await roleService.deleteRole(id);
            console.log("Роль успешно удалена");
            // После удаления можно обновить список, например, вызвав функцию загрузки данных
            setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении роли", error);
        }
    }

    useEffect(() => {
        // Создаем асинхронную функцию внутри useEffect
        const fetchRoles = async () => {
            try {
                const response = await roleService.getAllRolesByPages(currentPage - 1, pageSize);
                // 3. Сохраняем данные в состояние (axios обычно возвращает данные в response.data)
                const page = response.data;
                if (page) {

                    console.log("Весь ответ:", page);
                    console.log("Контент:", page.content);
                    console.log("Количество элементов:", page.content.length);
                    console.log("Всего страниц:", page.totalPages);

                    setRoles(page.content); // ТЕПЕРЬ ДАННЫЕ ПОПАДУТ В ТАБЛИЦУ
                    console.log('---------- Число отделений: ' + page.content.length );
                    //console.table(page.content);
                } else {
                    console.warn('---------- Ответ не содержит данных отделений');
                }
                // Если ваш бэкенд (Spring/Node) возвращает объект Page, данные лежат в content
                setRoles(response.data.content || response.data);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("---------- Ошибка при загрузке отделений:", error);
            }
        }

        fetchRoles(); // ОБЯЗАТЕЛЬНО вызываем функцию здесь

    }, [currentPage, pageSize]);

    return (
        <div>
            <h1>{t('roles')}</h1>
            <p>Здесь будет список ролей...</p>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2">
                    {/* Поиск */}
                    <div className="input-group" style={{ width: '300px' }}>
                        <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                        <input type="text" className="form-control" placeholder="Поиск по названию..." />
                    </div>

                    {/* Массовое действие (скрыто, если selected.length === 0) */}
                    {selectedItems.length > 0 && (
                        <button className="btn btn-danger animate__animated animate__fadeIn">
                            <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                            Удалить ({selectedItems.length})
                        </button>
                    )}
                </div>

                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Добавить
                </button>
            </div>

            <div className="row align-items-center mb-3">
                {/* Заголовок */}
                <div className="col-md-6" style={{ fontSize: '20px', fontWeight: 'bold' }}>{t('roles')}</div>
                {/* Кнопка */}
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <Link to="/roles/add" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Добавить
                    </Link>
                </div>
            </div>

            <table style={{width: '100%', border: '1px solid #e7e7e7', borderRadius: '10px', borderCollapse: 'collapse'}} className="table table-striped" >
                <thead>
                    <tr>
                        <th style={{width: '40px', textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" /></th>
                        <th style={{width: '60px', textAlign: 'center', verticalAlign: 'middle'}}>ID</th>
                        <th style={{verticalAlign: 'middle'}}>Title</th>
                        <th style={{width: '120px', textAlign: 'center', verticalAlign: 'middle'}}>Created</th>
                        <th style={{width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length > 0 ? roles.map(role => (
                        <tr key={role.id}>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" value={role.id} /></td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{role.id}</td>
                            <td style={{verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(role.id)} >{role.title}</a>
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{role.createdAt}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(role.id)} title="View" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                                <a href="#" onClick={(e) => { handleEdit(e, role.id) }} title="Edit" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="#" onClick={(e) => handleDelete(e, role.id)} title="Delete" style={{ cursor: "pointer" }} >
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
            {roles.length > 0 && totalPages > 1 && (
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
        </div>
    );
};

export default Roles;