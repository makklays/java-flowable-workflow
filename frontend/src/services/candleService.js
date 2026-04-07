import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/candles';

// get list of all positions
const getAllCandles = async () => {
    // Передаем токены вторым аргументом в объект config
    return await axios.get(`${API_URL}`, { headers: authHeader() });
};

// get list of candles with pagination
const getAllCandlesByPages = async (page, size, search, sortBy, direction) => {
    return await axios.get(API_URL, {
        params: {
            page: page,
            size: size,
            search: search,
            sort: `${sortBy},${direction}`
        },
        headers: authHeader() // Переносим сюда!
    });
};

// upload candles from binance
const uploadSpot = async () => {
    return await axios.get(`${API_URL}/upload-binance?type=SPOT`, {
        headers: authHeader()
    });
}

// upload SPOT candles from binance
const uploadFutures = async () => {
    return await axios.get(`${API_URL}/upload-binance?type=FUTURES`, {
        headers: authHeader()
    });
}

// get candle by id
const getCandleById = async (id) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

// send data to backend (add a new candle)
const postCandle = async (data) => {
    // Передаем токены вторым аргументом в объект config
    return await axios.post(API_URL, data, {
        headers: authHeader()
    });
};

// send data to backend (add a new candle)
// PUT → полное обновление объекта
const putCandle = async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// PATCH → частичное обновление объекта
const patchCandle = async (id, data) => {
    return await axios.patch(`${API_URL}/${id}`, data, {
        headers: authHeader()
    });
};

// delete candle by id
const deleteCandle = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, {
        headers: authHeader()
    });
};

export default { getAllCandles, getAllCandlesByPages, uploadSpot, uploadFutures,
                 getCandleById, postCandle, putCandle, patchCandle, deleteCandle };

