import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
//import { createChart, CandlestickSeries, LineSeries, createSeriesMarkers } from 'lightweight-charts';
import { createChart } from 'lightweight-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartLine, faArrowUp, faArrowDown, faCog, faPencilAlt, faEdit, faPenToSquare, faEye, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import OrderModal from '../../components/OrderModal';
import TradesService from '../../services/tradesService';
import AuthService from "../../services/authService";
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { usePrices } from '../../context/PricesContext';
import { useSignals } from '../../context/SignalsContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useNavigate, useLocation } from 'react-router-dom';

function calculateRSI(data, period = 14) {
    const rsiData = [];
    let gains = 0;
    let losses = 0;

    for (let i = 1; i < data.length; i++) {
        const diff = data[i].close - data[i - 1].close;
        if (diff >= 0) gains += diff;
        else losses -= diff;

        if (i >= period) {
            if (i > period) {
                const prevDiff = data[i - 1].close - data[i - 2].close;
                // Упрощенное скользящее среднее для RSI
                // (Это базовая логика, для идеала лучше использовать EMA-сглаживание)
            }
            const rs = gains / (losses || 1);
            rsiData.push({ time: data[i].time, value: 100 - (100 / (1 + rs)) });

            // Сбрасываем для следующего шага (упрощенно)
            gains = 0; losses = 0;
        }
    }
    return rsiData;
}

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

    const { userId } = useApp();

    const [pair, setPair] = useState('solusdt');
    const [timeframe, setTimeframe] = useState('1m');

    const prices = usePrices(); // из контекста получаем текущие цены, которые приходят с бекенда через WebSocket
    const currentPriceSOLUSDT = prices['SOLUSDT']?.close || 0;
    const currentSymbol = pair.toUpperCase();
    const livePrice = prices[currentSymbol]?.close || "0.00";

    const signals = useSignals();

    /*useEffect(() => {
        console.log("Prices updated in Trading component:", prices);
    }, [prices]);*/

    function handlePair(newPair) {
        console.log(newPair);
        const coin = symbolsFromDB.find(s => s.ticker === newPair);
        if (coin) {
            setSelectedCoin(coin); // обновляем стейт, чтобы модалка увидела изменения
        }
        // код для смены графика TradingView
        if (chartContainerRef.current) {
            setPair(newPair); // Это спровоцирует перезапуск useEffect выше
        }
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

    // Форматируем время один раз (или используем живые часы)
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [infoAboutTradingSessions, setInfoAboutTradingSessions] = useState("");
    // Добавляем состояние загрузки
    const [isLoadingTradingSessions, setIsLoadingTradingSessions] = useState(true);
    useEffect(() => {
        const fetchSessionInfo = async () => {
                setIsLoadingTradingSessions(true); // Начало загрузки
                try {
                    const response = await fetch('http://localhost:8082/api/v1/trades/info-trading-sessions', {
                        method: 'GET',
                        headers: {
                            'Accept-Language': localStorage.getItem('i18nextLng') || 'en'
                        }
                    });
                    if (response.ok) {
                        const text = await response.text();
                        setInfoAboutTradingSessions(text);
                    } else {
                        console.error("Сервер вернул ошибку:", response.status);
                    }
                } catch (error) {
                    console.error("Ошибка сети:", error);
                } finally {
                    // 3. Устанавливаем false в любом случае (успех или провал)
                    setIsLoadingTradingSessions(false);
                }
            };
            fetchSessionInfo();
    }, []); // Пустой массив — запрос выполнится один раз при загрузке

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
        { id: 11, ticker: 'DASHUSDT', name: 'DASH' },

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
    //const [prices, setPrices] = useState({});

    // 4. Состояние модального окна
    const [isOrderOpen, setOrderOpen] = useState(false);

    // 5. Тип ордера (long или short)
    const [orderType, setOrderType] = useState('long');

    // Функция-хелпер для открытия модалки
    const openOrder = (type) => {
        setOrderType(type);
        setOrderOpen(true);
    };

    // Чтобы прочитать параметр Таба из URL при линке на страницу, например: /trading?tab=history
    const location = useLocation();

    // 1. Сначала объявляем стейты
    const [activeOrders, setActiveOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(location.search);
        return params.get('tab') || 'trading';
    });
    // Если нужно, чтобы табы переключались "на лету" при изменении URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location]);
    const [show, setShow] = useState(false);

    // 2. Объявляем функцию загрузки (ДО useEffect)
    const fetchActiveOrders = async () => {
        if (!userId) return;
        try {
            const response = await TradesService.getTradesActiveByUserId(userId);
            console.log("Data received:", response.data); // Проверьте консоль!
            setActiveOrders(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    // 3. Запускаем useEffect
    useEffect(() => {
        console.log("🛠 useEffect СРАБОТАЛ. Текущий юзер ID:", userId);
        if (userId) {
            fetchActiveOrders();
        }
    }, [userId]);

    useEffect(() => {
        if (activeTab === 'actives' && userId) {
            fetchActiveOrders(); // Принудительно обновляем данные при открытии вкладки
        }
    }, [activeTab, userId]);

    // 4. Расчеты (всегда после стейтов)
    const totalPnL = activeOrders.reduce((sum, order) => {
        const currentPrice = prices[order.symbol]?.close || order.openPrice;
        const orderType = order.side || 'BUY';

        const pnl = orderType === 'BUY'
            ? (currentPrice - order.entryPrice) * order.volume
            : (order.entryPrice - currentPrice) * order.volume;
        return sum + pnl;
    }, 0);

    const totalVolume = activeOrders.reduce((sum, order) => sum + (parseFloat(order.volume) || 0), 0);

    // Закрываем сделку по клику
    const handleCloseOrder = async (id) => {
        // Находим наш ордер, чтобы взять актуальную цену
        const order = activeOrders.find(o => o.id === id);
        if (!order) return;
        // Берем цену из WebSocket (prices) или цену входа, если обновлений еще нет
        const currentPrice = prices[order.symbol]?.close || order.openPrice;
        if (!window.confirm(`Вы уверены, что хотите закрыть ${order.symbol} сделку ID=${id} по цене ${currentPrice}?`)) return;
        try {
            // Передаем и ID, и цену закрытия
            const response = await TradesService.closeTrade(id, currentPrice);

            if (response.status === 200 || response.status === 204) {
                console.log("Сделка успешно закрыта");
                fetchActiveOrders(); // Перезагружаем таблицу
            }
        } catch (error) {
            console.error("Ошибка сервера:", error.response?.data);
            alert("Ошибка при закрытии: " + (error.response?.data?.message || "Неизвестная ошибка"));
        }
    };

    const [tradeHistory, setTradeHistory] = useState([]);
    const fetchClosedOrders = async () => {
        if (!userId) return;
        try {
            const response = await TradesService.getTradesClosedByUserId(userId);
            console.log("History received:", response.data);
            setTradeHistory(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке истории:", error);
        }
    };

    // Вызываем загрузку при переключении на вкладку 'history' или при загрузке страницы
    useEffect(() => {
        if (userId && activeTab === 'history') {
            fetchClosedOrders();
        }
    }, [userId, activeTab]);

    //const [signals, setSignals] = useState([]);

    // Функции для управления состоянием
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isModalOpen, setModalOpen] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const navigate = useNavigate();
    const handleView = async (tradeId, tab) => {
        //alert("Просмотр!");
        // Переход на страницу конкретной сделки
        // Вместо "1" подставляем динамический ID
        navigate(`/trade/${tradeId}?tab=${tab}`);
    }

    // WebSocket - с минутными данными Backend
    /*useEffect(() => {
        const socket = new WebSocket('ws://localhost:8082/ws/signals');
        socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.type !== "CANDLE") return; // отбрасываем SIGNAL и другие типы сообщений

            // ВАЖНО: Проверьте названия полей, которые шлет ваша Java (candle.getClose() и т.д.)
            // Если Java шлет объект Candle, приводим его к формату Lightweight Charts
            const newCandle = {
                time: msg.openTime / 1000, // Конвертируем в секунды
                open: parseFloat(msg.open),
                high: parseFloat(msg.high),
                low: parseFloat(msg.low),
                close: parseFloat(msg.close),
            };

            // Обновляем серию (метод update либо добавит новую свечу, либо обновит текущую)
            if (seriesRef.current) {
                seriesRef.current.update(newCandle);
            }
        };
        return () => socket.close();
    }, []);*/

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
            // ВКЛЮЧАЕМ ЛЕВУЮ ШКАЛУ ТУТ
            /*leftPriceScale: {
                visible: true,
                borderVisible: true,
            },*/
            rightPriceScale: {
                visible: true,
                autoScale: true,
            },
            /*timeScale: {
                timeVisible: true,
                borderVisible: true,
            },*/
        });
        /*chart.priceScale('right').applyOptions({
            scaleMargins: {
                top: 0.1,    // небольшой отступ сверху
                bottom: 0.4, // оставляем 40% места снизу пустым!
            },
        });*/
        chartRef.current = chart;

        // RSI
        // RSI серия
        //const rsiSeries = chart.addSeries(LineSeries, {
        /*const rsiSeries = chart.addLineSeries({
            color: 'purple',
            lineWidth: 2,
            priceScaleId: 'left',
        });

        // данные RSI
        rsiSeries.setData([
            { time: '2024-01-01', value: 30 },
            { time: '2024-01-02', value: 50 },
            { time: '2024-01-03', value: 70 },
        ]);

        // границы 0–100
        rsiSeries.createPriceLine({ price: 0, color: 'transparent' });
        rsiSeries.createPriceLine({ price: 100, color: 'transparent' });

        // уровни
        [20, 80].forEach((val) => {
            rsiSeries.createPriceLine({
                price: val,
                color: 'red',
                lineStyle: 2,
                axisLabelVisible: true,
            });
        });

        // настройки шкалы
        chart.priceScale('left').applyOptions({
            autoScale: true,
            scaleMargins: {
                top: 0.7,
                bottom: 0.05,
            },
        });*/

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
        //const maSeries = chart.addSeries(LineSeries, {
        const maSeries = chart.addLineSeries({
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRef.current = maSeries;

        const maSeriesD1 = chartD1.addLineSeries({
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRefD1.current = maSeriesD1;

        const maSeriesH1 = chartH1.addLineSeries({
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRefH1.current = maSeriesH1;

        // Добавляем серию свечей
        const candleSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRef.current = candleSeries;

        const candleSeriesD1 = chartD1.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRefD1.current = candleSeriesD1;

        const candleSeriesH1 = chartH1.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });
        seriesRefH1.current = candleSeriesH1;

        // 3. Загружаем историю
        // Исторические данные для M1 (200 последних свечей)
        fetch(`https://api.binance.com/api/v3/klines?symbol=${pair.toUpperCase()}&interval=${timeframe}&limit=200`)
            .then(res => res.json())
            .then(data => {
                if (!isMounted || !Array.isArray(data)) return;

                // 2. Форматируем массив данных под формат библиотеки
                const formattedCandles = data.map(c => ({
                    time: c[0] / 1000,          // Binance ms -> Seconds
                    open: parseFloat(c[1]),
                    high: parseFloat(c[2]),
                    low: parseFloat(c[3]),
                    close: parseFloat(c[4]),
                })).filter(c => !isNaN(c.close));

                if (formattedCandles.length > 0 && seriesRef.current) {
                     try {
                         // В версии 4.2.1 setData ОЧЕНЬ чувствительна к NaN
                         console.log("------------->", formattedCandles);
                         seriesRef.current.setData(formattedCandles); // !!!!!!!!!!!!
                     } catch (err) {
                         console.error("Критическая ошибка отрисовки:", err.message);
                     }
                } else {
                    console.log("!!!!!!!!!!!!!");
                }

                // Пример данных о сделках
                const buyTime = formattedCandles[formattedCandles.length - 20].time;
                const buyPrice = formattedCandles[formattedCandles.length - 20].close;
                const sellTime = formattedCandles[formattedCandles.length - 5].time;
                const sellPrice = formattedCandles[formattedCandles.length - 5].close;

                if (formattedCandles.length > 20) {
                    // Устанавливаем базу
                    candleSeries.setData(formattedCandles);

                    // Формируем маркеры, беря время ПРЯМО из отформатированных данных
                    const markers = [
                        {
                            time: formattedCandles[formattedCandles.length - 20].time,
                            position: 'belowBar',
                            color: '#2196F3',
                            shape: 'arrowUp',
                            text: 'BUY'
                        },
                        {
                            time: formattedCandles[formattedCandles.length - 5].time,
                            position: 'aboveBar',
                            color: '#e91e63',
                            shape: 'arrowDown',
                            text: 'SELL'
                        }
                    ];

                    console.log('================>', markers);
                    // Теперь это безопасно
                    candleSeries.setMarkers(markers);
                }

                // Создаем серию для линии сделки
                //const tradeLineSeries = chart.addSeries(LineSeries, {
                const tradeLineSeries = chart.addLineSeries({
                    color: '#95a5a6',
                    lineWidth: 1,
                    lineStyle: 2, // 2 — это штриховая линия (Dashed)
                    priceLineVisible: false, // Скрываем горизонтальную линию цены
                    lastValueVisible: false,  // Скрываем метку последнего значения
                    crosshairMarkerVisible: false, // Скрываем точку при наведении
                });
                // Передаем только две точки: вход и выход
                if (buyTime && sellTime) {
                    tradeLineSeries.setData([
                        { time: buyTime, value: buyPrice },
                        { time: sellTime, value: sellPrice }
                    ]);
                }

                // РАСЧЕТ MA ДАННЫХ
                const maData = formattedCandles.map((val, index, arr) => {
                    const period = 7; // Период скользящей средней
                    if (index < period) return null;
                    const slice = arr.slice(index - period, index);
                    const sum = slice.reduce((a, b) => a + b.close, 0);
                    return { time: val.time, value: sum / period };
                }).filter(v => v !== null);

                if (maSeries && maData.length > 0) {
                    maSeries.setData(maData);
                }

                // РАСЧЕТ И ОТРИСОВКА РЕАЛЬНОГО RSI
                /*const realRSIData = calculateRSI(candles, 14);
                if (rsiSeries && realRSIData.length > 0) {
                    rsiSeries.setData(realRSIData);
                }*/

                // Для теста ставим одну точку (или рассчитайте полноценный массив RSI)
                /*const lastCandle = candles[candles.length - 1];
                rsiSeries.setData([
                    { time: lastCandle.time, value: 50 }
                ]);*/
            })
            .catch(err => { if (isMounted) console.error('History load error:', err) });

        // Исторические данные для D1 (200 последних свечей)
        fetch(`https://api.binance.com/api/v3/klines?symbol=${pair.toUpperCase()}&interval=1d&limit=200`)
            .then(res => res.json())
            .then(data => {
                if (!isMounted) return;

                // 2. Форматируем массив данных под формат библиотеки
                const candles = data.map(c => ({
                    time: c[0] / 1000,          // Binance ms -> Seconds
                    open: parseFloat(c[1]),
                    high: parseFloat(c[2]),
                    low: parseFloat(c[3]),
                    close: parseFloat(c[4]),
                })).filter(c => !isNaN(c.close));

                if (candleSeriesD1 && candles.length > 0) {
                    // В версии 4.2.1 setData ОЧЕНЬ чувствительна к NaN
                    candleSeriesD1.setData(candles);   // !!!!!!!!!!!
                }

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
                //const tradeLineSeriesD1 = chartD1.addSeries(LineSeries, {
                const tradeLineSeriesD1 = chartD1.addLineSeries({
                    color: '#95a5a6',
                    lineWidth: 1,
                    lineStyle: 2, // 2 — это штриховая линия (Dashed)
                    priceLineVisible: false, // Скрываем горизонтальную линию цены
                    lastValueVisible: false,  // Скрываем метку последнего значения
                    crosshairMarkerVisible: false, // Скрываем точку при наведении
                });
                // Передаем только две точки: вход и выход
                if (tradeLineSeriesD1 && buyTime && sellTime) {
                    tradeLineSeriesD1.setData([
                        { time: buyTime, value: buyPrice },
                        { time: sellTime, value: sellPrice }
                    ]);
                }

                if (candleSeriesD1 && candles.length > 10) {
                    // Установка маркеров на серию свечей
                    candleSeriesD1.setMarkers(tradeMarkers);
                }

                // РАСЧЕТ MA ДАННЫХ
                const maDataD1 = candles.map((val, index, arr) => {
                    const period = 7; // Период скользящей средней
                    if (index < period) return null;
                    const slice = arr.slice(index - period, index);
                    const sum = slice.reduce((a, b) => a + b.close, 0);
                    return { time: val.time, value: sum / period };
                }).filter(v => v !== null);

                if (maSeriesD1 && maDataD1.length > 0) {
                    maSeriesD1.setData(maDataD1);
                }
            })
            .catch(err => { if (isMounted) console.error('History load error:', err) });

        // Исторические данные для H1 (200 последних свечей)
        fetch(`https://api.binance.com/api/v3/klines?symbol=${pair.toUpperCase()}&interval=1h&limit=200`)
            .then(res => res.json())
            .then(data => {
                if (!isMounted) return;

                const candles = data.map(c => {
                    const time = Number(c?.[0]);
                    const open = Number(c?.[1]);
                    const high = Number(c?.[2]);
                    const low = Number(c?.[3]);
                    const close = Number(c?.[4]);

                    return {
                        time: time ? time / 1000 : null,
                        open,
                        high,
                        low,
                        close,
                    };
                })
                .filter(c =>
                    Number.isFinite(c.time) &&
                    Number.isFinite(c.open) &&
                    Number.isFinite(c.high) &&
                    Number.isFinite(c.low) &&
                    Number.isFinite(c.close)
                );
                if (candleSeriesH1 && candles) {
                    // В версии 4.2.1 setData ОЧЕНЬ чувствительна к NaN
                    candleSeriesH1.setData(candles);  // !!!!!!!!!!
                }

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
                //const tradeLineSeries = chartH1.addSeries(LineSeries, {
                const tradeLineSeriesH1 = chartH1.addLineSeries({
                    color: '#95a5a6',
                    lineWidth: 1,
                    lineStyle: 2, // 2 — это штриховая линия (Dashed)
                    priceLineVisible: false, // Скрываем горизонтальную линию цены
                    lastValueVisible: false,  // Скрываем метку последнего значения
                    crosshairMarkerVisible: false, // Скрываем точку при наведении
                });
                // Передаем только две точки: вход и выход
                if (tradeLineSeriesH1 && buyTime && sellTime) {
                    tradeLineSeriesH1.setData([
                        { time: buyTime, value: buyPrice },
                        { time: sellTime, value: sellPrice }
                    ]);
                }

                if (candleSeriesH1 && candles.length > 10) {
                    // Установка маркеров на серию свечей
                    candleSeriesH1.setMarkers(tradeMarkers);
                }

                // РАСЧЕТ MA ДАННЫХ
                const maDataH1 = candles.map((val, index, arr) => {
                    const period = 7; // Период скользящей средней
                    if (index < period) return null;
                    const slice = arr.slice(index - period, index);
                    const sum = slice.reduce((a, b) => a + b.close, 0);
                    return { time: val.time, value: sum / period };
                }).filter(v => v !== null);

                if (maSeriesH1 && maDataH1.length > 0) {
                    maSeriesH1.setData(maDataH1);
                }
            })
            .catch(err => { if (isMounted) console.error('History load error:', err) });

        // 4. WebSocket
        /*const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.toLowerCase()}@kline_${timeframe}`);
        socketRef.current = socket;
        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            if (!isMounted || !chartRef.current || !seriesRef.current) return;

            const parsed = JSON.parse(event.data);
            const k = parsed.k;
            if (!k) return;

            // 2. Парсим значения
            const t = k.t / 1000;
            const o = parseFloat(k.o);
            const h = parseFloat(k.h);
            const l = parseFloat(k.l);
            const c = parseFloat(k.c);

            // 2. КРИТИЧЕСКАЯ ПРОВЕРКА: Если хоть одно число NaN, выходим
            if (isNaN(t) || isNaN(o) || isNaN(h) || isNaN(l) || isNaN(c)) {
                console.warn("WebSocket received invalid data:", k);
                return;
            }
            const candle = {
                time: t,
                open: o,
                high: h,
                low: l,
                close: c,
            };

            // 3. Обновляем цены в стейте
            const symbol = parsed.s;
            setPrices(prev => ({
                ...prev,
                [symbol]: c.toFixed(2)
            }));

            // 4. Обновляем график (через ref)
            try {
                const isValidNumber = (v) => Number.isFinite(v);
                if (
                    seriesRef.current &&
                    isValidNumber(candle.time) &&
                    isValidNumber(candle.open) &&
                    isValidNumber(candle.high) &&
                    isValidNumber(candle.low) &&
                    isValidNumber(candle.close)
                ) {
                    seriesRef.current.update(candle);  // !!!!!!!!!
                }
                if (
                    maSeriesRef.current &&
                    isValidNumber(t) &&
                    isValidNumber(c)
                ) {
                    maSeriesRef.current.update({
                        time: t,
                        value: c
                    });
                }
            } catch (err) {
                console.error("Error updating chart from socket:", err);
            }
        };

        socket.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
        socket.onclose = () => {
            console.log('WebSocket closed');
        };*/

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

            // 2. Парсим значения
            const t = k.t / 1000;
            const o = parseFloat(k.o);
            const h = parseFloat(k.h);
            const l = parseFloat(k.l);
            const c = parseFloat(k.c);

            // 2. КРИТИЧЕСКАЯ ПРОВЕРКА: Если хоть одно число NaN, выходим
            if (isNaN(t) || isNaN(o) || isNaN(h) || isNaN(l) || isNaN(c)) {
                console.warn("WebSocket received invalid data:", k);
                return;
            }
            const candle = {
                time: t,
                open: o,
                high: h,
                low: l,
                close: c,
            };

            // ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА ПЕРЕД ОБНОВЛЕНИЕМ
            if (chartRefD1.current && candle) {
                seriesRefD1.current.update(candle);  // !!!!!!!!
            }

            // Для MA лучше использовать данные из fetch, накопленные в переменной,
            // либо просто обновлять точку MA по новой цене:
            if (maSeriesRefD1.current) {
                maSeriesRefD1.current.update({
                    time: candle.time,
                    value: candle.close // Упрощенно, пока не пересчитали массив
                });
            }
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

            // 2. Парсим значения
            const t = k.t / 1000;
            const o = parseFloat(k.o);
            const h = parseFloat(k.h);
            const l = parseFloat(k.l);
            const c = parseFloat(k.c);

            // 2. КРИТИЧЕСКАЯ ПРОВЕРКА: Если хоть одно число NaN, выходим
            if (isNaN(t) || isNaN(o) || isNaN(h) || isNaN(l) || isNaN(c)) {
                console.warn("WebSocket received invalid data:", k);
                return;
            }
            const candle = {
                time: t,
                open: o,
                high: h,
                low: l,
                close: c,
            };

            // ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА ПЕРЕД ОБНОВЛЕНИЕМ
            if (chartRefH1.current && seriesRefH1.current) {
                seriesRefH1.current.update(candle);  // !!!!!!!!
            }

            // Для MA лучше использовать данные из fetch, накопленные в переменной,
            // либо просто обновлять точку MA по новой цене:
            if (maSeriesRefH1.current) {
                maSeriesRefH1.current.update({
                    time: candle.time,
                    value: candle.close // Упрощенно, пока не пересчитали массив
                });
            }
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
            {/*
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', fontSize: '12px' }}>
                {JSON.stringify(signals, null, 2)} Live {currentSymbol}: {livePrice} USDT
            </pre>
            */}

            <div className="row" style={{ marginBottom: '10px' }} >
                <div className="col-md-6">
                    <h1><FontAwesomeIcon icon={faChartLine} className="me-2" /> {t('trading')}</h1>
                    <p style={{ color: '#6c757d' }}>Терминал для торговли с графиками по выбранным символам и переключаемыми таймфреймами</p>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '38px', color: '#28a473', fontWeight: 'bold' }} >Balance: 100 USDT</div>
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
                                fontSize: '12px',
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
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} >spread</th>
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
                                            {prices[coin.ticker.toUpperCase()]?.bid || '0.00'}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle', color: 'green' }}>
                                            {prices[coin.ticker.toUpperCase()]?.ask || '0.00'}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle', color: '#000' }}>
                                            {prices[coin.ticker.toUpperCase()]?.spread || '0.00'}
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
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'theory' ? 'active' : ''}`}
                                onClick={() => setActiveTab('theory')}
                                style={activeTab === 'theory' ? { color: '#03aac7', fontWeight: 'bold' } : { color: '#727b83' }}
                            >
                                Теория
                            </button>
                        </li>
                    </ul>


                    {/* Контент */}
                    <div className="tab-content p-3 border border-top-0">
                        {activeTab === 'trading' && (
                            <div className="tab-pane fade show active">
                                <div className="table-responsive">
                                    <table className="table table-dark-custom table-hover align-middle" style={{ fontSize: '14px', marginBottom: '0', marginTop: '0' }}>
                                        <thead className="text-muted" style={{ borderBottom: '2px solid #dee2e6' }}>
                                            <tr>
                                                <th style={{ width: '50px' }}>№</th>
                                                <th>ID</th>
                                                <th>Символ</th>
                                                <th>Время открытия</th>
                                                <th>Тип</th>
                                                <th>Объем</th>

                                                <th>Цена входа</th>
                                                <th>S / L</th>
                                                <th>T / P</th>

                                                <th>Текущая цена</th>
                                                <th>Прибыль (USDT)</th>
                                                <th className="text-end">Действие</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activeOrders.length > 0 ? (
                                                <>
                                                    {activeOrders.map((order, index) => {
                                                        // 1. Защита от пустых данных (fallback)
                                                        const orderType = order.side || 'buy';
                                                        let currentPrice = 0;
                                                        if (orderType === 'buy') {
                                                            // Если у вас открыта покупка (Long), вы будете ЗАКРЫВАТЬ её продажей.
                                                            // Продать можно по цене покупки других участников — BID.
                                                            currentPrice = prices[order.symbol]?.bid || 0;
                                                        } else {
                                                            // Если у вас открыта продажа (Short), вы будете ЗАКРЫВАТЬ её покупкой.
                                                            // Купить можно по цене продажи других участников — ASK.
                                                            currentPrice = prices[order.symbol]?.ask || 0;
                                                        }
                                                        const entryPrice = order.openPrice || 0;
                                                        const volume = order.quantity || 0;

                                                        const pnl = orderType === 'BUY'
                                                            ? (currentPrice - entryPrice) * volume
                                                            : (entryPrice - currentPrice) * volume;

                                                        return (
                                                            <tr key={order.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                                                                <td className="text-muted">{index + 1}</td>
                                                                <td className="text-muted small">{order.id}</td>
                                                                <td className="fw-bold">{order.symbol}</td>
                                                                <td className="text-muted">{formatDate(order.openedAt)}</td>
                                                                <td>
                                                                    <span className={`badge ${orderType === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                                                                        {orderType}
                                                                    </span>
                                                                </td>
                                                                <td>{order.quantity}</td>

                                                                <td>{order.openPrice}</td>
                                                                <td>{order.stopLoss ? order.stopLoss : '-'}</td>
                                                                <td>{order.takeProfit ? order.takeProfit : '-'}</td>

                                                                <td className="fw-bold">{currentPrice ? currentPrice : '-'}</td>
                                                                <td className={pnl >= 0 ? 'text-success' : 'text-danger'}>
                                                                    {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
                                                                </td>
                                                                <td className="text-end">
                                                                    <button className="btn btn-primary btn-sm" onClick={() => handleView(order.id, 'trading')} title={t('view_details')} style={{ fontSize: '12px', marginRight: '5px' }}>
                                                                        <FontAwesomeIcon icon={faEye} />
                                                                    </button>
                                                                    <button className="btn btn-primary btn-sm" onClick={() => handleCloseOrder(order.id)} title={t('edit_trade')} style={{ fontSize: '12px', marginRight: '5px' }}>
                                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                                    </button>
                                                                    {/*
                                                                    <a href="#" onClick={(e) => {  }} title="Edit" style={{ cursor: "pointer" }} >
                                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                                    </a>
                                                                    */}
                                                                    <button className="btn btn-primary btn-sm" onClick={() => handleCloseOrder(order.id)} title={t('close_trade')} style={{ fontSize: '12px' }}>
                                                                        Закрыть {currentPrice}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    {/* Торговые сессии */}
                                                    <tr>
                                                        <td colSpan="12" className="text-muted" style={{ textAlign: 'left' }} >
                                                            {isLoadingTradingSessions ? "Загрузка торговых сессий..." : (infoAboutTradingSessions || currentTime)}
                                                        </td>
                                                    </tr>
                                                    {/* БАЛАНС */}
                                                    <tr style={{ backgroundColor: 'rgba(255,255,255,0.05)', fontWeight: 'bold', borderTop: '2px solid #dee2e6' }}>
                                                        <td colSpan="10" className="text-muted" style={{ textAlign: 'left' }} >Баланс: {totalVolume.toFixed(2)} USTD</td>
                                                        <td className={totalPnL >= 0 ? 'text-success' : 'text-danger'}>
                                                            {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
                                                        </td>
                                                        <td className="text-end">
                                                            {/*<button
                                                                className="btn btn-danger btn-sm"
                                                                style={{ fontSize: '11px', padding: '2px 10px' }}
                                                                onClick={() => console.log("Закрыть все сделки")}
                                                            > Закрыть все</button>*/}
                                                        </td>
                                                    </tr>
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan="12" className="text-center py-5 text-muted">
                                                        Нет активных сделок
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'signals' && (
                            <div className="tab-pane fade show active">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="m-0">История сигналов</h4>
                                    <button className="btn btn-sm btn-outline-danger">Очистить лог</button>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover align-middle" style={{ fontSize: '14px' }}>
                                        <thead className="bg-light text-muted">
                                            <tr>
                                                <th style={{ width: '50px' }}>№</th>
                                                <th>Время</th>
                                                <th>Символ</th>
                                                <th>Тип сигнала</th>
                                                <th>Цена</th>
                                                <th>Сообщение</th>
                                                <th className="text-end">График</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {signals.length > 0 ? signals.map((sig, index) => (
                                                <tr key={sig.id || index} style={{ borderLeft: (sig.signal === 'BUY' || sig.type === 'BUY') ? '3px solid #198754' : '3px solid #dc3545' }}>
                                                    <td className="text-muted">{index + 1}</td>
                                                    <td className="text-muted">{new Date(sig.time).toLocaleTimeString()}</td>
                                                    <td className="fw-bold">{sig.symbol}</td>
                                                    <td>
                                                        <span className={`badge ${(sig.signal === 'BUY' || sig.type === 'BUY') ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                            {sig.signal || sig.type}
                                                        </span>
                                                    </td>
                                                    <td className="fw-bold">{sig.price}</td>
                                                    <td>{sig.label}</td>
                                                    <td className="text-end">
                                                        <button className="btn btn-sm btn-light border" onClick={() => handlePair(sig.symbol)}>
                                                            Посмотреть
                                                        </button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-5 text-muted">
                                                        <div className="mb-2">📡 Ожидание новых сигналов от анализатора...</div>
                                                        <small>Сигналы появятся здесь автоматически при срабатывании стратегий</small>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'actives' && (
                            <div className="tab-pane fade show active">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="p-3">
                                            <h5 style={{ color: '#6c757d' }}>Анализ портфеля</h5>
                                            {activeOrders.length > 0 ? (
                                                <ul className="list-unstyled mt-3">
                                                    <li className="mb-2">Активных сделок: <strong>{activeOrders.length}</strong></li>
                                                    <li className="mb-2">Общая стоимость: <strong>{totalVolume.toFixed(2)} USDT</strong></li>
                                                    <li className="mb-2">Средний объем: <strong>{(totalVolume / activeOrders.length).toFixed(2)} USDT</strong></li>
                                                </ul>
                                            ) : (
                                                <p className="text-muted">Загрузите данные для анализа...</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="card shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid #333', borderRadius: '15px' }}>
                                            <div className="card-body">
                                                <h5 className="card-title text-center mb-4" style={{ color: '#6c757d' }}>Распределение активов (USDT)</h5>

                                                <div style={{ width: '100%', height: '300px' }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={activeOrders.length > 0 ? activeOrders.reduce((acc, order) => {
                                                                    const symbol = order.symbol || order.ticker || 'Unknown';
                                                                    // Важно: приводим к числу, так как из БД могут прийти строки
                                                                    const qty = parseFloat(order.quantity) || 0;
                                                                    const price = parseFloat(order.openPrice) || parseFloat(order.entryPrice) || 0;
                                                                    const volume = qty * price;

                                                                    if (volume > 0) {
                                                                        const existing = acc.find(item => item.name === symbol);
                                                                        if (existing) {
                                                                            existing.value += volume;
                                                                        } else {
                                                                            acc.push({ name: symbol, value: parseFloat(volume.toFixed(2)) });
                                                                        }
                                                                    }
                                                                    return acc;
                                                                }, []) : [{ name: 'Нет данных', value: 1 }]} // Заглушка, если пусто
                                                                cx="50%"
                                                                cy="50%"
                                                                innerRadius={70}
                                                                outerRadius={100}
                                                                paddingAngle={5}
                                                                dataKey="value"
                                                                stroke="none"
                                                            >
                                                                {/* Цвета */}
                                                                <Cell fill="#0088FE" />
                                                                <Cell fill="#00C49F" />
                                                                <Cell fill="#FFBB28" />
                                                                <Cell fill="#FF8042" />
                                                                <Cell fill="#8884d8" />
                                                            </Pie>
                                                            <Tooltip
                                                                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #444', color: '#fff' }}
                                                            />
                                                            <Legend />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'history' && (
                            <div className="tab-pane fade show active">
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle" style={{ fontSize: '14px' }}>
                                        <thead className="bg-light text-muted">
                                            <tr>
                                                <th style={{ width: '50px' }}>№</th>
                                                <th>ID</th>
                                                <th>Время открытия</th>
                                                <th>Символ</th>
                                                <th>Тип</th>
                                                <th>Объем</th>
                                                <th>Вход</th>
                                                <th>S / L</th>
                                                <th>T / P</th>
                                                <th>Время закрытия</th>
                                                <th>Выход</th>
                                                <th>Результат (USDT)</th>
                                                <th>Изменение (%)</th>
                                                <th className="text-end">Действие</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tradeHistory.length > 0 ? tradeHistory.map((trade, index) => {
                                                const side = (trade.side || trade.type || 'BUY').toUpperCase();
                                                const openPrice = parseFloat(trade.openPrice || trade.entryPrice || 0);
                                                const closePrice = parseFloat(trade.closePrice || trade.exitPrice || 0);
                                                const profit = parseFloat(trade.profitLoss || 0);
                                                let pnlPercent = 0;
                                                if (openPrice > 0) {
                                                    pnlPercent = side === 'BUY' || side === 'LONG'
                                                        ? ((closePrice - openPrice) / openPrice) * 100
                                                        : ((openPrice - closePrice) / openPrice) * 100;
                                                }

                                                return (
                                                    <tr key={trade.id}>
                                                        <td>{index + 1}</td>
                                                        <td className="text-muted">{trade.id}</td>
                                                        <td className="text-muted">{formatDate(trade.openedAt)}</td>
                                                        <td className="fw-bold">{trade.symbol}</td>
                                                        <td>
                                                            <span className={`badge ${side === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                                                                {side}
                                                            </span>
                                                        </td>
                                                        <td>{trade.quantity}</td>
                                                        <td>{trade.openPrice}</td>
                                                        <td>{trade.stopLoss || '-'}</td>
                                                        <td>{trade.takeProfit || '-'}</td>
                                                        <td className="text-muted">{formatDate(trade.closedAt)}</td>
                                                        <td>{trade.closePrice}</td>
                                                        <td className={profit >= 0 ? 'text-success' : 'text-danger'}>
                                                            {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                                                        </td>
                                                        <td className={pnlPercent >= 0 ? 'text-success' : 'text-danger'}>
                                                            {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                                                        </td>
                                                        <td className="text-end">
                                                            <button className="btn btn-primary btn-sm" onClick={() => handleView(trade.id, 'history')} title={t('view_details')} style={{ fontSize: '12px' }}>
                                                                <FontAwesomeIcon icon={faEye} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            }) : (
                                                <tr>
                                                    <td colSpan="14" className="text-center py-5 text-muted">
                                                        История сделок пуста. Совершите свою первую сделку!
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'theory' && (
                            <div className="tab-pane fade show active">
                                <div className="row">
                                    <div className="col-md-12 text-muted" style={{ textAlign: 'left' }}>
                                        <div style={{ marginBottom: '10px' }}><b>Плечо (leverage)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Плечо (leverage) - влияет на размер позиции и риск.<br/>
                                            Плечо не влияет на расчет прибыли/убытка в USDT, так как для этого используется величина лота. <br/>
                                            Только величина лота влияет на величину прибыли/убытка в USDT.<br/>
                                            Чем выше плечо, тем меньше лот нужно использовать, чтобы достичь той же прибыли в USDT.
                                            Но при этом риск увеличивается, так как цена может двигаться против вас с большей силой.
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>Трейлинг-стоп (Trailing Stop)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Трейлинг-стоп — это динамический защитный ордер, который автоматически следует
                                            за ценой актива, если она движется в сторону прибыли, и остается на месте,
                                            если цена разворачивается.<br/>
                                            Как это работает:<br/>
                                            - Для Long (покупка): Если цена растет, Трейлинг-стоп «подтягивается» вверх на
                                            заданном расстоянии (например, 1% от текущей цены). Если цена падает, стоп не двигается вниз.<br/>
                                            - Для Short (продажа): Если цена падает, Трейлинг-стоп «сползает» вниз за ней. <br/>
                                            Это условие, при котором «стоп» начинает двигаться. Суть: Пока цена не прошла,
                                            например, +1.5% от входа, стоп стоит мертво (защищает от убытка). Как только порог
                                            пройден — включается механизм подтягивания.
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>Трейлинг Тейк-Профит (Trailing Take Profit)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Более продвинутая штука.
                                            Суть: Когда цена доходит до твоего Тейк-Профита, сделка не закрывается сразу.
                                            Вместо этого включается трейлинг. Если цена пойдет еще выше — ты заработаешь больше.
                                            Если упадет чуть ниже Тейка — тогда закроется.<br/>
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>Уровни коррекции (Fibonacci Retracement)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Используются, чтобы понять, как глубоко откатится цена против текущего тренда, прежде чем продолжить движение.<br/>
                                            Как строить:<br/>
                                                - При восходящем тренде: тянем сетку от минимума (Swing Low) к максимуму (Swing High).<br/>
                                                - При нисходящем тренде: от максимума к минимуму.<br/>
                                            Ключевые уровни:<br/>
                                                - 0.382 (38%) — неглубокая коррекция (сильный тренд).<br/>
                                                - 0.5 (50%) — психологический уровень (не число Фибоначчи, но важен).<br/>
                                                - 0.618 (62%) — «Золотое сечение», зона самого вероятного разворота.<br/>
                                            Логика: Трейдеры ищут точку входа в покупку/продажу именно на этих уровнях, ожидая отскока. Коррекция: отвечает на вопрос «Где мне войти в сделку?»
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>Расширения Фибоначчи (Fibonacci Extension)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Используются, чтобы определить цели (Take Profit) — куда цена может дойти после завершения коррекции.<br/>
                                            Как строить: Обычно требуется три точки (начало импульса, конец импульса, конец коррекции).<br/>
                                            Ключевые уровни:<br/>
                                                - 1.618 — основная цель. <br/>
                                                - 2.618 — цель при очень сильном импульсе. <br/>
                                                - 4.236 — экстремальное движение. <br/>
                                            Логика: Позволяет спрогнозировать, насколько цена «выстрелит» выше предыдущего максимума. Расширение: отвечает на вопрос «Где мне закрыть сделку с прибылью?»
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>Уровень поддержки (Support) — «Пол»</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Это уровень, ниже которого цене трудно опуститься.<br/>
                                            Логика: Когда цена падает к этому уровню, покупатели считают её дешевой и начинают активно покупать.<br/>
                                            На графике: Проводится по двум и более минимумам (Low) на одной линии.<br/>
                                            Действие: Трейдеры ищут здесь точку для покупки (BUY).
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>Уровень сопротивления (Resistance) — «Потолок»</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Это уровень, выше которого цене трудно подняться.<br/>
                                            Логика: Когда цена растет к этому уровню, продавцы считают её дорогой и начинают фиксировать прибыль или открывать шорты.<br/>
                                            На графике: Проводится по двум и более максимумам (High) на одной линии.<br/>
                                            Действие: Трейдеры ищут здесь точку для продажи (SELL).
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>Зеркальный уровень (Ротация)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Один из самых сильных сигналов. Если цена пробивает сопротивление, оно часто становится поддержкой при возврате (тесте) сверху. И наоборот.
                                        </div>

                                        <div style={{ marginBottom: '10px', fontSize: '20px' }}><b style={{ color: '#03aac7' }}>Топ-5 самых надежных сигналов</b></div>

                                        <div style={{ marginBottom: '10px' }}><b>1. Дивергенция (Расхождение)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Это когда график цены и индикатор (RSI, MACD) показывают разные направления.<br/>
                                            Медвежья: Цена ставит новый максимум, а индикатор — нет. Это сигнал о слабости покупателей.<br/>
                                            Бычья: Цена ставит новый минимум, а индикатор — нет. Пора покупать.<br/>
                                            ⚓️ Сила: Считается одним из самых точных опережающих сигналов.
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>2. Тест «Зеркального уровня»</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Когда сильный уровень сопротивления пробивается и цена возвращается к нему сверху, чтобы подтвердить его как поддержку.<br/>
                                            Логика: Рынок «согласился» с новой ценой.<br/>
                                            Сила: Вероятность отскока от зеркального уровня гораздо выше, чем от обычного.
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>3. Паттерны Price Action на крупных таймфреймах</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Свечные модели на дневных (D1) или 4-часовых (H4) графиках:<br/>
                                            Пин-бар (Pin Bar): Длинная тень в сторону уровня («ложный пробой»).<br/>
                                            Поглощение (Engulfing): Когда одна свеча полностью перекрывает предыдущую.<br/>
                                            Сила: Чем выше таймфрейм, тем сложнее манипулировать ценой крупным игрокам.
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>4. Пробой накопления (Consolidation Breakout)</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Когда цена долгое время зажата в узком боковике, а затем резко выходит из него с повышенным объемом.<br/>
                                            Логика: В боковике копится энергия (позиции). Выход из него — это начало мощного импульса.<br/>
                                        </div>

                                        <div style={{ marginBottom: '10px' }}><b>5. Сочетание Фибоначчи и Уровня POC</b></div>
                                        <div style={{ marginBottom: '20px', marginLeft: '20px' }}>
                                            Если уровень коррекции 0.618 совпадает с горизонтальным уровнем объема (POC) или сильной поддержкой.<br/>
                                            Логика: «Смарт-мани» видят эти уровни и ставят там свои ордера.
                                        </div>

                                    </div>
                                </div>
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
                    // Список для выпадающего меню
                    symbols={symbolsFromDB}
                    // Текущие данные
                    selectedCoin={selectedCoin}
                    // Функция для смены (та же, что и в боковой таблице)
                    onSymbolChange={(ticker) => handlePair(ticker)}
                    type={orderType}
                    // Цены (будут обновляться на лету)
                    allPrices={prices}
                    onSuccess={() => {
                        fetchActiveOrders();   // Функция, которая делает GET запрос к API ордеров
                        setOrderOpen(false);   // Закрываем модалку после успеха
                    }}
                />
            )}

        </div>
    );
};

export default Trading;