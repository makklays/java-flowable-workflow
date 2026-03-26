
import React, { useState } from 'react';
import AuthService from './authService';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    // 1. Эта функция просто записывает то, что вы печатаете, в память (стейт)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    // 2. Эта функция срабатывает ТОЛЬКО при нажатии на кнопку "Войти"
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Сбрасываем ошибку перед новой попыткой
        try {
            await AuthService.login(credentials.username, credentials.password);
            window.location.reload(); // Или редирект через useNavigate
        } catch(err) {
            setError('Неверный логин или пароль');
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input name="username" type="text" onChange={handleInputChange} placeholder="Логин" required />
            <input name="password" type="password" onChange={handleInputChange} placeholder="Пароль" required />
            <button type="submit">Войти</button>
            {error && <p style={{ color: 'red' }}>{error}</p> }
        </form>
    );
}