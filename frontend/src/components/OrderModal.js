import React, { useState } from 'react';

// Добавь все эти переменные в фигурные скобки здесь:
const OrderModal = ({ isOpen, onClose, symbols, selectedCoin, onSymbolChange, type, allPrices }) => {

    // form validation
    const [formData, setFormData] = useState({
        volume: 1.00,
        stopLoss: 0.00,
        takeProfit: 0.00,
        comment: "",
        orderType: "MARKET"
    });

    if (!isOpen) return null;

    // Достаем актуальную цену для ВЫБРАННОГО в данный момент тикера
    const currentPrice = allPrices[selectedCoin.ticker] || '0.00';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlaceOrder = async (side) => {
        const orderData = {
            userId: 1,
            exchangeId: 1,
            exchange: "Binance",
            symbolId: selectedCoin.id,
            symbol: selectedCoin.ticker,
            side: side,
            quantity: parseFloat(formData.volume),
            openPrice: currentPrice,
            leverage: 1,
            stopLoss: parseFloat(formData.stopLoss) || null,
            takeProfit: parseFloat(formData.takeProfit) || null,
            comment: formData.comment,
            type: formData.orderType
        };

        try {
            console.log("Отправка ордера:", orderData);
            const response = await fetch('http://localhost:8082/api/v1/trades/open', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Сделка открыта:", result);
                onClose(); // Закрываем модалку при успехе
            } else {
                console.error("Ошибка при открытии сделки:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
        }
    };

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
            <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content shadow-lg" >

                        {/* Шапка с ID символа для отладки */}
                        <div className="modal-header py-2" style={{ backgroundColor: '#444', color: '#fff' }}>
                            <h6 className="modal-title m-0">Ордер #{selectedCoin.id} — {selectedCoin.ticker}</h6>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        <div className="modal-body p-4" >
                            <div className="row g-3">
                                {/* ВЫПАДАЮЩИЙ СПИСОК СИМВОЛОВ */}
                                <div className="col-4 text-end pt-1"><small>Символ:</small></div>
                                <div className="col-8">
                                    <select
                                        className="form-select form-select-sm"
                                        value={selectedCoin.ticker}
                                        onChange={(e) => onSymbolChange(e.target.value)}
                                    >
                                        {symbols.map(s => ( // Ошибка Line 29 исчезнет
                                           <option key={s.id} value={s.ticker}>{s.ticker}  — {s.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Тип ордера */}
                                <div className="col-4 text-end pt-1"><small>Тип:</small></div>
                                <div className="col-8">
                                    {/* Тип ордера */}
                                    <select
                                        name="orderType"
                                        value={formData.orderType}
                                        onChange={handleChange}
                                        className="form-select form-select-sm"
                                    >
                                        <option value="MARKET">Исполнение по рынку</option>
                                        <option value="LIMIT">Лимитный ордер</option>
                                    </select>
                                </div>

                                <hr className="my-2" />

                                {/* Объем */}
                                <div className="col-4 text-end pt-1"><small>Объем:</small></div>
                                <div className="col-8 d-flex align-items-center gap-2">
                                    <input
                                        type="number"
                                        name="volume"
                                        value={formData.volume}
                                        onChange={handleChange}
                                        className="form-control form-control-sm w-50"
                                        step="0.01"
                                    />
                                    <small className="text-muted">лот {selectedCoin.ticker}</small>
                                </div>

                                {/* Stop Loss и Take Profit */}
                                <div className="col-4 text-end pt-2"><small>Stop Loss:</small></div>
                                <div className="col-8 text-end pt-1">
                                    <div className="row">
                                        <div className="col-4 align-items-center">
                                            <input
                                                type="number"
                                                name="stopLoss"
                                                value={formData.stopLoss}
                                                onChange={handleChange}
                                                className="form-control form-control-sm"
                                            />
                                        </div>

                                        <div className="col-4 text-end pt-1"><small>Take Profit:</small></div>
                                        <div className="col-4 align-items-center">
                                            <input
                                                type="number"
                                                name="takeProfit"
                                                value={formData.takeProfit}
                                                onChange={handleChange}
                                                className="form-control form-control-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Комментарий */}
                                <div className="col-4 text-end pt-2"><small>Комментарий:</small></div>
                                <div className="col-8 text-end pt-1">
                                    <input
                                        type="text"
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        className="form-control form-control-sm"
                                    />
                                </div>

                                {/* ЦЕНЫ ИЗ PROPS */}
                                <div className="col-12 text-center my-4">
                                    <h2 className="fw-light">
                                        <span className="text-danger">{currentPrice}</span>
                                        <span className="mx-2">/</span>
                                        <span className="text-primary">{currentPrice}</span>
                                    </h2>
                                    <small className="text-muted text-uppercase">Текущая котировка (ID: {selectedCoin.id})</small>
                                </div>

                                {/* Кнопки */}
                                <div className="col-6">
                                    <button className="btn btn-danger w-100" onClick={() => handlePlaceOrder('SELL')}>
                                        Sell by Market
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-primary w-100" onClick={() => handlePlaceOrder('BUY')}>
                                        Buy by Market
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderModal;

