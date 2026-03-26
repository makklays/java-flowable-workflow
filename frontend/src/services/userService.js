import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/users';

const getAllUsers = async () => {
    // Передаем токены вторым аргументом в объект config
    const response = await axios.get(API_URL, { headers: authHeader() });

    // Просто возвращаем данные, ничего не сохраняя в localStorage
    return response.data;
}

export default { getAllUsers };

