import React, { useState, useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, LineSeries, createSeriesMarkers } from 'lightweight-charts';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const Trading = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const maSeriesRef = useRef(null);
    const socketRef = useRef(null);

    const { t, i18n } = useTranslation();

    const [pair, setPair] = useState('solusdt');
    const [timeframe, setTimeframe] = useState('1m');

    function handlePair(newPair) {
        console.log(newPair);
        setPair(newPair); // Это спровоцирует перезапуск useEffect выше
    }

    function handleTimeframe(timeframe) {
        console.log(timeframe);
        setTimeframe(timeframe);
    }

    useEffect(() => {
        if (!chartContainerRef.current) return;

        // очистка
        //const socket = new WebSocket(`wss://://stream.binance.com{pair.toLowerCase()}@kline_${timeframe}`);
        //socketRef.current = socket;

        // 1. Создаем график
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 500,
            layout: {
                background: { color: '#ffffff' },
                textColor: '#333',
            },
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                borderVisible: true,
            },
            rightPriceScale: {
                borderVisible: true,
            },
        });
        chartRef.current = chart;

        // 2. СОЗДАЕМ ЛИНИЮ MA
        /*const maSeries = chart.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        // ВОТ ЭТА СТРОКА ПРОПУЩЕНА:
        maSeriesRef.current = maSeries;

        // 3. Добавляем свечи
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRef.current = candleSeries;*/

        const maSeries = chart.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRef.current = maSeries;

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRef.current = candleSeries;

        // 3. Загружаем историю
        fetch(`https://api.binance.com/api/v3/klines?symbol=${pair.toUpperCase()}&interval=${timeframe}&limit=200`)
            .then(res => res.json())
            .then(data => {
                const candles = data.map(c => ({
                    time: c[0] / 1000,
                    open: parseFloat(c[1]),
                    high: parseFloat(c[2]),
                    low: parseFloat(c[3]),
                    close: parseFloat(c[4]),
                }));
                candleSeries.setData(candles);

                // Пример данных о сделках
                const buyTime = candles[candles.length - 20].time;
                const buyPrice = candles[candles.length - 20].close;
                const sellTime = candles[candles.length - 5].time;
                const sellPrice = candles[candles.length - 5].close;

                const tradeMarkers = [
                    {
                        time: buyTime,
                        position: 'belowBar',
                        color: '#2196F3',
                        shape: 'arrowUp',
                        text: 'BUY @ ' + buyPrice
                    },
                    {
                        time: sellTime,
                        position: 'aboveBar',
                        color: '#e91e63',
                        shape: 'arrowDown',
                        text: 'SELL @ ' + sellPrice
                    }
                ];

                // Создаем серию для линии сделки
                const tradeLineSeries = chart.addSeries(LineSeries, {
                    color: '#95a5a6',
                    lineWidth: 1,
                    lineStyle: 2, // 2 — это штриховая линия (Dashed)
                    priceLineVisible: false, // Скрываем горизонтальную линию цены
                    lastValueVisible: false,  // Скрываем метку последнего значения
                    crosshairMarkerVisible: false, // Скрываем точку при наведении
                });
                // Передаем только две точки: вход и выход
                tradeLineSeries.setData([
                    { time: buyTime, value: buyPrice },
                    { time: sellTime, value: sellPrice }
                ]);

                if (candles.length > 10) {
                    // Установка маркеров на серию свечей
                    createSeriesMarkers(candleSeries, tradeMarkers);
                }

                // РАСЧЕТ MA ДАННЫХ
                const maData = candles.map((val, index, arr) => {
                    const period = 7; // Период скользящей средней
                    if (index < period) return null;
                    const slice = arr.slice(index - period, index);
                    const sum = slice.reduce((a, b) => a + b.close, 0);
                    return { time: val.time, value: sum / period };
                }).filter(v => v !== null);

                maSeries.setData(maData);
            })
            .catch(err => console.error('History load error:', err));

        // 4. WebSocket
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@kline_${timeframe}`);
        socketRef.current = socket;
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            /*const parsed = JSON.parse(event.data);
            const k = parsed.k;
            if (!k) return;
            const candle = {
                time: Math.floor(k.t / 1000),
                open: parseFloat(k.o),
                high: parseFloat(k.h),
                low: parseFloat(k.l),
                close: parseFloat(k.c),
            };
            seriesRef.current.update(candle);

            // ОБНОВЛЕНИЕ ЛИНИИ MA В РЕАЛЬНОМ ВРЕМЕНИ
            // Берем последние данные из графика и считаем среднее
            const allData = seriesRef.current.data();
            if (allData.length > 7) {
                const last7 = allData.slice(-7);
                const sum = last7.reduce((a, b) => a + b.close, 0);
                maSeriesRef.current.update({
                    time: candle.time,
                    value: sum / 7
                });
            }*/

            const parsed = JSON.parse(event.data);
            const k = parsed.k;
            if (!k) return;

            const candle = {
                time: k.t / 1000,
                open: parseFloat(k.o),
                high: parseFloat(k.h),
                low: parseFloat(k.l),
                close: parseFloat(k.c),
            };

            // Обновляем свечу
            seriesRef.current.update(candle);

            // Для MA лучше использовать данные из fetch, накопленные в переменной,
            // либо просто обновлять точку MA по новой цене:
            maSeriesRef.current.update({
                time: candle.time,
                value: candle.close // Упрощенно, пока не пересчитали массив
            });
        };

        socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        // 5. Resize
        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        // cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [pair, timeframe]);

    return (
        <div>
            <div style={{ marginBottom: '20px' }} >
                <button onClick={() => handlePair('solusdt')} >SOL USDT</button>
                <button onClick={() => handlePair('btcusdt')} >BTC USDT</button>
                <button onClick={() => handlePair('ethusdt')} >ETH USDT</button>
                <button onClick={() => handlePair('xrpusdt')} >XRP USDT</button>
            </div>
            <div style={{ marginBottom: '20px' }} >
                <button onClick={() => handleTimeframe('1m')} >M1</button>
                <button onClick={() => handleTimeframe('15m')} >M15</button>
                <button onClick={() => handleTimeframe('1h')} >H1</button>
                <button onClick={() => handleTimeframe('4h')} >H4</button>
                <button onClick={() => handleTimeframe('1d')} >D1</button>
                <button onClick={() => handleTimeframe('1w')} >W1</button>
            </div>
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white d-flex justify-content-between">
                    <h6 className="mb-0">{pair.toUpperCase()} Live Chart / {timeframe}</h6>
                    <small>Binance {timeframe}</small>
                </div>
                <div className="card-body p-0">
                    <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }} />
                </div>
            </div>
        </div>
    );
};

export default Trading;