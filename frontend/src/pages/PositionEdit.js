import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faTimes } from "@fortawesome/free-solid-svg-icons";

import positionService from "../services/positionService";

const PositionEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [positionData, setPositionData] = useState({
        title: "",
        description: ""
    });

    const [errors, setErrors] = useState({});

    // Загрузка роли при входе на страницу
    useEffect(() => {
        fetchPosition();
    }, []);

    const fetchPosition = async () => {
        try {
            const response = await positionService.getPositionById(id);
            setPositionData(response.data);
        } catch (error) {
            console.error("Ошибка загрузки роли:", error);
        }
    };

    // Сохранение изменений
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Валидация
        const newErrors = {};
        if (!positionData.title) {
            newErrors.title = 'Поле обязательно для заполнения';
        } else if (positionData.title.length < 3) {
            newErrors.title = 'Минимум 3 символа';
        }
        // Если есть ошибки — сохраняем их в state и выходим
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Прерываем выполнение, запрос к API не уйдет
        }
        // Если ошибок нет — очищаем стейт и отправляем данные
        setErrors({});

        try {
            await positionService.putPosition(id, positionData);
            navigate("/positions");
        } catch (error) {
            console.error("Ошибка обновления должность:", error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Редактирование должности</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label required">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={positionData.title}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setPositionData({ ...positionData, title: val });
                                    if (val) setErrors(prev => ({ ...prev, title: null }));
                                }}
                            />
                            {errors.title && (
                                <div className="invalid-feedback" style={{ display: "block" }}>
                                    {errors.title}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-success me-2">
                            <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
                            Сохранить
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/positions")}
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PositionEdit;

