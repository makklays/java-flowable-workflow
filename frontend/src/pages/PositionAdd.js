import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
         faEye, faFloppyDisk, faPhone, faSitemap, faBriefcase, faUserShield, faEnvelope, faLocationDot,
         faEyeSlash, faPenToSquare, faTrashCan, faTimes, faPlus
       } from '@fortawesome/free-solid-svg-icons';

//
const PositionAdd = () => {
    const navigate = useNavigate();

    // Инициализируем все поля, чтобы избежать uncontrolled input warning
    const [positionData, setPositionData] = useState({
        title: '', description: ''
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        // Валидация Username
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

        // Здесь вызов positionService.createPosition(positionData)
        console.log("Данные для сохранения:", positionData);
        navigate('/positions'); // Возврат к списку после успеха
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Новая должность</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label required">Title</label>
                            <input type="text" className="form-control" value={positionData.title}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setPositionData({...positionData, title: val});
                                    // Очищаем ошибку при вводе, чтобы она не "висела"
                                    if (val) setErrors(prev => ({...prev, title: null}));
                                }}
                            />
                            {/* Вывод сообщения об ошибке */}
                            {errors.title && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
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
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/positions')}>
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PositionAdd;

