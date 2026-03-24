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

    const handleSubmit = (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы
        if (!login) {
            setError('Логин обязательно для заполнения!');
        } else if (!password) {
            setError('Пароль обязательный для заполнения!');
        } else if (password.length <= 6) {
            setError('Пароль должен быть длиннее 6 символов!');
        } else {
            setError('');
            console.log("Успешные данные формы: ", login);

            // Сохраняем в хранилице
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('userName', login);

            navigate('/');
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

                <button type="submit" disabled={login.length <= 6} className="btn btn-primary w-100">Войти</button>
            </form>
        </div>
    );
}

export default Login;