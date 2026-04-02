import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/users';

// get list of users with pagination
const getAllUsers = async (page, size) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}?page=${page}&size=${size}`, { headers: authHeader() });
};

// get user by id
const getUserById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

// get list of departments with pagination
const getAllUsersByPages = async (page, size) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}?page=${page}&size=${size}`, {
        headers: authHeader()
    });
};

// send data to backend (add a new user)
const postUser = async (data) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.post(API_URL, data, {
        headers: authHeader()
    });
};

// send data to backend (add a new user)
// PUT → полное обновление объекта
const putUser = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// PATCH → частичное обновление объекта
const patchUser = async (id, data) => {
    return await axios.patch(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// delete user by id
const deleteUser = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

export default { getAllUsers, getAllUsersByPages, getUserById, postUser, putUser, patchUser, deleteUser };

