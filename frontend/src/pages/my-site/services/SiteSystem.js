import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHome, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../../context/AppContext';
import authHeader from '../../../services/authHeader';
import Jumbotron from '../../../components/Jumbotron';
import Footer from '../../../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Короткая запись компонента - стрелочная функция
const SiteSystem = () => {
    const { t, i18n } = useTranslation();
    const { lng } = useParams();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    return (
        <div>
            <Jumbotron />

            <div className="container">
                <div className="row" style={{ marginBottom: '40px' }}>
                    <div className="col-md-12">
                        <div className="container" style={{ marginTop:'20px' }} ></div>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={`/${lng}/`} className="a-green"><FontAwesomeIcon icon={faHome} className="me-2" /></Link></li>
                                <li className="breadcrumb-item" aria-current="page">{t('site_system')}</li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-12">
                                <br />
                                <h1 className="text-center text-design2">
                                    {t('site_system')}
                                </h1>
                                <br />
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SiteSystem;