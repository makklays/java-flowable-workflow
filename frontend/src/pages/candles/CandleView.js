import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import candleService from '../../services/candleService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faCoins, faArrowLeft, faTimes, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext'; // Убрали лишний импорт user

const CandleView = () => {
    const { id } = useParams();
    const [candle, setCandle] = useState(null);
    const [error, setError] = useState(false); // Состояние для ошибки

    const { t } = useTranslation(); // Оставили только t
    const navigate = useNavigate();
    const { user } = useApp();

    useEffect(() => {
        const fetchCandle = async () => {
            try {
                const response = await candleService.getCandleById(id);
                if (response.data) {
                    setCandle(response.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Ошибка загрузки свечи:", err);
                setError(true);
            }
        };
        fetchCandle();
    }, [id]);

    if (error) return <div className="alert alert-danger m-3">Свеча не найдена или произошла ошибка сервера.</div>;
    if (!candle) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

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

    return (
        <div>
            {/* Заголовок с кнопкой назад */}
            <div className="row">
                <div className="col-md-6">
                    <h1><FontAwesomeIcon icon={faCoins} className="me-2" /> {t('view_candle')}</h1>
                    <p>Детали символа {candle.symbolName}</p>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/candles')}>
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> {t('back_to_list')}
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 col-lg-6">
                    <table className="table table-hover mb-0">
                        <tbody>
                            <tr>
                                <th className="bg-light w-25 ps-4">ID</th>
                                <td className="ps-4">{candle.id}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Символ</th>
                                <td className="ps-4 text-dark">
                                    <Link
                                        to={`/symbols/${candle.symbolId}`}
                                        className="text-decoration-none fw-bold"
                                    >
                                        {candle.symbolName || '-'}
                                    </Link>
                                    <span className="ms-1 text-muted"> (ID: {candle.symbolId})</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Биржа</th>
                                <td className="ps-4 text-muted">
                                    <span className="badge bg-light text-dark border">
                                        {candle.exchangeId === 1 ? 'Binance' : `Exch: ${candle.exchangeId}`}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Таймфрейм</th>
                                <td className="ps-4 text-dark">{candle.timeframe}</td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Open</th>
                                <td className="ps-4 text-dark">{candle.open}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">High</th>
                                <td className="ps-4 text-dark">{candle.high}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Low</th>
                                <td className="ps-4 text-dark">{candle.low}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Close</th>
                                <td className="ps-4 text-dark">{candle.close}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Объём</th>
                                <td className="ps-4 text-dark">{candle.volume?.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Количество сделок</th>
                                <td className="ps-4 text-dark">{candle.tradesCount?.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Объем котируемого актива</th>
                                <td className="ps-4 text-dark">{candle.quoteAssetVolume?.toFixed(2)}</td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Время открытия</th>
                                <td className="ps-4 text-dark">{new Date(candle.openTime).toLocaleString()}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-8 col-lg-6">
                    <button className="btn btn-light text-secondary" onClick={() => navigate('/candles')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandleView;