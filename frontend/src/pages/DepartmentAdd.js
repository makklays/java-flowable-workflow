import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import departmentService from '../services/departmentService';
import {
         faEye, faFloppyDisk, faPhone, faSitemap, faBriefcase, faUserShield, faEnvelope, faLocationDot,
         faEyeSlash, faPenToSquare, faTrashCan, faTimes, faPlus
       } from '@fortawesome/free-solid-svg-icons';

//
const DepartmentAdd = () => {
    const navigate = useNavigate();

    // Инициализируем все поля, чтобы избежать uncontrolled input warning
    const [departData, setDepartData] = useState({
        title: '', description: ''
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Валидация Username
        if (!departData.title) {
            newErrors.title = 'Поле обязательно для заполнения';
        } else if (departData.title.length < 3) {
            newErrors.title = 'Минимум 3 символа';
        }

        // Если есть ошибки — сохраняем их в state и выходим
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Прерываем выполнение, запрос к API не уйдет
        }

        // Если ошибок нет — очищаем стейт и отправляем данные
        setErrors({});

        // Здесь вызов departmentService.postDepartment(departData)
        try {
            const response = await departmentService.postDepartment(departData);
            console.log("Ответ сервера:", response);
            console.log("Роль успешно сохранена");
        } catch (error) {
            console.error("Ошибка при сохранении отделения", error);
        }
        console.log("Данные для сохранения:", departData);
        navigate('/departments'); // Возврат к списку после успеха
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Новое отделение</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label required">Title</label>
                            <input type="text" className="form-control" value={departData.title}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setDepartData({...departData, title: val});
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
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" value={departData.description} rows="8"
                                onChange={(e) => setDepartData({...departData, description: e.target.value})} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-success me-2">
                            <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
                            Сохранить
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/departments')}>
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Отмена
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DepartmentAdd;