import axios from 'axios';
import authHeader from './authHeader'; // Импортируем вашу функцию заголовков

const API_URL = 'http://localhost:8082/api/v1/trades';

// get list of all positions
const getAllTrades = () => axios.get(API_URL, { headers: authHeader() });

// get list of symbols with pagination
const getAllTradesByPages = async (page, size, search, sortBy, direction) => {
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

// get trades Active by User ID
const getTradesActiveByUserId = async (userId) => {
    return await axios.get(`${API_URL}/user/${userId}/active`, {
        headers: authHeader()
    });
}

// get trades Closed by User ID
const getTradesClosedByUserId = async (userId) => {
    return await axios.get(`${API_URL}/user/${userId}/closed`, {
        headers: authHeader()
    });
}

export default { getAllTrades, getAllTradesByPages, getTradesActiveByUserId, getTradesClosedByUserId };

