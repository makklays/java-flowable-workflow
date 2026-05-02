import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TradingSignal from '../components/TradingSignal';

const Dashboard = () => {

    const [data, setData] = useState([]);
    const notify = () => toast.success("Библиотека работает!");

    const playNotificationSound = () => {
        const audio = new Audio('/sounds/magic.wav'); // Путь к файлу в папке public
        audio.play().catch(error => console.error("Ошибка воспроизведения звука:", error));
    };

    const notifySuccess = (message) => {
        playNotificationSound();
        toast.success("Библиотека работает!");
    };

    // Вероятность может приходить из Java бэкенда.
    // 0.85 означает 85% вероятности "Покупать"
    const [chance, setChance] = useState(0.85);

    const [rsi1m, setRsi1m] = useState(0.5);
    const [rsi15m, setRsi15m] = useState(0.5);
    const [rsi1h, setRsi1h] = useState(0.5);

    useEffect(() => {
        // Подключаемся к твоему MarketDataWebSocketServer на бэкенде
        const socket = new WebSocket('ws://localhost:8082/ws/signals');

        socket.onmessage = (event) => {
            const candle = JSON.parse(event.data);
            // 1. Фильтруем только нужную монету
            if (candle.symbol === 'SOLUSDT') {
                // Достаем значение RSI из нашей Map indicators
                const rsiValue = candle.indicators?.rsi;
                if (rsiValue !== undefined) {
                    // 2. Распределяем данные по таймфреймам
                    if (candle.timeframe === '1m') {
                        setRsi1m(rsiValue);
                    } if (candle.timeframe === '15m') {
                        setRsi15m(rsiValue);
                    } else if (candle.timeframe === '1h') {
                        setRsi1h(rsiValue);
                    }
                }
            }
        };
        return () => socket.close();
    }, []);

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Панель управления</h1>
                <p>Здесь будут графики продаж...</p>

                <div className="row">
                    <div className="col-md-6"><h3 style={{ color: '#03aac7' }}>SOLUSDT</h3></div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h4>H1</h4>
                        <TradingSignal id="gauge-h1" probability={rsi1h} />
                        <p className="mt-2">RSI H1: {(rsi1h * 100).toFixed(2)}%</p>
                        {/*
                        <button className="btn btn-primary" onClick={() => setChance(Math.random())}>
                            Обновить данные
                        </button>
                        */}
                    </div>
                    <div className="col-md-6 mb-4">
                        <h4>M1</h4>
                        <TradingSignal id="gauge-m1" probability={rsi1m} />
                        <p className="mt-2">RSI M15: {(rsi1m * 100).toFixed(2)}%</p>
                        {/*
                        <button className="btn btn-primary" onClick={() => setChance(Math.random())}>
                            Обновить данные
                        </button>
                        */}
                    </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                    <div className="col-md-6"><h3 style={{ color: '#03aac7' }}>TRXUSDT</h3></div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h4>D1</h4>
                        <div className="card shadow-sm text-white border-primary">
                            <div className="card-body text-center">
                                <h6 className="card-title text-info mb-3">Рыночный сантимент</h6>
                                <div className="py-3">
                                    <span className="h2 text-success fw-bold">Strong Buy</span>
                                </div>
                                <div className="progress bg-secondary" style={{height: '10px'}}>
                                    <div className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                                         style={{width: '75%'}}>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between small mt-2 fw-bold">
                                    <span className="text-danger">Sell</span>
                                    <span className="text-warning">Neutral</span>
                                    <span className="text-success">Buy</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-primary" onClick={notifySuccess}>Проверить тост</button>
                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <h4>M15</h4>
                        <TradingSignal probability={chance} />
                        <p className="mt-2">Вероятность успеха: {chance * 100}%</p>
                        <button className="btn btn-primary" onClick={() => setChance(Math.random())}>
                            Обновить данные
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;

