import React, { useState, useEffect, useRef } from 'react';
import departmentService from '../../services/departmentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan, faPlus, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import { useTranslation } from 'react-i18next';
import { user, useApp } from '../../context/AppContext';

// Короткая запись компонента - стрелочная функция
const Departments = () => {

    // 1. Состояние для пользователей
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useApp();

    // Просмотр роли по ID
    const handleView = (id) => {
        navigate(`/departments/${id}`);
    };

    // Редактирование роли по ID
    const handleEdit = (e, id) => {
        e.preventDefault();
        navigate(`/departments/${id}/edit`);
    };

    // Удаляем роль по ID
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Вы уверены, что хотите удалить отделение c ID:" + id + " ?")) return;
        console.log("Удалить ID:", id);
        try {
            await departmentService.deleteDepartment(id);
            console.log("Отделение успешно удалено");
            // После удаления можно обновить список, например, вызвав функцию загрузки данных
            setDepartments(prevDepartments => prevDepartments.filter(department => department.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении отделения", error);
        }
    }

    const [selected, setSelected] = useState(new Set());

    // Переключение одной строки
    const toggleRow = (id) => {
        setSelected((prev) => {
            const newSet = new Set(prev);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            return newSet;
        });
    };

    // Выбрать / снять все
    const toggleAll = () => {
        if (selected.size === departments.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(departments.map((item) => item.id)));
        }
    };

    // Удалить выбранные
    const deletedSelected = async () => {
        if (selected.size === 0) return;
        const idsArray = Array.from(selected); // Превращаем Set в массив для JSON
        try {
            const response = await fetch('http://localhost:8082/api/v1/departments/ids-delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(idsArray)
            });
            if (response.ok) {
                // Удаляем локально из стейта только после успешного ответа сервера
                setDepartments((prev) => prev.filter((item) => !selected.has(item.id)));
                setSelected(new Set());
            }
        } catch (error) {
            console.error("Ошибка при удалении:", error);
        }
    };

    useEffect(() => {
        // 1. Если пользователя нет (разлогинился), очищаем данные и делаем редирект
        if (!user) {
            setDepartments([]);
            navigate('/login');
            return; // Дальше код не пойдет
        }

        // Создаем асинхронную функцию внутри useEffect
        const fetchDepartments = async () => {
            try {
                const response = await departmentService.getAllDepartmentsByPages(currentPage - 1, pageSize);
                // 3. Сохраняем данные в состояние (axios обычно возвращает данные в response.data)
                const departments = response.data;
                if (departments) {
                    setDepartments(departments); // ТЕПЕРЬ ДАННЫЕ ПОПАДУТ В ТАБЛИЦУ
                    console.log('---------- Число отделений: ' + departments.length );
                } else {
                    console.warn('---------- Ответ не содержит данных отделений');
                }
                // Если ваш бэкенд (Spring/Node) возвращает объект Page, данные лежат в content
                setDepartments(response.data.content || response.data);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("---------- Ошибка при загрузке отделений:", error);
            }
        }

        fetchDepartments(); // ОБЯЗАТЕЛЬНО вызываем функцию здесь

    }, [currentPage, pageSize, user, navigate]);

    return (
        <div>
            <div className="row">
                <div className="col-md-6" style={{ marginBottom: '10px' }} >
                    <h1><FontAwesomeIcon icon={faSitemap} className="me-2" /> {t('departments')}</h1>
                    <p style={{ color: '#6c757d' }}>Список отделений компании</p>
                </div>
            </div>

            <div className="row align-items-center mb-3">
                {/* Заголовок */}
                <div className="col-md-6" style={{ fontSize: '20px', fontWeight: 'bold' }}>{t('departments')}</div>
                {/* Кнопка */}
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <Link to="/departments/add" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Добавить
                    </Link>
                </div>
            </div>

            {selected.size > 0 && (
                <div style={{ marginBottom: '10px', marginLeft: '20px' }} >
                    <a href="#" onClick={deletedSelected} >{t('deleteSelected')}</a>
                </div>
            )}
            <table style={{width: '100%', border: '1px solid #e7e7e7', borderRadius: '10px', borderCollapse: 'collapse'}} className="table table-striped" >
                <thead>
                    <tr>
                        <th style={{width: '40px', textAlign: 'center', verticalAlign: 'middle'}}>
                            <input type="checkbox" className="custom-checkbox" onChange={toggleAll} checked={selected.size === departments.length && departments.length > 0} />
                        </th>
                        <th style={{width: '60px', textAlign: 'center', verticalAlign: 'middle'}}>ID</th>
                        <th style={{verticalAlign: 'middle'}}>Title</th>
                        <th style={{width: '120px', textAlign: 'center', verticalAlign: 'middle'}}>Created</th>
                        <th style={{width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.length > 0 ? departments.map(depart => (
                        <tr key={depart.id}>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <input type="checkbox" className="custom-checkbox" value={depart.id} checked={selected.has(depart.id)} onChange={() => toggleRow(depart.id)} />
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{depart.id}</td>
                            <td style={{verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(depart.id)} >{depart.title}</a>
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{depart.createdAt}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(depart.id)} title="View" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                                <a href="#" onClick={(e) => { handleEdit(e, depart.id) }} title="Edit" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="#" onClick={(e) => handleDelete(e, depart.id)} title="Delete" style={{ cursor: "pointer" }} >
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
            {departments.length > 0 && totalPages > 1 && (
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

export default Departments;

