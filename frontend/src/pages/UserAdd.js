import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import userService from '../services/userService';
import { faEye, faFloppyDisk, faPhone, faSitemap, faBriefcase, faUserShield, faEnvelope, faLocationDot, faEyeSlash, faPenToSquare, faTrashCan, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

//
const UserAdd = () => {
    const navigate = useNavigate();

    // Инициализируем все поля, чтобы избежать uncontrolled input warning
    const [userData, setUserData] = useState({
        username: '', displayName: '', firstName: '', lastName: '',
        department: '', position: '', role: '', email: '',
        address: '', phone: '', password: ''
    });

    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        // Валидация Username
        if (!userData.username) {
            newErrors.username = 'Поле обязательно для заполнения';
        } else if (userData.username.length < 3) {
            newErrors.username = 'Минимум 3 символа';
        }

        if (!userData.displayName) {
            newErrors.displayName = 'Поле обязательно для заполнения';
        } else if (userData.displayName.length < 3) {
            newErrors.displayName = 'Минимум 3 символа';
        }

        if (!userData.firstName) {
            newErrors.firstName = 'Поле обязательно для заполнения';
        } else if (userData.firstName.length < 3) {
            newErrors.firstName = 'Минимум 3 символа';
        }

        if (!userData.lastName) {
            newErrors.lastName = 'Поле обязательно для заполнения';
        } else if (userData.lastName.length < 3) {
            newErrors.lastName = 'Минимум 3 символа';
        }

        if (!userData.department) {
            newErrors.department = 'Поле обязательно для выбора';
        }
        if (!userData.position) {
            newErrors.position = 'Поле обязательно для выбора';
        }
        if (!userData.role) {
            newErrors.role = 'Поле обязательно для выбора';
        }

        // Валидация Email (пример для второго поля)
        if (!userData.email) {
            newErrors.email = 'Email обязателен';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Некорректный формат email';
        }

        if (!userData.phone) {
            newErrors.phone = 'Поле обязательно для заполнения';
        }

        if (!userData.startDate) {
            newErrors.startDate = 'Поле обязательно для заполнения';
        }

        if (!userData.password) {
            newErrors.password = 'Поле обязательно для заполнения';
        } else if (userData.password.length < 6) {
            newErrors.password = 'Минимум 6 символа';
        }

        // Если есть ошибки — сохраняем их в state и выходим
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Прерываем выполнение, запрос к API не уйдет
        }

        // Если ошибок нет — очищаем стейт и отправляем данные
        setErrors({});

        // Здесь вызов userService.postUser(userData)
        //userService.postUser(userData);
        try {
            const response = await userService.postUser(userData);
            console.log("Ответ сервера:", response);
            console.log("Роль успешно сохранена");
        } catch (error) {
            console.error("Ошибка при сохранении пользователь", error);
        }
        console.log("Данные для сохранения:", userData);
        navigate('/users'); // Возврат к списку после успеха
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Новый пользователь</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Username</label>
                            <input type="text" className="form-control" value={userData.username}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUserData({...userData, username: val});
                                    // Очищаем ошибку при вводе, чтобы она не "висела"
                                    if (val) setErrors(prev => ({...prev, username: null}));
                                }}
                            />
                            {/* Вывод сообщения об ошибке */}
                            {errors.username && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    {errors.username}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Display name</label>
                            <input type="text" className="form-control" value={userData.displayName}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUserData({...userData, displayName: val});
                                    // Очищаем ошибку при вводе, чтобы она не "висела"
                                    if (val) setErrors(prev => ({...prev, displayName: null}));
                                }}
                            />
                            {errors.displayName && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    {errors.displayName}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Firstname</label>
                            <input type="text" className="form-control" value={userData.firstName}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUserData({...userData, firstName: val});
                                    if (val) setErrors(prev => ({...prev, firstName: null}));
                                }}
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    {errors.firstName}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Lastname</label>
                            <input type="text" className="form-control" value={userData.lastName}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUserData({...userData, lastName: val});
                                    if (val) setErrors(prev => ({...prev, lastName: null}));
                                }}
                            />
                            {errors.lastName && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    {errors.lastName}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Подразделение</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faSitemap} />
                                </span>
                                <select className="form-select" value={userData.department || ''}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setUserData({...userData, department: val});
                                        if (val) setErrors(prev => ({...prev, department: null}));
                                    }}
                                >
                                    <option value="" disabled>Выберите подразделение...</option>
                                    <option value="it">IT-отдел</option>
                                    <option value="sales">Отдел продаж</option>
                                    <option value="marketing">Маркетинг</option>
                                    <option value="finance">Финансы</option>
                                    <option value="hr">Кадры (HR)</option>
                                </select>
                                {errors.department && (
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.department}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Должность</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faBriefcase} />
                                </span>
                                <select className="form-select" value={userData.position || ''}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setUserData({...userData, position: val});
                                        if (val) setErrors(prev => ({...prev, position: null}));
                                    }}
                                >
                                    <option value="" disabled>Выберите должность...</option>
                                    <option value="developer">Разработчик</option>
                                    <option value="manager">Менеджер</option>
                                    <option value="designer">Дизайнер</option>
                                    <option value="hr">HR</option>
                                </select>
                                {errors.position && (
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.position}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Роль в системе</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUserShield} />
                                </span>
                                <select className="form-select" value={userData.role || ''}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setUserData({...userData, role: val});
                                        if (val) setErrors(prev => ({...prev, role: null}));
                                    }}
                                >
                                    <option value="" disabled>Выберите роль...</option>
                                    <option value="admin">Администратор</option>
                                    <option value="moderator">Модератор</option>
                                    <option value="user">Пользователь</option>
                                    <option value="guest">Гость</option>
                                </select>
                                {errors.role && (
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.role}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">E-mail</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                <input type="text" className="form-control" placeholder="example@mail.com" value={userData.email}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setUserData({...userData, email: val});
                                        if (val) setErrors(prev => ({...prev, email: null}));
                                    }}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                                <input type="text" className="form-control" value={userData.address} onChange={(e) => setUserData({...userData, address: e.target.value})} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Телефон</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="+38___ ___ __ __"
                                    value={userData.phone || ''}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setUserData({...userData, phone: val});
                                        if (val) setErrors(prev => ({...prev, phone: null}));
                                    }}
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-3">
                            <label className="form-label required">Дата начала работы</label>
                            <input type="date" className="form-control" value={userData.startDate || ''}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUserData({...userData, startDate: val});
                                    if (val) setErrors(prev => ({...prev, startDate: null}));
                                }}
                            />
                            {errors.startDate && (
                                <div className="invalid-feedback" style={{ display: 'block' }}>
                                    {errors.startDate}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <label className="form-label required">Пароль</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                value={userData.password || ''}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUserData({...userData, password: val});
                                    if (val) setErrors(prev => ({...prev, password: null}));
                                }}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                        {errors.password && (
                            <div className="invalid-feedback" style={{ display: 'block' }}>
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <div className="col-md-3"></div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <div className="mb-4 d-flex align-items-end" style={{ minHeight: '50px' }}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="isManCheckbox" checked={userData.isMan || false}
                                    onChange={(e) => setUserData({...userData, isMan: e.target.checked})}
                                />
                                <label className="form-check-label" htmlFor="isManCheckbox">Is a man?</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="mb-4 d-flex align-items-end" style={{ minHeight: '50px' }}>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="isPictureCheckbox" checked={userData.isPicture || false}
                                    onChange={(e) => setUserData({...userData, isPicture: e.target.checked})}
                                />
                                <label className="form-check-label" htmlFor="isPictureCheckbox">Is a avatar showing?</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-success me-2">
                            <FontAwesomeIcon icon={faFloppyDisk} className="me-2" />
                            Сохранить
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>
                            <FontAwesomeIcon icon={faTimes} className="me-2" />
                            Отмена
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default UserAdd;

