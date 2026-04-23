import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faCalendar, faCalendarDays, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import authHeader from '../../services/authHeader';
import HeatMap from '@uiw/react-heat-map';

// Короткая запись компонента - стрелочная функция
const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [dayEvents, setDayEvents] = useState([]);

    const { t, i18n } = useTranslation();

    // Ваши данные: дата и массив событий
    const data = [
        { date: '2026/01/01', content: ['Новый год', 'Зарядка'], count: 2 },
        { date: '2026/01/02', content: ['Работа над проектом'], count: 1 },
        { date: '2026/04/20', content: ['Изучение английского 1 урока.', 'Решение алгоритма на Leet Code'], count: 2 },
        { date: '2026/04/21', content: ['Добавление таблиц в табах на странице Trading', 'Изучение английского 2 урока.', 'Решение алгоритма на Leet Code'], count: 3 },
        { date: '2026/04/22', content: ['Открытие и закрытие ордера (сделки) в Trading', 'Изучение английского 1 урок.'], count: 2 },
        { date: '2026/04/23', content: ['Отображение процессов и тасок в Flowable.', 'Добавление календаря в проект.'], count: 2 },
    ];

    const handleDayClick = (item) => {
        setSelectedDate(item.date);
        setDayEvents(item.content || []); // Берем события из данных дня
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h1><FontAwesomeIcon icon={faCalendarDays} className="me-2" /> {t('calendar')}</h1>
                    <p style={{ color: '#6c757d' }}>Календарь со списком событий, действий и другой информаций за указанный день</p>
                </div>
            </div>

            <HeatMap
                value={data}
                width={800}
                startDate={new Date('2026/01/01')}
                // Кастомные цвета (от пустого к самому яркому)
                /*panelColors={{ // красные квадраты
                    0: '#f0f0f0',
                    1: '#ffc5c5',
                    2: '#ff8888',
                    4: '#ff4444',
                }}*/
                panelColors={{
                    0: '#ebedf0', // Почти белый (пустой день)
                    1: '#b3e5ef', // Очень светлый бирюзовый
                    2: '#66c9db', // Средний
                    4: '#03aac7', // Ваш основной цвет (максимальная яркость)
                    8: '#02889f', // Темный акцент для очень активных дней (опционально)
                }}
                rectProps={{
                    rx: 2,  // Скругление углов
                    ry: 2
                }}
                rectRender={(props, data) => {
                    return (
                        <rect {...props} onClick={() => handleDayClick(data)} />
                    );
                }}
            />

            <div style={{ marginTop: '20px' }}>
                <h3>События за: {selectedDate || 'выберите день'}</h3>
                {dayEvents.length > 0 ? (
                    <ul>
                        {dayEvents.map((ev, i) => <li key={i}>{ev}</li>)}
                    </ul>
                ) : (
                    <p className="text-muted">Событий нет</p>
                )}
            </div>
        </div>
    );
};

export default Calendar;

