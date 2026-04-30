
// authHeader.js
// Добавляем при отправке к header токен
export default function authHeader() {
    const token = localStorage.getItem('token');
    console.log("Token from storage:", token);

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        console.warn("Token NOT found in localStorage!");
        return {};
    }
}

