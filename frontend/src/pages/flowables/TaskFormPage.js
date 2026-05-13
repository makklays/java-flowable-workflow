import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';
import axios from 'axios';
import authHeader from '../../services/authHeader';

import { FORM_COMPONENTS } from '../../components/flowable-forms';

const TaskFormPage = () => {
    const { taskId } = useParams();
    const location = useLocation();
    const { role } = useApp();

    // 1. Объявляем состояние для задачи
    const [task, setTask] = useState(location.state?.task || null);
    const [loading, setLoading] = useState(!task);

    useEffect(() => {
        const fetchCurrentTask = async () => {
            // Если задача уже пришла из location.state, не делаем запрос
            /*if (location.state?.task) {
                setTask(location.state.task);
                setLoading(false);
                return;
            }*/

            console.log("🚀 Запрос начался для ID:", taskId);

            try {
                // 2. Исправленный URL: запрашиваем конкретную задачу по ID
                const res = await axios.get(
                    `http://localhost:8082/api/v1/workflow/tasks/${taskId}`,
                    { headers: authHeader() }
                );
                console.log("ПОЛНЫЙ ОТВЕТ ОТ API:", res.data);
                console.log("Полученная задача из БД:", res.data);
                setTask(res.data);
            } catch (err) {
                console.error("Ошибка загрузки задачи:", err);
            } finally {
                setLoading(false);
            }

            console.log("ПОЛНЫЙ ОТВЕТ ОТ API1111111111");
        };
        fetchCurrentTask();
    }, [taskId, location.state]);

    if (loading) return <div className="container mt-5">Загрузка задачи...</div>;

    //const SelectedForm = FORM_COMPONENTS[task?.formKey];
    const key = task?.formKey || task?.formDefinitionKey;
    const SelectedForm = FORM_COMPONENTS[key];

    console.log("DEBUG: Весь объект task:", task);
    console.log("DEBUG: Ключ из задачи:", task?.formKey);
    console.log("DEBUG: Доступные ключи в FORM_COMPONENTS:", Object.keys(FORM_COMPONENTS));

    console.log("--------> " + SelectedForm);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h1><FontAwesomeIcon icon={faTasks} className="me-2" /> My Flowable tasks</h1>
                    <p>Tasks from Flowable assigned to me. {role === 'admin' ? 'Все активные процессы в системе' : 'Задачи, назначенные на меня'}</p>
                    {/*
                    <h4>Задача: {taskId}</h4>
                    */}

                    {/* Пример использования роли: показываем значок админа */}
                    {role === 'admin' && (
                        <div className="row">
                            <div className="col-md-6">
                                <div className="alert alert-info py-2">
                                    <small>Вы просматриваете форму с правами администратора</small>
                                </div>
                            </div>
                        </div>
                    )}

                    {SelectedForm ? (
                        // 3. Можно прокинуть роль дальше в саму форму, если нужно
                        <SelectedForm task={task} taskId={taskId} userRole={role} />
                    ) : (
                        <div className="alert alert-warning shadow-sm">
                            <h5>Форма не найдена</h5>
                            <p>Ключ: <strong>{task?.formKey || 'отсутствует'}</strong></p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskFormPage; // Исправляет 'TaskFormPage' was not found

