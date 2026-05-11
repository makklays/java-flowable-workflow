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

// Короткая запись компонента - стрелочная функция
const Tasks = () => {
    const { t, i18n } = useTranslation();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    const fetchTasks = async () => {
        if (!userId) return;

        try {
            // Используем ОБРАТНЫЕ кавычки ` ` для вставки переменной ${userId}
            //const endpoint = `http://localhost:8082/api/v1/workflow/tasks/${userId}`;
            const endpoint = "http://localhost:8082/api/v1/workflow/tasks/all";

            const res = await axios.get(endpoint, { headers: authHeader() });
            console.log("Полученные задачи:", res.data);
            setTasks(res.data || []); // Убрали лишний .data
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    useEffect(() => {
        const fetchProcessDefinitions = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8082/api/v1/workflow/definitions",
                    { headers: authHeader() }
                );
                console.log("Полученные схемы из БД:", res.data); // Теперь тут будет массив
                setAvailableProcesses(res.data || []); // Убрали лишний .data
            } catch (err) {
                console.error("Ошибка API Flowable:", err);
            }
        };

        fetchProcessDefinitions();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [userId, role]);

    // Фильтруем задачи для разных разделов
    const tasksInWork = tasks.filter(task => task.assignee === userId);
    //const activeTasks = tasks.filter(task => !task.assignee || (role === 'ADMIN' && task.assignee !== userId));
    const activeTasks = tasks;

    // Функция для старта
    const handleStartProcess = async (processKey) => {
        try {
            // URL должен соответствовать вашему Java контроллеру
            const response = await axios.post(
                `http://localhost:8082/api/v1/workflow/start/${processKey}`,
                { initiator: "admin", someVariable: "someValue" }, // Передаем Map переменных
                { headers: authHeader() }
            );
            alert("Процесс запущен! ID: " + response.data.id);
            // ОБНОВЛЯЕМ ДАННЫЕ В ИНТЕРФЕЙСЕ
            fetchTasks();     // Чтобы увидеть новую задачу в таблице "Задачи в работе"
            //fetchInstances(); // Чтобы увидеть новый запущенный процесс в списке всех процессов

        } catch (err) {
            console.error("Ошибка старта:", err);
            alert("Не удалось запустить процесс");
        }
    };

    // Упрощенный обработчик без лишнего async
    const handleOpenTask = (task) => {
        const id = task.id; // Пробуем оба варианта
        if (!id) {
            console.error("ID задачи не найден в объекте:", task);
            return;
        }
        navigate(`/tasks/${id}/form`, { state: { task } });
    };

    return (
        <div className="container-fluid">
            <h1><FontAwesomeIcon icon={faTasks} className="me-2" /> My Flowable tasks</h1>
            <p>Tasks from Flowable assigned to me. {role === 'ADMIN' ? 'Все активные процессы в системе' : 'Задачи, назначенные на меня'}</p>

            <div className="row" style={{ marginBottom: '40px' }}>
                <div className="col-md-12">
                    <div className="row">
                        <h3 className="mb-3 text-muted">Доступные процессы</h3>
                        {availableProcesses.map(proc => (
                            <div className="col-md-4 mb-3" key={proc.id}>
                                <div className="card h-100 border-primary text-white">
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title text-primary">{proc.name || proc.key}</h5>
                                            <p className="card-text small text-muted">Версия: {proc.version}</p>
                                        </div>
                                        <button className="btn btn-primary mt-3" onClick={() => handleStartProcess(proc.key)}>
                                            Запустить процесс
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginBottom: '40px' }}>
                <div className="col-md-12">
                    <h3>Входящие задачи (inbox)</h3>

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
                                            <button className="btn btn-sm btn-outline-success" onClick={() => handleOpenTask(task)} >
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
                <div className="col-md-12">
                    <h3>Задачи в работе</h3>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle" style={{ fontSize: '14px' }} >
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
                                {activeTasks.length > 0 ? activeTasks.map(task => (
                                    <tr key={task.id} style={{ borderBottom: '1px solid #333' }}>
                                        <td>
                                            <div className="fw-bold">{task.name || 'Без имени'}</div>
                                            <div className="text-muted small">ID: {task.id}</div>
                                        </td>
                                        <td>
                                            <div className="badge bg-secondary">{task.processDefinitionId?.split(':')[0]}</div>
                                        </td>
                                        <td className="small">{new Date(task.createTime).toLocaleString()}</td>
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-outline-info">
                                                <FontAwesomeIcon icon={faEye} className="me-1" /> Открыть
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="text-center text-muted">Задач в работе нет</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="row" style={{ marginBottom: '40px' }}>
                <div className="col-md-12">
                    <h3>Активные задачи</h3>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle" style={{ fontSize: '14px' }} >
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
                                {activeTasks.length > 0 ? activeTasks.map(task => (
                                    <tr key={task.id} style={{ borderBottom: '1px solid #333' }}>
                                        <td>
                                            <div className="fw-bold">{task.name || 'Без имени'}</div>
                                            <div className="text-muted small">ID: {task.id}</div>
                                        </td>
                                        <td>
                                            <div className="badge bg-secondary">{task.processDefinitionId?.split(':')[0]}</div>
                                        </td>
                                        <td className="small">{new Date(task.createTime).toLocaleString()}</td>
                                        <td className="text-end">
                                            <button className="btn btn-sm btn-outline-info">
                                                <FontAwesomeIcon icon={faEye} className="me-1" /> Открыть
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="4" className="text-center text-muted">Активных задач нет</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Tasks;