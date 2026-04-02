import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/positions';

// get list of all positions
const getAllPositions = async () => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}`, { headers: authHeader() });
};

// get list of departments with pagination
const getAllPositionsByPages = async (page, size) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}?page=${page}&size=${size}`, { headers: authHeader() });
};

// get position by id
const getPositionById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

// send data to backend (add a new position)
const postPosition = async (data) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.post(API_URL, data, {
        headers: authHeader()
    });
};

// send data to backend (add a new position)
// PUT → полное обновление объекта
const putPosition = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// PATCH → частичное обновление объекта
const patchPosition = async (id, data) => {
    return await axios.patch(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// delete position by id
const deletePosition = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

export default { getAllPositions, getAllPositionsByPages, getPositionById, postPosition, putPosition, patchPosition, deletePosition };

