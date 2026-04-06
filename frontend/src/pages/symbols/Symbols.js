import React, { useState, useEffect, useReducer } from 'react';
import symbolService from '../../services/symbolService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faPenToSquare, faTrashCan, faPlus, faCoins, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { user, useApp } from '../../context/AppContext';

/**
 * Symbols - страница для отображения информации о символах.
 *
 * @author Alexander Kuziv
 * @since 05.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */

// Короткая запись компонента - стрелочная функция
const Symbols = () => {

    // 1. Состояние для пользователей
    const [symbols, setSymbols] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useApp();

    const [selectedItems, setSelectedItems] = useState([]);

    // 2. Исправленная функция клика
    const handleClick = (id) => {
        console.log("Клик по ID:", id);
    };

    // Просмотр роли по ID
    const handleView = (id) => {
        navigate(`/symbols/${id}`);
    };

    // Удаляем роль по ID
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Вы уверены, что хотите удалить роль c ID:" + id + " ?")) return;
        console.log("Удалить ID:", id);
        try {
            await symbolService.deleteSymbol(id);
            console.log("Роль успешно удалена");
            // После удаления можно обновить список, например, вызвав функцию загрузки данных
            setSymbols(prevSymbols => prevSymbols.filter(symbol => symbol.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении роли", error);
        }
    }

    // 1. Создаем функцию запроса данных
    const loadData = async () => {
        try {
            const response = await symbolService.getAllSymbolsByPages(currentPage - 1, pageSize);
            const page = response.data;
            setSymbols(page.content || page);
            setTotalPages(page.totalPages || 1);
        } catch (error) {
            console.error("Ошибка при загрузке:", error);
        }
    };

    useEffect(() => {
        // 1. Если пользователя нет (разлогинился), очищаем данные и делаем редирект
        if (!user) {
            setSymbols([]);
            navigate('/login');
            return; // Дальше код не пойдет
        }
        loadData();
    }, [currentPage, pageSize, user, navigate]); // Массив зависимостей

    const handleUploadSpot = async (e) => {
        e.preventDefault();
        try {
            console.log("Загрузить SPOT");
            // Вызываем сервис загрузки
            await symbolService.uploadSpot();
            // После успешной загрузки обновляем список в таблице
            await loadData();
            console.log("Данные SPOT успешно обновлены");
        } catch (error) {
            console.error("Ошибка при загрузке SPOT:", error);
            alert("Не удалось загрузить данные");
        }
    }

    const handleUploadFutures = async (e) => {
        e.preventDefault();
        try {
            console.log("Загрузить Futures");
            // Вызываем сервис загрузки
            await symbolService.uploadFutures();
            // После успешной загрузки обновляем список в таблице
            await loadData();
            console.log("Данные Futures успешно обновлены");
        } catch (error) {
            console.error("Ошибка при загрузке Futures:", error);
            alert("Не удалось загрузить данные");
        }
    }

    return (
        <div>
            <h1><FontAwesomeIcon icon={faCoins} className="me-2" /> {t('symbols')}</h1>
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
            </div>

            <div className="row align-items-center mb-3">
                {/* Заголовок */}
                <div className="col-md-6" style={{ fontSize: '20px', fontWeight: 'bold' }}>{t('symbols')}</div>
                {/* Кнопка */}
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <Link to="/symbols/upload-spot" onClick={(e) => { handleUploadSpot(e) }} className="btn btn-primary" style={{ marginRight: '10px' }} >
                        <FontAwesomeIcon icon={faCoins} className="me-2" /> Загрузить SPOT
                    </Link>
                    <Link to="/symbols/upload-futures" onClick={(e) => { handleUploadFutures(e) }} className="btn btn-primary">
                        <FontAwesomeIcon icon={faCoins} className="me-2" /> Загрузить Futures
                    </Link>
                </div>
            </div>

            <table style={{width: '100%', border: '1px solid #e7e7e7', borderRadius: '10px', borderCollapse: 'collapse'}} className="table table-striped" >
                <thead>
                    <tr>
                        <th style={{width: '40px', textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" /></th>
                        <th style={{width: '80px', textAlign: 'center', verticalAlign: 'middle'}}>ID</th>
                        <th style={{verticalAlign: 'middle'}}>Symbol</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle'}}>Symbol Origin</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle'}}>Base</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle'}}>Quote</th>
                        <th style={{ textAlign: 'center', verticalAlign: 'middle'}}>Market Type</th>

                        <th style={{ textAlign: 'center', verticalAlign: 'middle'}}>Interval</th>

                        <th style={{width: '120px', textAlign: 'center', verticalAlign: 'middle'}}>Created</th>
                        <th style={{width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {symbols.length > 0 ? symbols.map(symbol => (
                        <tr key={symbol.id}>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" value={symbol.id} /></td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.id}</td>
                            <td style={{verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(symbol.id)} >{symbol.symbol}</a>
                            </td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.originalSymbol}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.baseAsset}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.quoteAsset}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.marketType}</td>

                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.historyStartTime} - {symbol.historyEndTime}</td>

                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.createdAt}</td>
                            <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <a href="#" onClick={() => handleView(symbol.id)} title="View" style={{ cursor: "pointer" }} >
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                                <a href="#" onClick={(e) => handleDelete(e, symbol.id)} title="Delete" style={{ cursor: "pointer" }} >
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
            {symbols.length > 0 && totalPages > 1 && (
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

export default Symbols;

