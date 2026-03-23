import React, { useEffect, useRef } from 'react';

import { createChart, CandlestickSeries, LineSeries } from 'lightweight-charts';

const Trading = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const maSeriesRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!chartContainerRef.current || chartRef.current) return;

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
        const maSeries = chart.addSeries(LineSeries, {
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
        seriesRef.current = candleSeries;

        // 3. Загружаем историю
        fetch('https://api.binance.com/api/v3/klines?symbol=SOLUSDT&interval=1m&limit=200')
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
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/solusdt@kline_1m');
        socketRef.current = socket;
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            const parsed = JSON.parse(event.data);
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
            }
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
    }, []);

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white d-flex justify-content-between">
                <h6 className="mb-0">SOL/USDT Live Chart</h6>
                <small>Binance (1m)</small>
            </div>
            <div className="card-body p-0">
                <div
                    ref={chartContainerRef}
                    style={{ width: '100%', height: '500px' }}
                />
            </div>
        </div>
    );
};

export default Trading;