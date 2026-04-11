import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import symbolService from '../../services/symbolService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faPenToSquare, faTrashCan, faDownload, faChartLine, faPlus, faCoins, faClock, faTimes, faSortUp, faArrowLeft, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { user, useApp } from '../../context/AppContext';

// Короткая запись компонента - стрелочная функция
const SymbolView = () => {
    const { id } = useParams();
    const [symbol, setSymbol] = useState(null);

    const { t, i18n } = useTranslation(); // 2. Инициализируем t
    const navigate = useNavigate();
    const { user } = useApp();

    useEffect(() => {
        const fetchSymbol = async () => {
            try {
                const response = await symbolService.getSymbolById(id);
                setSymbol(response.data);
            } catch (error) {
                console.error("Ошибка загрузки символа:", error);
            }
        };

        fetchSymbol();

    }, [id]);

    if (!symbol) return <div>Loading...</div>;

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
                    <h1><FontAwesomeIcon icon={faCoins} className="me-2" /> {t('view_symbol')}</h1>
                    <p>Детали символа {symbol.symbol}</p>
                </div>
                <div className="col-md-6" style={{ textAlign: 'right' }}>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate('/symbols')}>
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
                                <td className="ps-4">{symbol.id}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Символ</th>
                                <td className="ps-4 fw-bold text-dark">{symbol.symbol}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Символ биржы</th>
                                <td className="ps-4 text-muted">
                                    {symbol.originalSymbol || '-'}
                                </td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Базовая валюта</th>
                                <td className="ps-4 text-dark">{symbol.baseAsset}</td>
                            </tr>
                            <tr>
                                <th className="bg-light w-25 ps-4">Котируемая валюта</th>
                                <td className="ps-4 text-dark">{symbol.quoteAsset}</td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Тип биржи</th>
                                <td className="ps-4 text-dark">{symbol.marketType}</td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Исторические данные</th>
                                <td className="ps-4 text-dark">
                                    {(!symbol.historyStartTime && !symbol.historyEndTime)
                                        ? "—"
                                        : `${formatTimestamp(symbol.historyStartTime)} — ${formatTimestamp(symbol.historyEndTime)}`
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Создано</th>
                                <td className="ps-4">
                                    <span className="badge bg-info-subtle text-info border border-info-subtle">
                                        {formatMyDate(symbol.createdAt) || '-'}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th className="bg-light w-25 ps-4">Обновлено</th>
                                <td className="ps-4">
                                    <span className="badge bg-info-subtle text-info border border-info-subtle">
                                        {formatMyDate(symbol.updatedAt) || '-'}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row" style={{ marginTop: '20px' }}>
                <div className="col-md-8 col-lg-6">
                    <button className="btn btn-primary" onClick={() => navigate(`/candles?search=${symbol.symbol}&upload=true`)} style={{ marginRight: '10px' }}>
                        <FontAwesomeIcon icon={faDownload} className="me-2" /> {t('upload_candles')}
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate(`/candles?search=${symbol.symbol}`)} style={{ marginRight: '10px' }}>
                        <FontAwesomeIcon icon={faChartLine} className="me-2" /> {t('view_candles')}
                    </button>
                    <button className="btn btn-light text-secondary" onClick={() => navigate('/symbols')}>
                        <FontAwesomeIcon icon={faTimes} className="me-2" /> {t('close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SymbolView;

