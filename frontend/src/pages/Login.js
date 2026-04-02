import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext'; // 1. Импортируем контекст

const Login = () => {
    // Указываем начальное значение '' состояний
    const [loginName, setLoginName] = useState(''); // Переименовал, чтобы не путать с функцией login
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { login } = useApp(); // 2. Достаем функцию входа из контекста

    function handleChange(e) {
        const value = e.target.value; // Получаем значение
        console.log("Сейчас введено:", value); // Проверяем
        setLoginName(value); // Сохраняем в состояние React
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы

        if (!loginName || !password) {
            setError('Заполните все поля');
            return;
        }

        if (!loginName) {
            setError('Логин обязательно для заполнения!');
        } else if (!password) {
            setError('Пароль обязательный для заполнения!');
        } else if (password.length <= 4) {
            setError('Пароль должен быть длиннее 4 символов!');
        } else {
            setError('');
            console.log("Успешные данные формы: ", loginName);
        }

        try {
            // Теперь await будет работать корректно
            const response = await fetch('http://localhost:8082/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: loginName,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // 3. ЦЕНТРАЛЬНОЕ ДЕЙСТВИЕ:
                // Передаем данные в контекст. Он сам сохранит всё в localStorage
                // и оповестит все компоненты (включая Navbar), что юзер вошел.
                login({
                    username: loginName,
                    token: data.token
                });

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
                    <input type="text" className="form-control" value={loginName} onChange={handleChange} placeholder="Введите ваш логин" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Введите ваш password" />
                </div>

                {/* Выводим ошибку, только если она есть */}
                {error && <div className="text-danger mb-3" >{error}</div>}

                <button
                    type="submit"
                    disabled={loginName.length <= 4} // ИСПОЛЬЗУЕМ loginName вместо login
                    className="btn btn-primary w-100"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;