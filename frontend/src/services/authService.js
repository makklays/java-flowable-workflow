
import axios from 'axios';

const API_URL = 'http://localhost:8082/api/auth/';

const register = (username, email, password) => {
    return axios.post(API_URL + 'signin', {username, email, password});
}

const login = async (username, password) => {
    const response = await axios.post(API_URL + 'signin', {username, password});

    if (response.data.accessToken) {
        // Сохраняем пользователя и токен в браузере
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const logout = () => {
    localStorage.removeItem('user');
}

const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export default { register, login, logout, getCurrentUser }

