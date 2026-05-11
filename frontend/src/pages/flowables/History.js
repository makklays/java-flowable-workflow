import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faHistory, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import authHeader from '../../services/authHeader';

// Короткая запись компонента - стрелочная функция
const History = () => {
    const { t, i18n } = useTranslation();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);

    const count = useSelector((state) => state.counter.value); // Читаем данные
    const dispatch = useDispatch(); // Получаем функцию отправки

    return (
        <div className="container-fluid">
            <h1><FontAwesomeIcon icon={faHistory} className="me-2" /> Tasks History</h1>
            <p>My completed, cancelled and delegated tasks from Flowable</p>

            <div className="row" style={{ marginBottom: '40px' }} >
                <div className="col-md-8">
                    <h3>Completed</h3>

                    <div className="table-responsive">
                        <table className="table table-hover mb-0" style={{ fontSize: '14px' }} >
                            <thead>
                                <tr className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase' }}>
                                    <th>Название задачи</th>
                                    <th>ID Процесса</th>
                                    <th>Дата создания</th>
                                    {role === 'ADMIN' && <th>Исполнитель</th>}
                                    <th className="text-end">Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? tasks.map(task => (
                                    <tr key={task.id}>
                                        <td><span className="fw-bold">{task.name || 'Без названия'}</span></td>
                                        <td className="text-muted small">{task.processInstanceId}</td>
                                        <td>{new Date(task.createTime).toLocaleString()}</td>
                                        {role === 'ADMIN' && (
                                            <td className="text-info">{task.assignee || 'Не назначена'}</td>
                                        )}
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-outline-success">
                                                <FontAwesomeIcon icon={faEye} className="me-1" /> Открыть
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center text-muted">Входящих задач нет</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="row" style={{ marginBottom: '40px' }}>
                <div className="col-md-8">
                    <h3>Cancelled</h3>

                    <div className="table-responsive">
                        <table className="table table-hover mb-0" style={{ fontSize: '14px' }} >
                            <thead>
                                <tr className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase' }}>
                                    <th>Название задачи</th>
                                    <th>ID Процесса</th>
                                    <th>Дата создания</th>
                                    {role === 'ADMIN' && <th>Исполнитель</th>}
                                    <th className="text-end">Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? tasks.map(task => (
                                    <tr key={task.id}>
                                        <td><span className="fw-bold">{task.name || 'Без названия'}</span></td>
                                        <td className="text-muted small">{task.processInstanceId}</td>
                                        <td>{new Date(task.createTime).toLocaleString()}</td>
                                        {role === 'ADMIN' && (
                                            <td className="text-info">{task.assignee || 'Не назначена'}</td>
                                        )}
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-outline-success">
                                                <FontAwesomeIcon icon={faEye} className="me-1" /> Открыть
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center text-muted">Входящих задач нет</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="row" style={{ marginBottom: '40px' }}>
                <div className="col-md-8">
                    <h3>Delegated</h3>

                    <div className="table-responsive">
                        <table className="table table-hover mb-0" style={{ fontSize: '14px' }} >
                            <thead>
                                <tr className="text-muted" style={{ fontSize: '12px', textTransform: 'uppercase' }}>
                                    <th>Название задачи</th>
                                    <th>ID Процесса</th>
                                    <th>Дата создания</th>
                                    {role === 'ADMIN' && <th>Исполнитель</th>}
                                    <th className="text-end">Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length > 0 ? tasks.map(task => (
                                    <tr key={task.id}>
                                        <td><span className="fw-bold">{task.name || 'Без названия'}</span></td>
                                        <td className="text-muted small">{task.processInstanceId}</td>
                                        <td>{new Date(task.createTime).toLocaleString()}</td>
                                        {role === 'ADMIN' && (
                                            <td className="text-info">{task.assignee || 'Не назначена'}</td>
                                        )}
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-outline-success">
                                                <FontAwesomeIcon icon={faEye} className="me-1" /> Открыть
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center text-muted">Входящих задач нет</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default History;