import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import authHeader from '../../services/authHeader';
import { useNavigate } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import Footer from '../../components/Footer';

// Короткая запись компонента - стрелочная функция
const HowWork = () => {
    const { t, i18n } = useTranslation();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    return (
        <div>
            <Jumbotron />

            <div className="container">
                <h1><FontAwesomeIcon icon={faTasks} className="me-2" /> How Work</h1>
                <p>Tasks from Flowable assigned to me. {role === 'ADMIN' ? 'Все активные процессы в системе' : 'Задачи, назначенные на меня'}</p>

                <div className="row" style={{ marginBottom: '40px' }}>
                    <div className="col-md-12">

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HowWork;