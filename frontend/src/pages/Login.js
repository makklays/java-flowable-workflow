import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // Указываем начальное значение '' состояний
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function handleChange(e) {
        const value = e.target.value; // Получаем значение
        console.log("Сейчас введено:", value); // Проверяем
        setLogin(value); // Сохраняем в состояние React
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы
        if (!login) {
            setError('Логин обязательно для заполнения!');
        } else if (!password) {
            setError('Пароль обязательный для заполнения!');
        } else if (password.length <= 4) {
            setError('Пароль должен быть длиннее 4 символов!');
        } else {
            setError('');
            console.log("Успешные данные формы: ", login);

            // Сохраняем в хранилице
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('userName', login);

            navigate('/');
        }

        try {
            // Теперь await будет работать корректно
            const response = await fetch('http://localhost:8082/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: login,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // Сохраняем реальный JWT токен из бэкенда
                localStorage.setItem('token', data.token);
                console.log("Получил токен: ", data.token);

                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('userName', login);

                console.log("Получил логин: ", login);

                // Генерируем событие, чтобы App.js мгновенно обновил Navbar
                window.dispatchEvent(new Event('authChange'));

                setError('');
                navigate('/');
            } else {
                // Если 401 или 403 (неверный логин/пароль)
                setError('Неверный логин или пароль');
            }
        } catch (err) {
            console.error("Ошибка запроса:", err);
            setError('Сервер недоступен. Попробуйте позже.');
        }
    }

    return(
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label">Login</label>
                    <input type="text" className="form-control" value={login} onChange={handleChange} placeholder="Введите ваш логин" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Введите ваш password" />
                </div>

                {/* Выводим ошибку, только если она есть */}
                {error && <div className="text-danger mb-3" >{error}</div>}

                <button type="submit" disabled={login.length <= 4} className="btn btn-primary w-100">Войти</button>
            </form>
        </div>
    );
}

export default Login;