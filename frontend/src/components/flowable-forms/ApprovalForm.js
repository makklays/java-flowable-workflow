import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReviewForm = ({ task, taskId }) => {
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (isApproved) => {
        setLoading(true);
        try {
            // Данные, которые уйдут во Flowable как переменные процесса
            const variables = {
                approved: isApproved,
                reviewComment: comment,
                reviewedBy: "Current User" // В идеале брать из контекста авторизации
            };

            // Замените URL на ваш эндпоинт в Spring Boot
            const response = await fetch(`/api/tasks/${taskId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(variables),
            });

            if (response.ok) {
                alert("Задача успешно завершена");
                navigate('/tasks'); // Возвращаемся к списку задач
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

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title mb-4">Проверка документации</h5>

                <div className="mb-3">
                    <label className="form-label fw-bold">ID Задачи:</label>
                    <div className="text-muted small">{taskId}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="comment" className="form-label fw-bold">
                        Комментарий ревьюера
                    </label>
                    <textarea
                        id="comment"
                        className="form-control"
                        rows="4"
                        placeholder="Введите замечания или комментарии..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => handleSubmit(false)}
                        disabled={loading}
                    >
                        Отклонить
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => handleSubmit(true)}
                        disabled={loading}
                    >
                        {loading ? 'Отправка...' : 'Одобрить и завершить'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;

