import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faHistory, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const History = () => {
    const { t, i18n } = useTranslation();

    const count = useSelector((state) => state.counter.value); // Читаем данные
    const dispatch = useDispatch(); // Получаем функцию отправки

    return (
        <div>
            <h1><FontAwesomeIcon icon={faHistory} className="me-2" /> Tasks History</h1>
            <p>My completed, cancelled and delegated tasks from Flowable</p>

            <div className="row">
                <div className="col-md-6">
                    <h3>Completed</h3>
                    ...
                    <br/><br/><br/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Cancelled</h3>
                    ...
                    <br/><br/><br/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Delegated</h3>
                    ...
                    <br/><br/><br/>
                </div>
            </div>
        </div>
    );
};

export default History;