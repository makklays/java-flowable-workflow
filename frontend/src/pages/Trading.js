import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, LineSeries, createSeriesMarkers } from 'lightweight-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartLine, faArrowUp, faArrowDown, faCog, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import OrderModal from '../components/OrderModal';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const Trading = () => {
    const chartContainerRef = useRef(null);
    const chartContainerRefD1 = useRef(null);
    const chartContainerRefH1 = useRef(null);
    const chartRef = useRef(null);
    const chartRefD1 = useRef(null);
    const chartRefH1 = useRef(null);
    const seriesRef = useRef(null);
    const seriesRefD1 = useRef(null);
    const seriesRefH1 = useRef(null);
    const maSeriesRef = useRef(null);
    const maSeriesRefD1 = useRef(null);
    const maSeriesRefH1 = useRef(null);
    const socketRef = useRef(null);
    const socketRefD1 = useRef(null);
    const socketRefH1 = useRef(null);

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

    function handleLong() {
        alert('LONG!');
        return false;
    }

    function handleShort() {
        alert('SHORT!');
        return false;
    }

    // 1. Список символов (позже будешь загружать через fetch/axios из БД)
    const [symbolsFromDB, setSymbolsFromDB] = useState([
        { id: 1, ticker: 'BTCUSDT', name: 'Bitcoin' },
        { id: 2, ticker: 'ETHUSDT', name: 'Ethereum' },
        { id: 3, ticker: 'BCHUSDT', name: 'BCH' },
        { id: 4, ticker: 'XRPUSDT', name: 'XRP' },
        { id: 5, ticker: 'LTCUSDT', name: 'LTC' },
        { id: 6, ticker: 'TRXUSDT', name: 'TRX' },
        { id: 7, ticker: 'ETCUSDT', name: 'ETC' },
        { id: 8, ticker: 'LINKUSDT', name: 'LINK' },
        { id: 9, ticker: 'XLMUSDT', name: 'XLM' },
        { id: 10, ticker: 'ADAUSDT', name: 'ADA' },
        { id: 12, ticker: 'DASHUSDT', name: 'DASH' },

        { id: 12, ticker: 'ATOMUSDT', name: 'ATOM' },
        { id: 21, ticker: 'NEOUSDT', name: 'NEO' },
        { id: 25, ticker: 'ALGOUSDT', name: 'ALGO' },
        { id: 29, ticker: 'COMPUSDT', name: 'COMP' },

        { id: 42, ticker: 'SOLUSDT', name: 'Solana' },
    ]);
    const [isUploading, setIsUploading] = useState(false);

    // 2. Выбранная монета (объект)
    const [selectedCoin, setSelectedCoin] = useState(symbolsFromDB[0]);

    // 3. Цены (объект, куда будут капать данные из сокета)
    // Например: { "BTCUSDT": 65000, "ETHUSDT": 3500 }
    const [prices, setPrices] = useState({});

    // 4. Состояние модального окна
    const [isOrderOpen, setOrderOpen] = useState(false);

    // 5. Тип ордера (long или short)
    const [orderType, setOrderType] = useState('long');

    // Функция-хелпер для открытия модалки
    const openOrder = (type) => {
        setOrderType(type);
        setOrderOpen(true);
    };


    // Состояние для хранения ID активного таба
    const [activeTab, setActiveTab] = useState('trading');
    const [show, setShow] = useState(false);

    // Функции для управления состоянием
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isModalOpen, setModalOpen] = useState(false);

    useLayoutEffect(() => {

        let isMounted = true; // Флаг для отслеживания монтирования компонента

        if (!chartContainerRef.current) return;
        if (!chartContainerRefD1.current) return;
        if (!chartContainerRefH1.current) return;

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

        const chartD1 = createChart(chartContainerRefD1.current, {
            width: chartContainerRefD1.current.clientWidth,
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
        chartRefD1.current = chartD1;

        const chartH1 = createChart(chartContainerRefH1.current, {
            width: chartContainerRefH1.current.clientWidth,
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
        chartRefH1.current = chartH1;

        // 2. Добавляем серии MA
        const maSeries = chart.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRef.current = maSeries;

        const maSeriesD1 = chartD1.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRefD1.current = maSeriesD1;

        const maSeriesH1 = chartH1.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRefH1.current = maSeriesH1;

        // Добавляем серию свечей
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRef.current = candleSeries;

        const candleSeriesD1 = chartD1.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRefD1.current = candleSeriesD1;

        const candleSeriesH1 = chartH1.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRefH1.current = candleSeriesH1;

        // 3. Загружаем историю
        fetch(`https://api.binance.com/api/v3/klines?symbol=${pair.toUpperCase()}&interval=${timeframe}&limit=200`)
            .then(res => res.json())
            .then(data => {
                if (!isMounted) return;

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
            .catch(err => { if (isMounted) console.error('History load error:', err) });

        fetch(`https://api.binance.com/api/v3/klines?symbol=${pair.toUpperCase()}&interval=1d&limit=200`)
            .then(res => res.json())
            .then(data => {
                if (!isMounted) return;

                const candles = data.map(c => ({
                    time: c[0] / 1000,
                    open: parseFloat(c[1]),
                    high: parseFloat(c[2]),
                    low: parseFloat(c[3]),
                    close: parseFloat(c[4]),
                }));
                candleSeriesD1.setData(candles);

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
                const tradeLineSeriesD1 = chartD1.addSeries(LineSeries, {
                    color: '#95a5a6',
                    lineWidth: 1,
                    lineStyle: 2, // 2 — это штриховая линия (Dashed)
                    priceLineVisible: false, // Скрываем горизонтальную линию цены
                    lastValueVisible: false,  // Скрываем метку последнего значения
                    crosshairMarkerVisible: false, // Скрываем точку при наведении
                });
                // Передаем только две точки: вход и выход
                tradeLineSeriesD1.setData([
                    { time: buyTime, value: buyPrice },
                    { time: sellTime, value: sellPrice }
                ]);

                if (candles.length > 10) {
                    // Установка маркеров на серию свечей
                    createSeriesMarkers(candleSeriesD1, tradeMarkers);
                }

                // РАСЧЕТ MA ДАННЫХ
                const maDataD1 = candles.map((val, index, arr) => {
                    const period = 7; // Период скользящей средней
                    if (index < period) return null;
                    const slice = arr.slice(index - period, index);
                    const sum = slice.reduce((a, b) => a + b.close, 0);
                    return { time: val.time, value: sum / period };
                }).filter(v => v !== null);

                maSeriesD1.setData(maDataD1);
            })
            .catch(err => { if (isMounted) console.error('History load error:', err) });

        fetch(`https://api.binance.com/api/v3/klines?symbol=${pair.toUpperCase()}&interval=1h&limit=200`)
            .then(res => res.json())
            .then(data => {
                if (!isMounted) return;

                const candles = data.map(c => ({
                    time: c[0] / 1000,
                    open: parseFloat(c[1]),
                    high: parseFloat(c[2]),
                    low: parseFloat(c[3]),
                    close: parseFloat(c[4]),
                }));
                candleSeriesH1.setData(candles);

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
                const tradeLineSeries = chartH1.addSeries(LineSeries, {
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
                    createSeriesMarkers(candleSeriesH1, tradeMarkers);
                }

                // РАСЧЕТ MA ДАННЫХ
                const maDataH1 = candles.map((val, index, arr) => {
                    const period = 7; // Период скользящей средней
                    if (index < period) return null;
                    const slice = arr.slice(index - period, index);
                    const sum = slice.reduce((a, b) => a + b.close, 0);
                    return { time: val.time, value: sum / period };
                }).filter(v => v !== null);

                maSeriesH1.setData(maDataH1);
            })
            .catch(err => { if (isMounted) console.error('History load error:', err) });

        // 4. WebSocket
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@kline_${timeframe}`);
        socketRef.current = socket;
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            if (!isMounted || !chartRef.current || !seriesRef.current) return; // Если компонент удален, ничего не делаем

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

            // ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА ПЕРЕД ОБНОВЛЕНИЕМ
            if (chartRef.current && seriesRef.current) {
                seriesRef.current.update(candle);
            }

            // Для MA лучше использовать данные из fetch, накопленные в переменной,
            // либо просто обновлять точку MA по новой цене:
            if (maSeriesRef.current) {
                maSeriesRef.current.update({
                    time: candle.time,
                    value: candle.close
                });
            }
        };

        socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
        socket.onclose = () => {
            console.log('WebSocket closed');
        };

        // D1
        const socketD1 = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@kline_1d`);
        socketRefD1.current = socketD1;
        socketD1.onopen = () => {
            console.log('WebSocket connected');
        };
        socketD1.onmessage = (event) => {
            if (!isMounted || !chartRefD1.current || !seriesRefD1.current) return;

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

            // ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА ПЕРЕД ОБНОВЛЕНИЕМ
            if (chartRefD1.current && seriesRefD1.current) {
                seriesRefD1.current.update(candle);
            }

            // Для MA лучше использовать данные из fetch, накопленные в переменной,
            // либо просто обновлять точку MA по новой цене:
            maSeriesRefD1.current.update({
                time: candle.time,
                value: candle.close // Упрощенно, пока не пересчитали массив
            });
        };
        socketD1.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
        socketD1.onclose = () => {
            console.log('WebSocket closed');
        };

        // H1
        const socketH1 = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@kline_1h`);
        socketRefH1.current = socketH1;
        socketH1.onopen = () => {
            console.log('WebSocket connected');
        };
        socketH1.onmessage = (event) => {
            if (!isMounted || !chartRefH1.current || !seriesRefH1.current) return;

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

            // ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА ПЕРЕД ОБНОВЛЕНИЕМ
            if (chartRefH1.current && seriesRefH1.current) {
                seriesRefH1.current.update(candle);
            }

            // Для MA лучше использовать данные из fetch, накопленные в переменной,
            // либо просто обновлять точку MA по новой цене:
            maSeriesRefH1.current.update({
                time: candle.time,
                value: candle.close // Упрощенно, пока не пересчитали массив
            });
        };
        socketH1.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
        socketH1.onclose = () => {
            console.log('WebSocket closed');
        };

        // 5. Resize
        const handleResize = () => {
            if (!isMounted) return;

            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
            if (chartRefD1.current && chartContainerRefD1.current) {
                chartRefD1.current.applyOptions({ width: chartContainerRefD1.current.clientWidth });
            }
            if (chartRefH1.current && chartContainerRefH1.current) {
                chartRefH1.current.applyOptions({ width: chartContainerRefH1.current.clientWidth });
            }
        };

        window.addEventListener('resize', handleResize);

        // ВАЖНО: В cleanup сначала удаляем слушатель, а потом графики
        // 2. ИДЕАЛЬНЫЙ CLEANUP
        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize);

            // 1. Полностью "ослепляем" сокеты
            [socketRef, socketRefD1, socketRefH1].forEach(s => {
                if (s.current) {
                    s.current.onmessage = null; // Критически важно
                    s.current.onopen = null;
                    s.current.onerror = null;
                    s.current.onclose = null;
                    s.current.close();
                    s.current = null;
                }
            });

            // 2. Удаляем графики и зануляем ссылки
            const charts = [
                { ref: chartRef, container: chartContainerRef },
                { ref: chartRefD1, container: chartContainerRefD1 },
                { ref: chartRefH1, container: chartContainerRefH1 }
            ];

            charts.forEach(({ ref, container }) => {
                if (ref.current) {
                    const instance = ref.current;
                    ref.current = null; // Сначала зануляем ссылку в React
                    try {
                        instance.remove(); // Затем командуем библиотеке удалиться
                    } catch (e) {
                        // Игнорируем, если уже удалено
                    }
                }
                // 3. Физическая зачистка DOM от canvas-элементов
                if (container.current) {
                    container.current.innerHTML = '';
                }
            });
        };
    }, [pair, timeframe]);

    return (
        <div>
            <div className="row" style={{ marginBottom: '10px' }} >
                <div className="col-md-6">
                    <h1><FontAwesomeIcon icon={faChartLine} className="me-2" /> {t('trading')}</h1>
                    <p style={{ color: '#6c757d' }}>Терминал для торговли с графиками по выбранным символам и переключаемыми таймфреймами</p>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '38px', color: '#28a473', fontWeight: 'bold' }} >Balance: 100 $</div>
                </div>
            </div>

            <div className="row" style={{ marginBottom: '10px' }} >
                <div className="col-md-2"></div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-6" >
                            {/*
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handlePair('solusdt')} >SOL USDT</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handlePair('btcusdt')} >BTC USDT</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handlePair('ethusdt')} >ETH USDT</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handlePair('xrpusdt')} >XRP USDT</button>
                            */}
                            <button className="btn btn-primary" style={{ marginRight: '10px', width: '200px' }} onClick={() => openOrder('short')} >
                                <FontAwesomeIcon icon={faFileInvoiceDollar} className="me-2" /> Новый ордер
                            </button>
                            {/*
                            <button className="btn btn-red" style={{ marginRight: '10px', width: '200px' }} onClick={() => openOrder('short')} >Short</button>
                            <button className="btn btn-green" style={{ marginRight: '10px', width: '200px' }} onClick={() => openOrder('long')} >Long</button>
                            */}
                        </div>
                        <div className="col-md-6" style={{ textAlign: 'right' }} >
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('1m')} >M1</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('15m')} >M15</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('30m')} >M30</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('1h')} >H1</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('4h')} >H4</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('12h')} >H12</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('1d')} >D1</button>
                            <button className="btn btn-primary" style={{ marginRight: '5px' }} onClick={() => handleTimeframe('1w')} >W1</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginBottom: '10px' }} >
                <div className="col-md-2">
                    {/* Обертка для скролла */}
                    <div style={{
                        height: '540px',      // Фиксированная высота (подберите под экран)
                        overflowY: 'auto',    // Включаем вертикальный скролл
                        border: '1px solid #e7e7e7',
                        backgroundColor: '#fff'
                    }}>
                        <table style={{
                                width: '100%',
                                marginBottom: 0, // Убираем лишний отступ снизу
                                opacity: isUploading ? 0.5 : 1,
                                pointerEvents: isUploading ? 'none' : 'auto'
                            }} className="table table-striped table-hover" >
                            {/* Чтобы шапка "прилипла" к верху при скролле */}
                            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }}>
                                <tr>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} >ID</th>
                                    <th style={{ textAlign: 'left', verticalAlign: 'middle' }} >Symbol</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} >bid</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} >ask</th>
                                </tr>
                            </thead>
                            <tbody>
                                {symbolsFromDB.length > 0 ? symbolsFromDB.map(coin => (
                                    <tr
                                        key={coin.id}
                                        onClick={() => handlePair(coin.ticker)}
                                        style={{ cursor: 'pointer', backgroundColor: selectedCoin?.id === coin.id ? '#e8f4f6' : '' }}
                                    >
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{coin.id}</td>
                                        <td style={{ textAlign: 'left', verticalAlign: 'middle', fontWeight: 'bold' }}>
                                            {coin.ticker}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle', color: 'red' }}>
                                            {prices[coin.ticker] || '0.00'}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle', color: 'green' }}>
                                            {prices[coin.ticker] || '0.00'}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '40px' }}>
                                            <FontAwesomeIcon icon={faChartArea} size="3x" className="mb-3 text-muted" />
                                            <div className="text-muted">Данные в базе не найдены</div>
                                            <small className="text-muted">Настройте фильтры или загрузите данные с Binance</small>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-10" >
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card shadow-sm" >
                                <div className="card-header bg-dark text-white d-flex justify-content-between">
                                    <h6 className="mb-0">{pair.toUpperCase()} Live Chart / D1</h6>
                                    <small>Binance D1</small>
                                </div>
                                <div className="card-body p-0">
                                    <div ref={chartContainerRefD1} style={{ width: '100%', height: '500px' }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm" >
                                <div className="card-header bg-dark text-white d-flex justify-content-between">
                                    <h6 className="mb-0">{pair.toUpperCase()} Live Chart / H1</h6>
                                    <small>Binance H1</small>
                                </div>
                                <div className="card-body p-0">
                                    <div ref={chartContainerRefH1} style={{ width: '100%', height: '500px' }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm" >
                                <div className="card-header bg-dark text-white d-flex justify-content-between">
                                    <h6 className="mb-0">{pair.toUpperCase()} Live Chart / {timeframe}</h6>
                                    <small>Binance {timeframe}</small>
                                </div>
                                <div className="card-body p-0">
                                    <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*
            <div className="row" style={{ marginTop: '20px' }} >
                <div className="col-md-12" style={{ textAlign: 'center', verticalAlign: 'middle' }} >
                    <button className="btn btn-red" style={{ marginRight: '10px', width: '200px' }} onClick={() => openOrder('short')} >Short</button>
                    <button className="btn btn-green" style={{ marginRight: '10px', width: '200px' }} onClick={() => openOrder('long')} >Long</button>
                </div>
            </div>
            */}

            <div className="row" style={{ marginTop: '20px' }} >
                <div className="col-md-12" style={{ textAlign: 'center', verticalAlign: 'middle' }} >
                    {/* Навигация */}
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'trading' ? 'active' : ''}`}
                                onClick={() => setActiveTab('trading')}
                                style={activeTab === 'trading' ? { color: '#03aac7', fontWeight: 'bold' } : { color: '#727b83' }}
                            >
                                Торговля
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'signals' ? 'active' : ''}`}
                                onClick={() => setActiveTab('signals')}
                                style={activeTab === 'signals' ? { color: '#03aac7', fontWeight: 'bold' } : { color: '#727b83' }}
                            >
                                Сигналы
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'actives' ? 'active' : ''}`}
                                onClick={() => setActiveTab('actives')}
                                style={activeTab === 'actives' ? { color: '#03aac7', fontWeight: 'bold' } : { color: '#727b83' }}
                            >
                                Активы
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                                onClick={() => setActiveTab('history')}
                                style={activeTab === 'history' ? { color: '#03aac7', fontWeight: 'bold' } : { color: '#727b83' }}
                            >
                                История
                            </button>
                        </li>
                    </ul>


                    {/* Контент */}
                    <div className="tab-content p-3 border border-top-0">
                        {activeTab === 'trading' && (
                            <div className="tab-pane fade show active">
                                <h4>Активные торговые сделки</h4>
                                <p style={{ color: '#6c757d' }} >Контент активных торговых сделок...</p>
                            </div>
                        )}
                        {activeTab === 'signals' && (
                            <div className="tab-pane fade show active">
                                <h4>Сигналы</h4>
                                <p style={{ color: '#6c757d' }} >Контент по истории сигналов...</p>
                            </div>
                        )}
                        {activeTab === 'actives' && (
                            <div className="tab-pane fade show active">
                                <h4>Активы</h4>
                                <p style={{ color: '#6c757d' }} >Контент по активам...</p>
                            </div>
                        )}
                        {activeTab === 'history' && (
                            <div className="tab-pane fade show active">
                                <h4>История сделок</h4>
                                <p style={{ color: '#6c757d' }} >Контент истории сделок - журнал сделок трейдера</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* модальное окно */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>SHORT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Здесь указывается символ, текущая цена, TP, SL, плечо, и т.д.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button className="btn btn-red" onClick={handleShort} >Short</Button>
                </Modal.Footer>
            </Modal>

            {/* Модалка получает данные из стейта selectedCoin */}
            {selectedCoin && (
                <OrderModal
                    isOpen={isOrderOpen}
                    onClose={() => setOrderOpen(false)}
                    symbol={selectedCoin.ticker}
                    symbolId={selectedCoin.id}
                    type={orderType}
                    // Передаем живую цену или 0 если данных еще нет
                    bidPrice={prices[selectedCoin.ticker] || '0.00'}
                    askPrice={prices[selectedCoin.ticker] || '0.00'}
                />
            )}

        </div>
    );
};

export default Trading;