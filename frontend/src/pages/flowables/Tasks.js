import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const Tasks = () => {
    const { t, i18n } = useTranslation();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("/flowable-task/process-api/runtime/tasks")
            .then(res => setTasks(res.data.data));
    }, []);

    return (
        <div>
            <h1><FontAwesomeIcon icon={faTasks} className="me-2" /> My Flowable tasks</h1>
            <p>Tasks from Flowable assigned to me</p>

            <div className="row">
                <div className="col-md-6">
                    <h3>Входящие задачи (inbox)</h3>
                    ...
                    <br/><br/><br/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Задачи в работе</h3>
                    ...
                    <br/><br/><br/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <h3>Активные задачи</h3>
                    ...
                    <br/><br/><br/>
                </div>
            </div>

            {/*
            if (task.key === "review-form") {
               return <ReviewForm task={task} />
            }
            */}

        </div>
    );
};

export default Tasks;