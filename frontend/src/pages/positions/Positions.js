import React, { useState, useEffect, useReducer } from 'react';
import positionService from '../../services/positionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan, faPlus, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

// Короткая запись компонента - стрелочная функция
const Positions = () => {

    // 1. Состояние для пользователей
    const [positions, setPositions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useApp();

    // 2. Исправленная функция клика
    const handleClick = (id) => {
        console.log("Клик по ID:", id);
    };

    // Просмотр роли по ID
    const handleView = (id) => {
        navigate(`/positions/${id}`);
    };

    // Редактирование роли по ID
    const handleEdit = (e, id) => {
        e.preventDefault();
        navigate(`/positions/${id}/edit`);
    };

    // Удаляем роль по ID
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Вы уверены, что хотите удалить должность c ID:" + id + " ?")) return;
        console.log("Удалить ID:", id);
        try {
            await positionService.deletePosition(id);
            console.log("Должность успешно удалена");
            // После удаления можно обновить список, например, вызвав функцию загрузки данных
            setPositions(prevPositions => prevPositions.filter(position => position.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении должности", error);
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
        if (selected.size === positions.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(positions.map((item) => item.id)));
        }
    };

    // Удалить выбранные
    const deletedSelected = async () => {
        if (selected.size === 0) return;
        try {
            // Отправляем массив ID на ваш Java Backend
            const response = await fetch('http://localhost:8082/api/v1/positions/ids-delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Array.from(selected)) // Set превращаем в массив
            });
            if (response.ok) {
                // 1. Фильтруем данные в стейте
                setPositions((prev) => prev.filter((item) => !selected.has(item.id)));
                // 2. Очищаем выбор
                setSelected(new Set());
            }
        } catch (error) {
            console.error("Ошибка при удалении:", error);
        }
    }

    useEffect(() => {
        // 1. Если пользователя нет (разлогинился), очищаем данные и делаем редирект
        if (!user) {
            setPositions([]);
            navigate('/login');
            return; // Дальше код не пойдет
        }

        // Создаем асинхронную функцию внутри useEffect
        const fetchPositions = async () => {
            try {
                const response = await positionService.getAllPositionsByPages(currentPage - 1, pageSize);
                // 3. Сохраняем данные в состояние (axios обычно возвращает данные в response.data)
                const positions = response.data;
                if (positions) {
                    setPositions(positions); // ТЕПЕРЬ ДАННЫЕ ПОПАДУТ В ТАБЛИЦУ
                    console.log('---------- Число отделений: ' + positions.length );
                } else {
                    console.warn('---------- Ответ не содержит данных отделений');
                }
                // Если ваш бэкенд (Spring/Node) возвращает объект Page, данные лежат в content
                setPositions(response.data.content || response.data);
                setTotalPages(response.data.totalPages || 1);
            } catch (error) {
                console.error("---------- Ошибка при загрузке отделений:", error);
            }
        }

        fetchPositions(); // ОБЯЗАТЕЛЬНО вызываем функцию здесь

    }, [currentPage, pageSize]);

    return (
        <div>
            <div className="row">
                <div className="col-md-6" style={{ marginBottom: '10px' }} >
                    <h1><FontAwesomeIcon icon={faBriefcase} className="me-2" /> {t('positions')}</h1>
                    <p style={{ color: '#6c757d' }}>Список должностей компании</p>
                </div>
            </div>

            <div className="row align-items-center mb-3">
                {/* Заголовок */}
                <div className="col-md-6" style={{ fontSize: '20px', fontWeight: 'bold' }}>{t('positions')}</div>
                {/* Кнопка */}
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <Link to="/positions/add" className="btn btn-primary">
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
                            <input type="checkbox" className="custom-checkbox" onChange={toggleAll} checked={selected.size === positions.length && positions.length > 0} />
                        </th>
                        <th style={{width: '60px', textAlign: 'center', verticalAlign: 'middle'}}>ID</th>
                        <th style={{verticalAlign: 'middle'}}>Title</th>
                        <th style={{width: '120px', textAlign: 'center', verticalAlign: 'middle'}}>Created</th>
                        <th style={{width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.length > 0 ? positions.map(position => (
                        <tr key={position.id}>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <input type="checkbox" className="custom-checkbox" value={position.id} checked={selected.has(position.id)} onChange={() => toggleRow(position.id)} />
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{position.id}</td>
                            <td style={{verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(position.id)} >{position.title}</a>
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{position.createdAt}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(position.id)} title="View" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                                <a href="#" onClick={(e) => { handleEdit(e, position.id) }} title="Edit" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="#" onClick={(e) => handleDelete(e, position.id)} title="Delete" style={{ cursor: "pointer" }} >
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
            {positions.length > 0 && totalPages > 1 && (
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

export default Positions;

