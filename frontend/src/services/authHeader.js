
// authHeader.js
// Добавляем при отправке к header токен
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken }
    } else {
        return {};
    }
}

