import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let year = now.getFullYear();

            // Если 6 июля в этом году уже прошло, ставим целью следующий год
            let targetDate = new Date(`July 6, ${year} 00:00:00`);
            if (now > targetDate) {
                targetDate = new Date(`July 6, ${year + 1} 00:00:00`);
            }

            const difference = targetDate - now;
            let timeLeft = {};
            if (difference > 0) {
                timeLeft = {
                    дней: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    часов: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    минут: Math.floor((difference / 1000 / 60) % 60),
                    секунд: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            display: 'flex',
            gap: '15px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: 'var(--text-main)' // Используем переменную из вашей темы
        }}>
        {Object.keys(timeLeft).length > 0 ? (
            Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem' }}>{value}</div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.7 }}>
                        {unit}
                    </div>
                </div>
            ))
        ) : (
            <span>Время пришло! ☀️</span>
        )}
        </div>
    );
};

export default CountdownTimer;

