import React, { useState, useEffect, useReducer } from 'react';
import positionService from '../services/positionService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const Positions = () => {

    // 1. Состояние для пользователей
    const [positions, setPositions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);

    const { t, i18n } = useTranslation();

    // 2. Исправленная функция клика
    const handleClick = (id) => {
        console.log("Клик по ID:", id);
    };

    useEffect(() => {
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
            <h1>{t('positions')}</h1>
            <p>Здесь будет список должностей компании...</p>

            <div className="row align-items-center mb-3">
                {/* Заголовок */}
                <div className="col-md-6" style={{ fontSize: '20px', fontWeight: 'bold' }}>Отделения</div>
                {/* Кнопка */}
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <Link to="/positions/add" className="btn btn-primary">
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
                    {positions.length > 0 ? positions.map(position => (
                        <tr key={position.id}>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" value={position.id} /></td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{position.id}</td>
                            <td style={{verticalAlign: 'middle'}}>
                                <a href="#"  >{position.title}</a>
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{position.created_at}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleClick(position.id) }} title="View">
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleClick(position.id) }} title="Edit">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleClick(position.id) }} title="Delete" >
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

