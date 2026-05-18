import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faTimes, faCheck, faBan } from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const ReviewForm = ({ task, taskId, userRole }) => {

    console.log('Данные объекта task:', task);

    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const { lng } = useParams(); // Получаем текущий язык из URL (например, 'es', 'ru')

    const { user, userId } = useApp();

    const handleSubmit = async (isApproved) => {
        setLoading(true);
        try {
            // Данные, которые уйдут во Flowable как переменные процесса
            const variables = {
                approved: isApproved,
                reviewComment: comment,
                reviewedBy: user || "Анонимный пользователь" // В идеале брать из контекста авторизации
            };

            // Замените URL на ваш эндпоинт в Spring Boot
            const response = await fetch(`http://localhost:8082/api/v1/workflow/tasks/${taskId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(variables),
            });

            if (response.ok) {
                alert("Задача успешно завершена");
                navigate(`/${lng}/tasks`); // Возвращаемся к списку задач
            } else {
                throw new Error("Ошибка при отправке формы");
            }
        } catch (err) {
            console.error(err);
            alert("Не удалось завершить задачу");
        } finally {
            setLoading(false);
        }
    };

    // Извлечет только базовую часть: "YYYY-MM-DDTHH:mm:ss"
    const safeDate = task.createTime ? new Date(task.createTime.substring(0, 19)).toLocaleString() : 'Нет данных';

    return (
        <div className="row">
            <div className="col-md-6">

                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title">Процесс: {task?.processName || "Загрузка..."}</h4>
                        <h5 className="card-title">Таска: {task.name}</h5>

                        <div className="mb-3">
                            <small style={{ color:'grey' }} >Ключ формы: review-form</small>
                        </div>

                        <div className="mb-3">
                            {/*
                            <label className="form-label fw-bold">ID:</label> <small className="text-muted small">{task.processInstanceId}</small> <br/>
                            */}
                            <label className="form-label fw-bold">ID Процесса:</label> <small className="text-muted small">{taskId}</small> <br/>
                            <label className="form-label fw-bold">Дата создания:</label> <small className="text-muted small">{safeDate}</small> <br/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label fw-bold">
                                Комментарий ревьюера
                            </label>
                            <textarea
                                id="comment"
                                className="form-control"
                                rows="4"
                                placeholder="Введите комментарий или решение..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <small style={{ color:'grey' }}>Инициатор: {user}</small> <br/>
                            <small style={{ color:'grey' }}>Ревьювер: {user}</small>
                        </div>

                        <div className="d-flex justify-content gap-2">
                            <button className="btn btn-primary" onClick={() => handleSubmit(true)} disabled={loading} style={{ width:'200px' }} >
                                <FontAwesomeIcon icon={faCheck} className="me-2" />
                                {loading ? 'Отправка...' : 'Одобрить'}
                            </button>
                            <button className="btn btn-danger" onClick={() => handleSubmit(false)} disabled={loading} style={{ width:'200px' }} >
                                <FontAwesomeIcon icon={faBan} className="me-2" />
                                Отклонить
                            </button>
                            <button className="btn btn-light text-secondary" onClick={() => navigate(`/${lng}/tasks`)} style={{ width:'200px' }} >
                                <FontAwesomeIcon icon={faTimes} className="me-2" /> Закрыть
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewForm;

