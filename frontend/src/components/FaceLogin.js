import React from 'react';

const FaceLogin = () => {
    const handleFaceAuth = async () => {
        // 1. Получаем challenge от Java бэкенда
        // TODO: заменить URL на реальный эндпоинт вашего бэкенда, который генерирует challenge для WebAuthn
        const response = await fetch('/api/auth/generate-challenge');
        const options = await response.json();

        // 2. Преобразуем challenge из Base64 в формат Uint8Array (нужно для браузера)
        options.challenge = Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0));
        options.allowCredentials.forEach(cred => {
            cred.id = Uint8Array.from(atob(cred.id), c => c.charCodeAt(0));
        });

        try {
            // 3. САМЫЙ ВАЖНЫЙ МОМЕНТ: Браузер сам откроет окно Face ID / Windows Hello
            const assertion = await navigator.credentials.get({
                publicKey: options
            });

            // 4. Отправляем результат (подпись) обратно на сервер для входа
            await sendAssertionToServer(assertion);
            alert("Успешный вход!");
        } catch (err) {
            console.error("Ошибка биометрии:", err);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Вход в систему</h2>
            <button onClick={handleFaceAuth} style={{ padding: '10px 20px', fontSize: '16px' }}>
                🔑 Войти с помощью Face ID
            </button>
        </div>
    );
};

export default FaceLogin;

