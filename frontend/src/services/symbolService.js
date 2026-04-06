import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/symbols';

// get list of all positions
const getAllSymbols = async () => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}`, { headers: authHeader() });
};

// get list of departments with pagination
const getAllSymbolsByPages = async (page, size) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}?page=${page}&size=${size}`, { headers: authHeader() });
};

// upload SPOT symbols from binance
const uploadSpot = async () => {
    return await axios.get(`${API_URL}/upload-binance?type=SPOT`, {
        headers: authHeader()
    });
}

// upload SPOT symbols from binance
const uploadFutures = async () => {
    return await axios.get(`${API_URL}/upload-binance?type=FUTURES`, {
        headers: authHeader()
    });
}

// get symbol by id
const getSymbolById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

// send data to backend (add a new symbol)
const postSymbol = async (data) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.post(API_URL, data, {
        headers: authHeader()
    });
};

// send data to backend (add a new symbol)
// PUT → полное обновление объекта
const putSymbol = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// PATCH → частичное обновление объекта
const patchSymbol = async (id, data) => {
    return await axios.patch(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// delete symbol by id
const deleteSymbol = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

export default { getAllSymbols, getAllSymbolsByPages, uploadSpot, uploadFutures,
                 getSymbolById, postSymbol, putSymbol, patchSymbol, deleteSymbol };

