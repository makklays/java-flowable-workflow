import React, { useState, useEffect, useMemo } from 'react';
import candleService from '../../services/candleService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faDownload, faChartLine, faEye, faBolt, faSync, faChartArea,
        faCoins, faSortUp, faSortDown, faSort,  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    const [searchParams] = useSearchParams();
    // 1. Извлекаем начальное значение поиска из URL один раз
    const initialSearch = searchParams.get('search') || '';

    // 1. Состояние для пользователей
    const [candles, setCandles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100); // элементов на странице
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [search, setSearch] = useState(initialSearch);
    const [sortBy, setSortBy] = useState('id');
    const [direction, setDirection] = useState('asc');

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

    const [symbols, setSymbols] = useState([]); // Состояние для выпадающего списка символов
    const [loadingSymbols, setLoadingSymbols] = useState(true); // Состояние загрузки

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user } = useApp();

    // состояние загрузки
    const [isUploading, setIsUploading] = useState(false);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Просмотр роли по ID
    const handleView = (id) => {
        navigate(`/candles/${id}`);
    };

    // Указываем изначальные значения в форму для загрузки данных с Binance
    // 1. Подготовим данные для поиска
    // Используем useMemo, чтобы массив не пересоздавался при каждом рендере
    const options = useMemo(() => {
        return symbols.map(sym => ({
            value: sym.id,
            label: `ID:${sym.id} ${sym.symbol} (${sym.marketType})`,
            symbolName: sym.symbol,
            original: sym
        }));
    }, [symbols]); // Пересчитывать только если изменился стейт symbols

    // 2. ЗАТЕМ ИСПОЛЬЗУЕМ options В useEffect
    useEffect(() => {
        const uploadMode = searchParams.get('upload');
        const symbolFromUrl = searchParams.get('search');

        if (uploadMode === 'true') {
            setShowForm(true);
        }

        if (symbolFromUrl && options.length > 0) {
            // Ищем внутри оригинального объекта символа
            const foundOption = options.find(opt =>
                opt.original.symbol.toLowerCase() === symbolFromUrl.toLowerCase()
            );

            if (foundOption) {
                setFormData(prev => ({ ...prev, symbol: foundOption.value }));
            }
        }
    }, [searchParams, options]); // Теперь options определена и доступна здесь

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

    // Поле поиска и фильтра
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Всегда возвращаемся на первую страницу при новом поиске
    };

    // Удаляем свечу по ID
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if (!window.confirm("Вы уверены, что хотите удалить свечу c ID:" + id + " ?")) return;
        console.log("Удалить ID:", id);
        try {
            await candleService.deleteCandle(id);
            console.log("Свеча успешно удалена");
            // После удаления можно обновить список, например, вызвав функцию загрузки данных
            setCandles(prevCandles => prevCandles.filter(candle => candle.id !== id));
        } catch (error) {
            console.error("Ошибка при удалении свечи", error);
        }
    }

    // Загрузка данных с Binance
    const handleUploadData = async (e) => {
        e.preventDefault();

        // 1. Сначала сбрасываем старое состояние
        setErrors({});
        // НЕ ставим setIsUploading(true) здесь!

        const newErrors = {};
        // Валидация на пустые поля
        if (!formData.symbol) newErrors.symbol = "Символ обязателен";
        if (!formData.startDate) newErrors.startDate = "Дата начала обязательна";
        if (!formData.endDate) newErrors.endDate = "Дата окончания обязательна";
        if (!formData.timeframe) newErrors.timeframe = "Таймфрейм обязателен";

        const start = new Date(formData.startDate);
        start.setHours(0, 0, 0, 0);
        const startTime = start.getTime();

        const endDate = new Date(formData.endDate);
        endDate.setHours(23, 59, 59, 999);
        const endTime = endDate.getTime();

        if (startTime >= endTime) {
            newErrors.endDate = "Дата окончания должна быть больше даты начала";
        }

        // 2. ПРОВЕРКА ОШИБОК: Если они есть, выводим их и выходим.
        // Кнопка останется в обычном состоянии.
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 3. ТОЛЬКО ТЕПЕРЬ, когда всё проверено, включаем индикатор загрузки
        setIsUploading(true);
        try {
            const params = new URLSearchParams({
                symbolId: formData.symbol,
                symbol: options.find(o => o.value === formData.symbol)?.original.symbol,
                timeframe: formData.timeframe,
                start: startTime,
                end: endTime
            });
            const response = await fetch(`http://localhost:8082/api/v1/candles/upload-binance?${params}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) throw new Error('Ошибка сервера');
            await loadCandles();
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при загрузке");
        } finally {
            // 4. Выключаем индикатор в любом случае (успех или ошибка)
            setIsUploading(false);
        }
    }

    // Получение Символов для выпадающего списка при загрузке страницы
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/v1/symbols');
                const data = await response.json();
                setSymbols(data);
            } catch (error) {
                console.error("Ошибка при загрузке символов:", error);
            } finally {
                setLoadingSymbols(false);
            }
        };
        fetchSymbols();
    }, []);  // Пустой массив означает, что запрос выполнится 1 раз при загрузке страницы

    // Функция загрузки теперь доступна во всем компоненте
    const loadCandles = async () => {
        setLoading(true);
        try {
            const response = await candleService.getAllCandlesByPages(
                currentPage - 1,
                pageSize,
                search,
                sortBy,
                direction
            );
            const { content, totalPages, totalElements } = response.data;
            setCandles(content || []);
            setTotalPages(totalPages || 0);
            setTotalElements(totalElements || 0);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        } finally {
            setLoading(false);
        }
    };

    // Вызывается автоматически при изменении зависимостей
    useEffect(() => {
        loadCandles();
    }, [currentPage, pageSize, sortBy, direction, search]);// Добавьте search в зависимости



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
            <div className="row d-flex align-items-end">
                <div className="col-md-6">
                    <h1><FontAwesomeIcon icon={faChartArea} className="me-3 text-secondary" /> {t('candles')}</h1>
                    <p style={{ color: '#6c757d' }} >Список всех свечей (0)</p>
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
                                            <input className={'form-control'}
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
                                            <input className={'form-control'}
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
                                                    className={'form-select'}
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
                                <div className="row">
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
                            <div className="text-primary fw-bold">Загрузка данных с Binance...</div>
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
                            <th style={{ width: '40px', textAlign: 'center', verticalAlign: 'middle' }}><input type="checkbox" className="custom-checkbox" name="checkbox_all" /></th>

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

                            <th style={{ verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('openTime')} >
                                Open Time
                                <span className="ms-2 text-muted">
                                    {sortBy === 'openTime' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>

                            <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('symbolId')} >
                                Symbol
                                <span className="ms-2 text-muted">
                                    {sortBy === 'symbolId' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>

                            <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('exchangeId')} >
                                Exchange
                                <span className="ms-2 text-muted">
                                    {sortBy === 'exchangeId' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>

                            <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('timeframe')} >
                                Timeframe
                                <span className="ms-2 text-muted">
                                    {sortBy === 'timeframe' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>

                            <th style={{ verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('open')} >
                                Open
                                <span className="ms-2 text-muted">
                                    {sortBy === 'open' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>
                            <th style={{ verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('high')} >
                                High
                                <span className="ms-2 text-muted">
                                    {sortBy === 'high' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>
                            <th style={{ verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('low')} >
                                Low
                                <span className="ms-2 text-muted">
                                    {sortBy === 'low' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>
                            <th style={{ verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('close')} >
                                Close
                                <span className="ms-2 text-muted">
                                    {sortBy === 'close' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>
                            <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('volume')} >
                                Volume
                                <span className="ms-2 text-muted">
                                    {sortBy === 'volume' ? (
                                        direction === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
                                    ) : (
                                        <FontAwesomeIcon icon={faSort} style={{ opacity: 0.3 }} />
                                    )}
                                </span>
                            </th>
                            <th style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer' }} onClick={() => handleSort('tradesCount')} >
                                Trades Count
                                <span className="ms-2 text-muted">
                                    {sortBy === 'tradesCount' ? (
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
                        {candles.length > 0 ? candles.map(candle => (
                            <tr key={candle.id}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <input type="checkbox" name="checkbox_all" value={candle.id} />
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{candle.id}</td>

                                <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                                    {new Date(candle.openTime).toLocaleString()}
                                </td>

                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <a href="#" onClick={() => handleView(candle.id)} >{candle.symbolName}</a>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <span className="badge bg-light text-dark border">
                                        {candle.exchangeId === 1 ? 'Binance' : `Exch: ${candle.exchangeId}`}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{candle.timeframe}</td>

                                <td style={{ verticalAlign: 'middle' }} >{candle.open}</td>
                                <td style={{ verticalAlign: 'middle' }} >{candle.high}</td>
                                <td style={{ verticalAlign: 'middle' }} >{candle.low}</td>
                                <td style={{ verticalAlign: 'middle' }} >{candle.close}</td>

                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {candle.volume?.toFixed(2)}
                                </td>

                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    {candle.tradesCount?.toFixed(2)}
                                </td>


                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <a href="#" onClick={() => handleView(candle.id)} title="View" style={{ cursor: "pointer" }} >
                                        <FontAwesomeIcon icon={faEye} />
                                    </a>
                                    <a href="#" className="text-danger" onClick={(e) => handleDelete(e, candle.id)} title="Delete" style={{ cursor: "pointer" }} >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </a>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="13" style={{ textAlign: 'center', padding: '40px' }}>
                                    <FontAwesomeIcon icon={faChartArea} size="3x" className="mb-3 text-muted" />
                                    <div className="text-muted">Данные в базе не найдены</div>
                                    <small className="text-muted">Настройте фильтры или загрузите данные с Binance</small>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Генерация номеров страниц с многоточием */}
            {candles.length > 0 && totalPages > 1 && (
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

export default Candles;

