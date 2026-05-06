import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import authHeader from '../services/authHeader';
import { useNavigate } from 'react-router-dom';

// Короткая запись компонента - стрелочная функция
const Jumbotron = () => {
    const { t, i18n } = useTranslation();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    return (
        <div className="jumbotron jumbotron-fluid img-container">
            <div className="container">
                <h1 className="font-development">Desarrollo de sitio web</h1>
                <div className="lead bg-green"><span>Nosotros TechMatrix18. Ayudamos a realizar la idea.</span></div>
            </div>
        </div>
    );
};

export default Jumbotron;