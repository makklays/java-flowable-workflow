import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const BinanceChart = ({ symbol = 'BTCUSDT', interval = '1h' }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        // 1. Инициализация графика
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                backgroundColor: '#ffffff',
                textColor: '#333',
            },
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        // 2. Добавление серии свечей
        const candleSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        // 3. Загрузка данных с Binance API
        // https://github.io
        fetch(`https://api.binance.com/api/v3/klines?symbol={symbol.toUpperCase()}&interval=${interval}&limit=500`)
            .then(res => res.json())
            .then(data => {
                // Форматируем данные Binance под формат Lightweight Charts
                const formattedData = data.map(c => ({
                    time: c[0] / 1000, // Binance дает ms, библиотеке нужны секунды
                    open: parseFloat(c[1]),
                    high: parseFloat(c[2]),
                    low: parseFloat(c[3]),
                    close: parseFloat(c[4]),
                }));
                candleSeries.setData(formattedData);
                chart.timeScale().fitContent(); // Подогнать график под экран
            })
            .catch(err => console.error("Binance Fetch Error:", err));

        // 4. Обработка изменения размера окна
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };
        window.addEventListener('resize', handleResize);

        // Очистка при размонтировании
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [symbol, interval]); // Перезапуск при смене пары или таймфрейма

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
                {symbol.toUpperCase()} - {interval} History
            </div>
            <div ref={chartContainerRef} style={{ position: 'relative' }} />
        </div>
    );
};

export default BinanceChart;

