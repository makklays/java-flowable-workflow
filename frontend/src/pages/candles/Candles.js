import React, { useState, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan, faPlus, faDownload, faChartBar, faBolt, faFileImport, faSync, faDatabase, faCoins, faSitemap, faSortUp, faSortDown, faSort,  } from '@fortawesome/free-solid-svg-icons';
import { CandlestickChart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Table, Card, Collapse } from 'react-bootstrap';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { user, useApp } from '../../context/AppContext';

import Select from 'react-select';

/**
 * Candles - страница для отображения информации о свечах.
 *
 * @author Alexander Kuziv
 * @since 07.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */
// Короткая запись компонента - стрелочная функция
const Candles = () => {
    // 1. Состояние для пользователей
    const [candles, setCandles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    // Вспомогательная функция для формата ГГГГ-ММ-ДД
    const formatDate = (date) => date.toISOString().split('T')[0];

    const today = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(today.getMonth() - 2);

    const [formData, setFormData] = useState({
        symbol: '',
        startDate: formatDate(twoMonthsAgo), // 2 месяца назад
        endDate: formatDate(today),          // Сегодня
        timeframe: '1m',                     // Устанавливаем M1 активным сразу
    });
    const [errors, setErrors] = useState({});

    const [showForm, setShowForm] = useState(false);

    const [symbols, setSymbols] = useState([]); // Состояние для списка символов
    const [loadingSymbols, setLoadingSymbols] = useState(true); // Состояние загрузки

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useApp();

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [direction, setDirection] = useState('asc');

    // состояние загрузки
    const [isUploading, setIsUploading] = useState(false);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Просмотр роли по ID
    const handleView = (id) => {
        navigate(`/candles/${id}`);
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

    // Загрузка данных с Binance
    const handleUploadData = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        // Валидация формы
        const newErrors = {};
        if (!formData.symbol) newErrors.symbol = "Символ обязателен";
        if (!formData.startDate) newErrors.startDate = "Дата начала обязательна";
        if (!formData.endDate) newErrors.endDate = "Дата окончания обязательна";
        if (!formData.timeframe) newErrors.timeframe = "Таймфрейм обязателен";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // Если есть ошибки, не отправляем

        delay(1000); // Имитируем задержку для демонстрации загрузки

        try {
            // Подготовка параметров для URL
            const params = new URLSearchParams({
                symbolId: formData.symbol, // Это ID из вашего Select
                symbol: options.find(o => o.value === formData.symbol)?.original.symbol, // Получаем имя (BTCUSDT)
                timeframe: formData.timeframe,
                start: new Date(formData.startDate).getTime(), // Конвертация в Long
                end: new Date(formData.endDate).getTime()      // Конвертация в Long
            });

            const response = await fetch(`http://localhost:8082/api/v1/candles/upload-binance?${params}`, {
                method: 'POST', // Соответствует исправленному бэкенду
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Ошибка сервера');

            alert("Данные успешно загружены!");
            // Здесь можно вызвать функцию обновления таблицы, например: fetchCandles();
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при загрузке");
        } finally {
            setIsUploading(false);
        }
    }

    useEffect(() => {
        // Функция для получения данных
        const fetchSymbols = async () => {
            try {
                // Замените URL на ваш реальный эндпоинт
                const response = await fetch('http://localhost:8082/api/v1/symbols');
                const data = await response.json();
                setSymbols(data); // Предполагаем, что бэкенд возвращает массив объектов или строк
            } catch (error) {
                console.error("Ошибка при загрузке символов:", error);
            } finally {
                setLoadingSymbols(false);
            }
        };
        fetchSymbols();
    }, []);  // Пустой массив означает, что запрос выполнится 1 раз при загрузке страницы

    // 1. Подготовим данные для поиска
    const options = symbols.map(sym => ({
        value: sym.id,
        label: `ID:${sym.id} ${sym.symbol} (${sym.marketType})`,
        // Сохраняем оригинальный объект, если понадобится позже
        original: sym
    }));

    // 2. Стили для соответствия Bootstrap
    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            minHeight: '38px', // Стандартная высота Bootstrap input
            // Цвет рамки: если ошибка — красный, если фокус — синий, иначе серый
            borderColor: state.isFocused ? '#86b7fe' : '#dee2e6',
            // Тень при фокусе (синее свечение Bootstrap)
            boxShadow: state.isFocused
                ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)'
                : 'none',
            '&:hover': {
                borderColor: state.isFocused ? '#86b7fe' : '#adb5bd'
            },
            transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out' // Плавность как в Bootstrap
        }),
    };

    return (
        <div>
            <div className="row d-flex align-items-end">
                <div className="col-md-6">
                    <h1>
                        {/* SVG иконка CandlestickChart из Lucide (вместо FontAwesome) */}
                        <svg
                            width="50" height="50"
                            viewBox="0 0 30 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-secondary"
                            style={{ verticalAlign: 'middle' }}
                        >
                            <path d="M9 5v4" /><rect width="4" height="6" x="7" y="9" rx="1" />
                            <path d="M9 15v4" /><path d="M17 3v2" />
                            <rect width="4" height="8" x="15" y="5" rx="1" />
                            <path d="M17 13v8" /><path d="M3 3v18h18" />
                        </svg>
                        {t('candles')}
                    </h1>
                    <p>Список всех свечей (0)</p>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right', marginBottom: '10px' }} >
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        <FontAwesomeIcon icon={faDownload} className="me-2" />
                        {showForm ? 'Скрыть форму' : 'Загрузить данные'}
                    </button>
                </div>
            </div>

            {/* Этот блок будет появляться и исчезать */}
            {showForm && (
                <div className="row">
                    <div className="col-md-10">
                        <div className="card" style={{ marginBottom: '30px', backgroundColor: '#f2f2f2', border: '1px #f2f2f2 solid' }}>
                            <div className="card-body">
                                <div className="row">

                                    {/* Символ */}
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label required">Символ</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FontAwesomeIcon icon={faCoins} />
                                                </span>
                                                <Select className={`form-control p-0 border-0`}
                                                    options={options}
                                                    isLoading={loadingSymbols}
                                                    placeholder="Поиск символа..."
                                                    isSearchable={true} // Включает поиск по части слова
                                                    value={options.find(opt => opt.value === formData.symbol) || null}
                                                    onChange={(selectedOption) => {
                                                        const val = selectedOption ? selectedOption.value : '';
                                                        setFormData({...formData, symbol: val});
                                                        if (val) setErrors(prev => ({...prev, symbol: null}));
                                                    }}
                                                    styles={customStyles }
                                                    noOptionsMessage={() => "Ничего не найдено"}
                                                />
                                            </div>
                                            {errors.symbol && <div className="text-danger small mt-1">{errors.symbol}</div>}
                                        </div>
                                    </div>

                                    {/* Дата начала */}
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label required">Дата начала</label>
                                            <input className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                                                type="date"
                                                value={formData.startDate || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setFormData({...formData, startDate: val});
                                                    if (val) setErrors(prev => ({...prev, startDate: null}));
                                                }}
                                            />
                                            {errors.startDate && <div className="text-danger small mt-1">{errors.startDate}</div>}
                                        </div>
                                    </div>

                                    {/* Дата окончания */}
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label required">Дата окончания</label>
                                            <input className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                                                type="date"
                                                value={formData.endDate || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setFormData({...formData, endDate: val});
                                                    if (val) setErrors(prev => ({...prev, endDate: null}));
                                                }}
                                            />
                                            {errors.endDate && <div className="text-danger small mt-1">{errors.endDate}</div>}
                                        </div>
                                    </div>

                                    {/* Таймфрейм */}
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label required">Таймфрейм</label>
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <FontAwesomeIcon icon={faSync} /> {/* Можно сменить иконку */}
                                                </span>
                                                <select
                                                    className={`form-select ${errors.timeframe ? 'is-invalid' : ''}`}
                                                    value={formData.timeframe || ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setFormData({...formData, timeframe: val});
                                                        if (val) setErrors(prev => ({...prev, timeframe: null}));
                                                    }}
                                                >
                                                    <option value="" disabled>Выберите таймфрейм...</option>
                                                    <option value="1m">M1</option>
                                                    <option value="15m">M15</option>
                                                    <option value="30m">M30</option>
                                                    <option value="1h">H1</option>
                                                    <option value="4h">H4</option>
                                                    <option value="12h">H12</option>
                                                    <option value="1d">D1</option>
                                                    <option value="1w">W1</option>
                                                    <option value="mn">MN</option>
                                                </select>
                                            </div>
                                            {errors.timeframe && <div className="text-danger small mt-1">{errors.timeframe}</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Кнопка действия */}
                                <div className="row mt-2">
                                    <div className="col-md-4">
                                        <button className="btn btn-success" disabled={isUploading} onClick={(e) => { handleUploadData(e); console.log('Загрузка...', formData); }}>
                                            <FontAwesomeIcon icon={isUploading ? faSync : faBolt} className={`me-2 ${isUploading ? 'fa-spin' : ''}`} />
                                            {isUploading ? 'Загрузка...' : 'Загрузить данные'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                <div className="col-md-6" style={{ textAlign: 'right' }}></div>
            </div>

            <div style={{ position: 'relative' }}> {/* Контейнер для позиционирования */}
                {/* Прелоадер накладывается сверху только при загрузке */}
                {isUploading && (
                    <div className="table-overlay">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faSync} spin size="3x" className="text-primary mb-2" />
                            <div className="text-primary fw-bold">Обновление данных...</div>
                        </div>
                    </div>
                )}

                <table style={{
                            width: '100%',
                            border: '1px solid #e7e7e7',
                            opacity: isUploading ? 0.5 : 1, // Слегка приглушаем таблицу
                            pointerEvents: isUploading ? 'none' : 'auto' // Блокируем клики
                       }} className="table table-striped" >
                    <thead>
                        <tr>
                            <th style={{width: '40px', textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" /></th>

                            <th style={{ width: '80px', textAlign: 'center', verticalAlign: 'middle' }} onClick={() => handleSort('id')} >
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
                        </tr>
                    </thead>
                    <tbody>
                        {candles.length > 0 ? candles.map(symbol => (
                            <tr key={symbol.id}>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}><input type="checkbox" name="checkbox_all" value={symbol.id} /></td>
                                <td style={{textAlign: 'center', verticalAlign: 'middle'}}>{symbol.id}</td>
                                <td style={{verticalAlign: 'middle'}}>
                                    <a href="#" onClick={() => handleView(symbol.id)} >{symbol.symbol}</a>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="10" style={{ textAlign: 'center', padding: '20px' }}>
                                    <FontAwesomeIcon icon={faCoins} size="3x" className="mb-3 text-muted" />
                                    <div className="text-muted">Нет данных для отображения</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Candles;

