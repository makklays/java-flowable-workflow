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

// get role by id
const getRoleById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

// send data to backend (add a new role)
const postRole = async (data) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.post(API_URL, data, {
        headers: authHeader()
    });
};

// send data to backend (add a new role)
// PUT → полное обновление объекта
const putRole = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// PATCH → частичное обновление объекта
const patchRole = async (id, data) => {
    return await axios.patch(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// delete role by id
const deleteRole = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

export default { getAllRoles, getAllRolesByPages, getRoleById, postRole, putRole, patchRole, deleteRole };

