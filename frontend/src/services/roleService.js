import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/roles';

// get list of all positions
const getAllRoles = async () => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}`, { headers: authHeader() });
};

// get list of departments with pagination
const getAllRolesByPages = async (page, size) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}?page=${page}&size=${size}`, { headers: authHeader() });
};

export default { getAllRoles, getAllRolesByPages };

