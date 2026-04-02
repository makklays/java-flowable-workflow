import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/departments';

// get list of all departments
const getAllDepartments = async () => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}`, { headers: authHeader() });
};

// get list of departments with pagination
const getAllDepartmentsByPages = async (page, size) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}?page=${page}&size=${size}`, { headers: authHeader() });
};

// get department by id
const getDepartmentById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

// send data to backend (add a new department)
const postDepartment = async (data) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.post(API_URL, data, {
        headers: authHeader()
    });
};

// send data to backend (add a new department)
// PUT → полное обновление объекта
const putDepartment = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// PATCH → частичное обновление объекта
const patchDepartment = async (id, data) => {
    return await axios.patch(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// delete department by id
const deleteDepartment = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

export default { getAllDepartments, getAllDepartmentsByPages, getDepartmentById, postDepartment, putDepartment, patchDepartment, deleteDepartment };

