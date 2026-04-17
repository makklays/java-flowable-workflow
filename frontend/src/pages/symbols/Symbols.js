import React, { useState, useEffect, useReducer } from 'react';
import symbolService from '../../services/symbolService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faPenToSquare, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
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
    const [totalElements, setTotalElements] = useState(0);

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useApp();

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [direction, setDirection] = useState('asc');

    const [selectedItems, setSelectedItems] = useState([]);
    const [loadingSymbols, setLoadingSymbols] = useState(false);

    //
    const fetchSymbols = async () => {
        setLoadingSymbols(true);
        try {
            const response = await symbolService.getAllSymbols();
            console.log("Пришли символы:", response); // Проверка в консоли

            // Если используете axios:
            setSymbols(response.data || response);
        } catch (error) {
            console.error("Ошибка при загрузке символов:", error);
        } finally {
            setLoadingSymbols(false); // Здесь спиннер должен выключиться
        }
    };

    /*useEffect(() => {
        fetchSymbols();
    }, []); // Пустые скобки — запуск один раз при старте*/

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
            const response = await symbolService.getAllSymbolsByPages(
                currentPage - 1,
                pageSize,
                search, // Поиск по Title
                `${sortBy},${direction}` // Сортировка (формат Spring Data JPA)
            );
            const page = response.data;
            setSymbols(page.content || page);
            setTotalPages(page.totalPages || 1);
            setTotalElements(page.totalElements || 0);
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
    }, [currentPage, pageSize, user, navigate, search, sortBy, direction]); // Массив зависимостей

    // Обработка загрузки SPOT
    const handleUploadSpot = async (e) => {
        if (e) e.preventDefault(); // Предотвращаем переход по ссылке, если нужно остаться на странице
        setLoadingSymbols(true);    // Сразу включаем спиннер в таблице
        try {
            await symbolService.uploadSpot(); // Ваш запрос к бэкенду
            // После успешной загрузки — обновляем список
            await fetchSymbols();
        } catch (error) {
            console.error("Ошибка при загрузке SPOT:", error);
            alert("Не удалось загрузить SPOT символы");
        } finally {
            setLoadingSymbols(false); // Выключаем спиннер (если fetchSymbols его не выключил)
        }
    };

    // Обработка загрузки Futures (аналогично)
    const handleUploadFutures = async (e) => {
        if (e) e.preventDefault();
        setLoadingSymbols(true);
        try {
            await symbolService.uploadFutures();
            await fetchSymbols();
        } catch (error) {
            console.error("Ошибка при загрузке Futures:", error);
            alert("Не удалось загрузить Futures");
        } finally {
            setLoadingSymbols(false);
        }
    };

    // Функция, которая переключает сортировку при клике
    const handleSort = (column) => {
        if (sortBy === column) {
            // Если та же колонка — инвертируем направление
            setDirection(direction === 'asc' ? 'desc' : 'asc');
        } else {
            // Новая колонка — ставим её и сбрасываем на asc
            setSortBy(column);
            setDirection('asc');
        }
        console.log(column + ' ' + direction);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Всегда возвращаемся на первую страницу при новом поиске
    };

    // форматирую интервал в удобный вид
    const formatTimestamp = (ts) => {
        if (!ts || ts === 0) return "—"; // Если 0, показываем прочерк
        const date = new Date(ts);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    };

    // форматирую дату в удобный вид
    const formatMyDate = (str) => {
        if (!str) return "-";
        const d = new Date(str);
        // Проверка на валидность даты
        if (isNaN(d.getTime())) return str;

        return d.toLocaleDateString('ru-RU') + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    // Постраничная навигация
    const getPageNumbers = () => {
        const pages = [];
        const leftRange = 2; // Сколько страниц показывать слева от текущей
        const rightRange = 2; // Сколько страниц показывать справа от текущей

        for (let i = 1; i <= totalPages; i++) {
            // Всегда показываем:
            // 1. Первую страницу
            // 2. Последнюю страницу
            // 3. Текущую страницу и диапазон вокруг неё
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - leftRange && i <= currentPage + rightRange)
            ) {
                pages.push(i);
            }
            // Если мы пропустили числа между 1 и началом диапазона
            else if (i === 2 && currentPage - leftRange > 2) {
                pages.push('...');
            }
            // Если мы пропустили числа между концом диапазона и последней страницей
            else if (i === totalPages - 1 && currentPage + rightRange < totalPages - 1) {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-6" style={{ marginBottom: '10px' }} >
                    <h1><FontAwesomeIcon icon={faCoins} className="me-2" /> {t('symbols')}</h1>
                    <p style={{ color: '#6c757d' }} >Список всех символов ({totalElements})</p>
                </div>
            </div>

            <div className="row align-items-center mb-3">
                {/* Фильтр */}
                <div className="col-md-6" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <div className="row">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Поиск символа по названию..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
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
                        <th style={{width: '40px', textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" className="custom-checkbox"  name="checkbox_all" /></th>

                        <th style={{ width: '80px', textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('id')} >
                            ID
                            <span className="ms-2 text-muted">
                                 {sortBy === 'id' ? (
                                     direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                 ) : (
                                     <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                 )}
                             </span>
                        </th>

                        <th style={{ verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('symbol')} >
                            Symbol
                            <span className="ms-2 text-muted">
                                 {sortBy === 'symbol' ? (
                                     direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                 ) : (
                                     <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                 )}
                             </span>
                        </th>

                        <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('originalSymbol')} >
                            Symbol origin
                            <span className="ms-2 text-muted">
                                 {sortBy === 'originalSymbol' ? (
                                     direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                 ) : (
                                     <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                 )}
                             </span>
                        </th>

                        <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('baseAsset')} >
                            Base
                            <span className="ms-2 text-muted">
                                 {sortBy === 'baseAsset' ? (
                                     direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                 ) : (
                                     <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                 )}
                             </span>
                        </th>

                        <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('quoteAsset')} >
                            Quote
                            <span className="ms-2 text-muted">
                                 {sortBy === 'quoteAsset' ? (
                                     direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                 ) : (
                                     <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                 )}
                             </span>
                        </th>

                        <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('marketType')} >
                            Market Type
                            <span className="ms-2 text-muted">
                                 {sortBy === 'marketType' ? (
                                     direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                 ) : (
                                     <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                 )}
                             </span>
                        </th>

                        <th style={{ textAlign: 'center', verticalAlign: 'middle'}}>Interval</th>

                        <th style={{ width: '180px', textAlign: 'center', verticalAlign: 'middle' }} onClick={() => handleSort('createdAt')} >
                            Created
                            <span className="ms-2 text-muted">
                                 {sortBy === 'createdAt' ? (
                                     direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                 ) : (
                                     <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                 )}
                             </span>
                        </th>

                        <th style={{width: '200px', textAlign: 'center', verticalAlign: 'middle'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loadingSymbols ? (
                        <tr>
                            <td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>
                                <FontAwesomeIcon icon={faSync} size="3x" spin className="mb-3 text-primary" />
                                <div className="text-muted">Загрузка списка символов...</div>
                            </td>
                        </tr>
                    ) : symbols.length > 0 ? (
                        symbols.map(symbol => (
                            <tr key={symbol.id}>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                    <input type="checkbox" name="checkbox_all" value={symbol.id} />
                                </td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.id}</td>
                                <td style={{verticalAlign: 'middle'}}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleView(symbol.id); }}>
                                        {symbol.symbol}
                                    </a>
                                </td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.originalSymbol}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.baseAsset}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.quoteAsset}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.marketType}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                    {(!symbol.historyStartTime && !symbol.historyEndTime)
                                        ? "—"
                                        : `${formatTimestamp(symbol.historyStartTime)} — ${formatTimestamp(symbol.historyEndTime)}`
                                    }
                                </td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                    {formatMyDate(symbol.createdAt)}
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleView(symbol.id); }} title="View">
                                        <FontAwesomeIcon icon={faEye} />
                                    </a>
                                    <a href="#" className="text-danger" onClick={(e) => handleDelete(e, symbol.id)} title="Delete">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" style={{ textAlign: 'center', padding: '40px' }}>
                                <FontAwesomeIcon icon={faCoins} size="3x" className="mb-3 text-muted" />
                                <div className="text-muted">Данные в базе не найдены</div>
                                <small className="text-muted">Настройте фильтры или добавьте новые символы</small>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Генерация номеров страниц с многоточием */}
            {symbols.length > 0 && totalPages > 1 && (
                <nav aria-label="Page navigation" className="mt-4">
                    <ul className="pagination justify-content-center">

                        {/* В самое начало */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(1)} title="Первая страница">
                                &laquo;
                            </button>
                        </li>

                        {/* Назад */}
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                &lsaquo;
                            </button>
                        </li>

                        {/* Генерация номеров страниц */}
                        {getPageNumbers().map((page, index) => {
                            if (page === '...') {
                                return (
                                    <li key={`sep-${index}`} className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                );
                            }
                            return (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(page)}>
                                        {page}
                                    </button>
                                </li>
                            );
                        })}

                        {/* Вперед */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                                &rsaquo;
                            </button>
                        </li>

                        {/* В самый конец */}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(totalPages)} title="Последняя страница">
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

