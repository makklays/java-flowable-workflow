import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//
const UserAdd = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ username: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь вызов userService.createUser(userData)
        console.log("Данные для сохранения:", userData);
        navigate('/users'); // Возврат к списку после успеха
    };

    return (
        <div className="container mt-4">
            <h3>Новый пользователь</h3>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUserData({...userData, username: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Сохранить</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>
                    Отмена
                </button>
            </form>
        </div>
    );
};

export default UserAdd;

