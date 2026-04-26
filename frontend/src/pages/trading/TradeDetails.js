import { useParams, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import tradesService from '../../services/tradesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChartLine, faCoins, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
// Переводы текстов
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

// Короткая запись компонента - стрелочная функция
const TradeDetails = () => {
    const { id } = useParams();
    const [trade, setTrade] = useState(null);
    const [tradeId, setTradeId] = useState(id);

    const { t } = useTranslation(); // 2. Инициализируем t
    const navigate = useNavigate();

    const location = useLocation();
    // Создаем объект для работы с параметрами
    const queryParams = new URLSearchParams(location.search);
    // Получаем конкретное значение по ключу 'tab'
    const currentTab = queryParams.get('tab');

    console.log(currentTab);

    useEffect(() => {
        const fetchTrade = async () => {
            try {
                console.log("Запрос по ID:", id);
                const response = await tradesService.getTradeById(id);
                // Проверка: Axios возвращает данные в поле .data
                console.log("Данные от сервера:", response.data);

                if (response.data) {
                    setTrade(response.data);
                    console.log("Полученные данные сделки:", response.data);
                } else {
                    console.log("Нет полученных данных сделки");
                }
            } catch (error) {
                console.error("Ошибка загрузки сделки:", error);
                // Если ошибка, можно поставить "заглушку", чтобы Loading исчез
                setTrade({ error: true });
            }
        };
        fetchTrade();
    }, [id]);

    if (!trade) return <div>Loading...</div>;

    const formatTimestamp = (ts) => {
        if (!ts || ts === 0) return "—"; // Если 0, показываем прочерк
        const date = new Date(ts);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '');
    };

    const formatMyDate = (str) => {
        if (!str) return "-";
        const d = new Date(str);
        // Проверка на валидность даты
        if (isNaN(d.getTime())) return str;

        return d.toLocaleDateString('ru-RU') + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const side = (trade.side || trade.type || 'BUY').toUpperCase();
    const openPrice = parseFloat(trade.openPrice || trade.entryPrice || 0);
    const closePrice = parseFloat(trade.closePrice || trade.exitPrice || 0);
    const profit = parseFloat(trade.profitLoss || trade.profit || 0);

    // Берем процент из бэкенда (если есть) или считаем сами
    let pnlPercent = trade.profitPercent ? parseFloat(trade.profitPercent) : 0;
    if (!trade.profitPercent && openPrice > 0 && closePrice > 0) {
        pnlPercent = side === 'BUY'
            ? ((closePrice - openPrice) / openPrice) * 100
            : ((openPrice - closePrice) / openPrice) * 100;
    }

    return (
        <div >
            {/* Заголовок */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <h1 className="h3">
                        <FontAwesomeIcon icon={faChartLine} className="me-2" /> {t('trade_details')} #{tradeId}
                    </h1>
                    <p className="text-muted">Детальный анализ на основе торговых показателей и метрик эффективности <strong>{trade.symbol}</strong></p>
                </div>
                <div className="col-md-6 text-end">
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/trading?tab='+currentTab) }>
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {t('back')}
                    </button>
                </div>
            </div>

            <div className="row">
                {/* Основная информация о сделке */}
                <div className="col-md-6">
                    <div style={{ marginBottom: '10px' }} ><b>Основные параметры</b></div>

                    <div className="table-responsive">
                        <table className="table table-hover table-border mb-0" style={{ border: '1px solid #e7e7e7' }} >
                            <tbody>
                                <tr>
                                    <th className="bg-light w-25 ps-4">ID</th>
                                    <td className="ps-4 ">{trade.id ? trade.id : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Символ</th>
                                    <td className="ps-4 fw-bold">{trade.symbol ? trade.symbol : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Направление</th>
                                    <td className="ps-4 fw-bold">
                                        <span className={`badge ${trade.side.toUpperCase() === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                                            {trade.side.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Объем (Qty)</th>
                                    <td className="ps-4 fw-bold">{trade.quantity ? trade.quantity : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Цена входа</th>
                                    <td className="ps-4 text-primary">{trade.openPrice ? trade.openPrice : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Стоп Лосс</th>
                                    <td className="ps-4 ">{trade.stopLoss ? trade.stopLoss : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Тейк Профит</th>
                                    <td className="ps-4 ">{trade.takeProfit ? trade.takeProfit : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Цена выхода</th>
                                    <td className="ps-4">{closePrice > 0 ? closePrice.toFixed(2) : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Результат (USDT)</th>
                                    <td className={`ps-4 fw-bold ${profit >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {profit.toFixed(2)} USDT
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Изменение (%)</th>
                                    <td className={`ps-4 fw-bold ${pnlPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {pnlPercent >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                                    </td>
                                </tr>

                                <tr>
                                    <th className="bg-light w-25 ps-4">Время сделки</th>
                                    <td className="ps-4 text-muted">{formatTimestamp(trade.openedAt)} - {formatTimestamp(trade.closedAt)}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Плечо</th>
                                    <td className="ps-4 ">{trade.leverage ? trade.leverage : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Комиссия за вход / выход</th>
                                    <td className="ps-4 ">{trade.feeEntry} / {trade.feeExit}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Статус</th>
                                    <td className="ps-4">
                                        <span className={`badge ${trade.status === 'OPEN' ? 'bg-primary' : 'bg-secondary'}`}>
                                            {trade.status ? trade.status : '—'}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Профит / Убыток</th>
                                    <td className={`ps-4 fw-bold ${trade.profitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {trade.profitLoss || '0.00'}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Блок аналитики и экстремумов */}
                <div className="col-md-6">
                    <div style={{ marginBottom: '10px', color: '#03aac7' }} ><b>Аналитика эффективности</b></div>

                    <div className="table-responsive">
                        <table className="table table-hover table-border mb-0" style={{ border: '1px solid #e7e7e7' }} >
                            <tbody>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Max Drawdown</th>
                                    <td className="ps-4 text-danger fw-bold">{trade.maxDrawdown}%</td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Max Favorable (MFE)</th>
                                    <td className="ps-4 text-success">{trade.mfe || '0.00'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Max Adverse (MAE)</th>
                                    <td className="ps-4 text-danger">{trade.mae || '0.00'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Efficiency Ratio</th>
                                    <td className="ps-4">
                                        <div className="progress" style={{ height: '10px' }}>
                                            <div className="progress-bar bg-info" style={{ width: `${(trade.efficiencyRatio || 0) * 100}%` }}></div>
                                        </div>
                                        <small>{trade.efficiencyRatio || '0'}</small>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-light w-25 ps-4">Направление</th>
                                    <td className="ps-4 fw-bold">
                                        <span className={`badge ${trade.side.toUpperCase() === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                                            {trade.side.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Цена входа</th>
                                    <td className="ps-4 text-primary">{trade.openPrice ? trade.openPrice : '—'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Пик цены (High)</th>
                                    <td className="ps-4 text-success">
                                        {trade.side.toUpperCase() === 'BUY' ? (
                                            <>
                                                {trade.highPriceReached || '—'} | разница: {trade.highPriceReached ? (trade.highPriceReached - trade.openPrice).toFixed(4) : '0.00'}
                                            </>
                                        ) : (
                                            <>
                                                {trade.highPriceReached || '—'} | разница: {trade.highPriceReached ? (trade.openPrice - trade.highPriceReached).toFixed(4) : '0.00'}
                                            </>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="bg-light ps-4">Дно цены (Low)</th>
                                    <td className="ps-4 text-danger">
                                        {trade.side.toUpperCase() === 'BUY' ? (
                                            <>
                                                {trade.lowPriceReached || '—'} | разница: {trade.lowPriceReached ? (trade.openPrice - trade.lowPriceReached).toFixed(4) : '0.00'}
                                            </>
                                        ) : (
                                            <>
                                                {trade.lowPriceReached || '—'} | разница: {trade.lowPriceReached ? (trade.lowPriceReached - trade.openPrice).toFixed(4) : '0.00'}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Кнопки действий */}
            <div className="row mt-3">
                <div className="col-12">
                    <button className="btn btn-primary me-2" onClick={() => navigate(`/candles?search=${trade.symbol}`)}>
                        <FontAwesomeIcon icon={faChartLine} className="me-2" /> {t('view_candles')}
                    </button>
                    <button className="btn btn-outline-dark" onClick={() => navigate('/trading?tab='+currentTab)}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradeDetails;

