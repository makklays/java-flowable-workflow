import { createChart, LineSeries, CandlestickSeries, createSeriesMarkers } from 'lightweight-charts';
import React, { useState, useLayoutEffect, useEffect, useRef, useMemo } from 'react';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faSync, faPlay, faFlask } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

const Backtest = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const chartApiRef = useRef(null);
    const seriesRef = useRef(null);
    const maSeriesRef = useRef(null);
    const socketRef = useRef(null);

    const tradeLinesRef = useRef([]); // Массив для хранения серий линий сделок

    const [selectedSymbolId, setSelectedSymbolId] = useState(42); // ID из вашей базы
    const [backtestDates, setBacktestDates] = useState({
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 дней назад
        end: new Date().toISOString().split('T')[0]
    });
    const [isBacktesting, setIsBacktesting] = useState(false);

    const [symbols, setSymbols] = useState([]); // Для хранения списка из БД
    const [loadingSymbols, setLoadingSymbols] = useState(true);
    const [formData, setFormData] = useState({ symbol: '' });
    const [errors, setErrors] = useState({});

    const { t, i18n } = useTranslation();

    const [pair, setPair] = useState('solusdt');
    const [timeframe, setTimeframe] = useState('1m');

    const priceLinesRef = useRef([]);

    const [tradesList, setTradesList] = useState([]);
    const [totalAmount, setTotalAmount] = useState("0.00");

    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await fetch('http://localhost:8082/api/v1/symbols');
                const data = await response.json();
                setSymbols(data);
            } catch (error) {
                console.error("Ошибка загрузки символов:", error);
            } finally {
                setLoadingSymbols(false);
            }
        };
        fetchSymbols();
    }, []);

    // Формируем опции для Select
    const options = useMemo(() => {
        return symbols.map(sym => ({
            value: sym.id,
            label: `${sym.symbol} (${sym.marketType})`,
            symbolName: sym.symbol,
            original: sym
        }));
    }, [symbols]);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            minHeight: '38px',
            borderColor: state.isFocused ? '#86b7fe' : '#dee2e6',
            boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none',
            // ВЫНЕСИТЕ ЭТИ КЛЮЧИ СЮДА:
            menu: (provided) => ({
                ...provided,
                zIndex: 9999
            }),
            menuPortal: (base) => ({
                ...base,
                zIndex: 9999
            }),
            container: (provided) => ({
                ...provided,
                zIndex: 1000 // Контейнер тоже должен быть выше
            })
        }),
    };

    function handlePair(newPair) {
        console.log(newPair);
        setPair(newPair); // Это спровоцирует перезапуск useEffect выше
    }

    const handleReturnToLive = () => {
        setIsBacktesting(false); // Это спровоцирует useLayoutEffect включить сокет
    };

    function handleTimeframe(timeframe) {
        console.log(timeframe);
        setTimeframe(timeframe);
    }

    const runBacktest = async () => {
        // Проверяем, что API графика доступно
        if (!chartApiRef.current || !seriesRef.current) {
            console.error("График еще не инициализирован");
            return;
        }
        setIsBacktesting(true);

        // Очистка старых штрихованных линий
        if (tradeLinesRef.current.length > 0) {
            tradeLinesRef.current.forEach(s => {
                try {
                    chartApiRef.current.removeSeries(s);
                } catch (e) {
                    console.warn("Ошибка при удалении серии:", e);
                }
            });
            tradeLinesRef.current = [];
        }

        try {
            // 1. Очистка старых линий
            priceLinesRef.current.forEach(line => seriesRef.current.removePriceLine(line));
            priceLinesRef.current = [];

            // 2. Очистка старых линий сделок через API реф
            tradeLinesRef.current.forEach(s => chartApiRef.current.removeSeries(s));
            tradeLinesRef.current = [];

            const params = new URLSearchParams({
                symbolId: selectedSymbolId,
                timeframe: timeframe,
                start: new Date(backtestDates.start).getTime(),
                end: new Date(backtestDates.end).getTime()
            });

            const response = await fetch(`http://localhost:8082/api/v1/backtest/run?${params}`);
            if (!response.ok) throw new Error("Ошибка сервера");
            const data = await response.json();

            if (!data.candles || data.candles.length === 0) {
                alert("Нет данных за выбранный период");
                return;
            }

            // 1. Проверяем наличие массива сделок (trades) из бэкенда
            if (data.trades && data.trades.length > 0) {
                const formattedTrades = data.trades.map((trade, index) => {
                    // Извлекаем данные из TradeDto, который прислал Java
                    const entryPrice = parseFloat(trade.entryPrice);
                    const exitPrice = parseFloat(trade.exitPrice);
                    const profit = parseFloat(trade.profit);
                    const profitPercent = parseFloat(trade.profitPercent);

                    return {
                        id: index + 1,
                        // Превращаем метки времени в читаемую дату
                        entryTime: new Date(trade.entryTime).toLocaleString(),
                        exitTime: trade.exitTime ? new Date(trade.exitTime).toLocaleString() : 'Open',
                        entryPrice: entryPrice.toFixed(2),
                        exitPrice: exitPrice ? exitPrice.toFixed(2) : '—',
                        type: trade.type,
                        profit: profit.toFixed(2),
                        profit_percent: profitPercent.toFixed(2),
                        type: trade.type // BUY / SELL
                    };
                });
                setTradesList(formattedTrades);

                // 2. Считаем общую прибыль (Total Profit) одной операцией
                const totalProfit = data.trades.reduce((sum, trade) => {
                    return sum + (parseFloat(trade.profit) || 0);
                }, 0);
                // 3. Обновляем состояние один раз
                setTotalAmount(totalProfit.toFixed(2));

            } else {
                setTradesList([]); // Очищаем список, если сделок нет
                setTotalAmount("0.00"); // Обнуляем итоговую сумму
            }

            // 2. Маппинг и СТРОГАЯ СОРТИРОВКА (решает ошибку Assertion failed)
            const formattedCandles = data.candles
                .map(c => ({
                    time: c.openTime / 1000,
                    open: parseFloat(c.open),
                    high: parseFloat(c.high),
                    low: parseFloat(c.low),
                    close: parseFloat(c.close)
                }))
                .sort((a, b) => a.time - b.time); // Сортируем от старых к новым

            // 3. Удаление дубликатов (защита от ошибок БД)
            /*const uniqueCandles = formattedCandles.filter((item, index, self) =>
                index === 0 || item.time !== self[index - 1].time
            );*/

            console.log(`Отрисовка бэктеста: ${formattedCandles.length} свечей.`);
            seriesRef.current.setData(formattedCandles);

            // 4. Маркеры (сигналы Buy/Sell) и штрихованные линии
            if (data.signals && data.signals.length > 0) {
                // СТРОГАЯ СОРТИРОВКА: от старых к новым
                const sortedSignals = [...data.signals].sort((a, b) => a.time - b.time);

                // Теперь используем sortedSignals вместо data.signals
                for (let i = 0; i < sortedSignals.length; i += 2) {
                    const entry = sortedSignals[i];
                    const exit = sortedSignals[i + 1];

                    if (entry && exit) {
                        const singleTradeLine = chartApiRef.current.addSeries(LineSeries, {
                            color: entry.type === 'BUY' ? '#26a69a' : '#ef5350', // Цвет по типу входа
                            lineWidth: 1,
                            lineStyle: 2,
                            priceLineVisible: false,
                            lastValueVisible: false,
                        });
                        tradeLinesRef.current.push(singleTradeLine);

                        singleTradeLine.setData([
                            { time: entry.time / 1000, value: parseFloat(entry.price) },
                            { time: exit.time / 1000, value: parseFloat(exit.price) }
                        ]);
                    }
                }

                // Маркеры тоже делаем на основе отсортированных данных
                const markers = sortedSignals.map(s => ({
                    time: s.time / 1000,
                    position: s.type === 'BUY' ? 'belowBar' : 'aboveBar',
                    color: s.type === 'BUY' ? '#26a69a' : '#ef5350',
                    shape: s.type === 'BUY' ? 'arrowUp' : 'arrowDown',
                    text: s.type + ' @ ' + s.price
                }));

                createSeriesMarkers(seriesRef.current, markers);
            }

            // 5. Линии поддержки/сопротивления
            if (data.levels) {
                data.levels.forEach(level => {
                    const line = seriesRef.current.createPriceLine({
                        price: level.price,
                        color: level.type === 'SUPPORT' ? '#26a69a' : '#ef5350',
                        lineWidth: 2,
                        lineStyle: 2,
                        axisLabelVisible: true,
                        title: level.type === 'SUPPORT' ? 'SUP' : 'RES',
                    });
                    priceLinesRef.current.push(line);
                });
            }
        } catch (err) {
            console.error("Backtest error:", err);
            alert("Критическая ошибка: " + err.message);
        }
    };

    useLayoutEffect(() => {
        let isMounted = true; // Флаг для отслеживания монтирования компонента
        if (!chartContainerRef.current) return;

        // 1. Объявляем функцию Resize СРАЗУ (чтобы она была доступна везде ниже)
        const handleResize = () => {
            if (isMounted && chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };
        window.addEventListener('resize', handleResize);

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
        chartApiRef.current = chart; // Сохраняем в API реф

        // Линия MA
        const maSeries = chart.addSeries(LineSeries, {
            color: '#2962FF',
            lineWidth: 2,
            priceLineVisible: false,
        });
        maSeriesRef.current = maSeries;

        // Свечи
        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
        });
        seriesRef.current = candleSeries;

        if (!isBacktesting) {

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

        } else {
            // ГРАФИК ГОТОВ. ТЕПЕРЬ МОЖНО РИСОВАТЬ БЭКТЕСТ
            console.log("Режим бэктеста: Запуск загрузки данных...");
            runBacktest();
        }

        // ВАЖНО: В cleanup сначала удаляем слушатель, а потом графики
        // 2. ИДЕАЛЬНЫЙ CLEANUP
        return () => {
            isMounted = false;
            window.removeEventListener('resize', handleResize); // Теперь handleResize точно определена!

            if (socketRef.current) {
                socketRef.current.onmessage = null;
                socketRef.current.close();
                socketRef.current = null;
            }
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [pair, timeframe, isBacktesting]);

    return (
        <div>
            <div className="row">
                <div className="col-md-6" style={{ marginBottom: '10px' }} >
                    <h1><FontAwesomeIcon icon={faFlask} className="me-2" /> {t('backtest')}</h1>
                    <p style={{ color: '#6c757d' }} >Бектестер для проверки торговых алгоритмов и индикаторов на глубокой истории рынка</p>
                </div>
            </div>

            <div className="card p-3 mb-3 shadow-sm">
                <div className="row align-items-end">

                    {/* Символ */}
                    <div className="col-md-2">
                        <label className="small text-muted form-label required">Символ</label>
                        <div className="input-group">
                            <span className="small text-muted input-group-text">
                                <FontAwesomeIcon icon={faCoins} />
                            </span>
                            <Select className={`form-control p-0 border-0`}
                                options={options}
                                isLoading={loadingSymbols}
                                placeholder="Поиск символа..."
                                isSearchable={true} // Включает поиск по части слова
                                value={options.find(opt => opt.value === formData.symbol) || null}
                                onChange={(selectedOption) => {
                                    const val = selectedOption ? selectedOption.value : '';
                                    setFormData({...formData, symbol: val});
                                    setSelectedSymbolId(val); // Обновляем ID для бэктеста
                                    setPair(selectedOption ? selectedOption.symbolName.toLowerCase() : ''); // Обновляем тикер
                                    if (val) setErrors(prev => ({...prev, symbol: null}));
                                }}
                                menuPortalTarget={document.body}
                                styles={customStyles}
                                noOptionsMessage={() => "Ничего не найдено"}
                            />
                        </div>
                        {errors.symbol && <div className="text-danger small mt-1">{errors.symbol}</div>}
                    </div>

                    <div className="col-md-2">
                        <label className="small text-muted form-label required">Дата начала</label>
                        <input type="date" className="form-control" value={backtestDates.start}
                            onChange={e => setBacktestDates({...backtestDates, start: e.target.value})} />
                    </div>
                    <div className="col-md-2">
                        <label className="small text-muted form-label required">Дата конца</label>
                        <input type="date" className="form-control" value={backtestDates.end}
                            onChange={e => setBacktestDates({...backtestDates, end: e.target.value})} />
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success w-100" onClick={() => setIsBacktesting(true)} disabled={isBacktesting}>
                            {isBacktesting ? 'Анализ...' : 'Запустить тест'}
                        </button>
                    </div>

                    {/* Новая кнопка для возврата к реальным данным */}
                    <div className="col-md-2">
                        <button
                            className="btn btn-outline-primary w-100"
                            onClick={() => setIsBacktesting(false)}
                            disabled={!isBacktesting}
                        >
                            Вернуться в Live
                        </button>
                    </div>
                </div>
            </div>

            {/*
            <div style={{ marginBottom: '20px' }} >
                <button onClick={() => handlePair('solusdt')} >SOL USDT</button>
                <button onClick={() => handlePair('btcusdt')} >BTC USDT</button>
                <button onClick={() => handlePair('ethusdt')} >ETH USDT</button>
                <button onClick={() => handlePair('xrpusdt')} >XRP USDT</button>
            </div>
            <div style={{ marginBottom: '20px' }} >
                <button onClick={() => handleTimeframe('1m')} >M1</button>
                <button onClick={() => handleTimeframe('15m')}>M15</button>
                <button onClick={() => handleTimeframe('1h')} >H1</button>
                <button onClick={() => handleTimeframe('4h')} >H4</button>
                <button onClick={() => handleTimeframe('1d')} >D1</button>
                <button onClick={() => handleTimeframe('1w')} >W1</button>
            </div>
            */}

            <div className="row mt-4 mb-8">
                <div className="col-md-6">
                    <h1 className="mb-0" style={{ color: '#03aac7' }} >
                        {pair.toUpperCase()} / {timeframe}

                        {/* Индикатор режима */}
                        {isBacktesting && <span className="badge bg-warning text-dark ms-2">BACKTEST</span>}
                    </h1>
                    <p>{isBacktesting ? 'История из БД' : 'Binance Live'}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
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
                <div className="col-md-4">
                    <h3>
                        Итого: {' '}
                        <span className={parseFloat(totalAmount) >= 0 ? 'text-success' : 'text-danger'}>
                            {totalAmount} $
                        </span>
                    </h3>
                </div>
            </div>

            <div className="row mt-4 mb-4">
                <div className="col-md-6">
                    <h3>
                        Итого: {' '}
                        <span className={parseFloat(totalAmount) >= 0 ? 'text-success' : 'text-danger'}>
                            {totalAmount} $
                        </span>
                    </h3>
                </div>
            </div>

            <div className="mt-4 card">
                <div className="card-header">Результаты сделок</div>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >#</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >Вход</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >Выход</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >Тип</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >Цена входа</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >Цена выхода</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >Профит</th>
                                <th style={{textAlign: 'center', verticalAlign: 'middle'}} >Профит (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tradesList.map((trade) => (
                                <tr key={trade.id}>
                                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >{trade.id}</td>
                                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >{trade.entryTime}</td>
                                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >{trade.exitTime}</td>
                                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >{trade.type}</td>
                                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >{trade.entryPrice}</td>
                                    <td style={{textAlign: 'center', verticalAlign: 'middle'}} >{trade.exitPrice}</td>
                                    <td className={trade.profit >= 0 ? 'text-success' : 'text-danger'} style={{textAlign: 'center', verticalAlign: 'middle'}} >
                                        {trade.profit}
                                    </td>
                                    <td className={trade.profit_percent >= 0 ? 'text-success' : 'text-danger'} style={{textAlign: 'center', verticalAlign: 'middle'}} >
                                        {trade.profit_percent}%
                                    </td>
                                </tr>
                            ))}
                            {tradesList.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center text-muted">Сделок не найдено</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Backtest;