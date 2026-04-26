import React, { useState, useEffect } from 'react';
import authHeader from '../services/authHeader';

// Добавь все эти переменные в фигурные скобки здесь:
const OrderModal = ({ mode, isOpen, orderId, onClose, symbols, selectedCoin, onSymbolChange, type, allPrices, onSuccess }) => {

    // form validation
    const [formData, setFormData] = useState({
        volume: 1.00,
        stopLoss: 0.00,
        takeProfit: 0.00,
        lotStopLoss: 0,
        lotTakeProfit: 0,
        comment: "",
        orderType: "MARKET"
    });

    const [sideModal, setSideModal] = useState(null);

    // Get Order from backend by orderId
    useEffect(() => {
        if (mode === "EDIT" && orderId && isOpen) {
            const fetchOrder = async () => {
                try {
                    const response = await fetch(`http://localhost:8082/api/v1/trades/${orderId}`, {
                        headers: { ...authHeader() }
                    });
                    if (response.ok) {
                        const order = await response.json();

                        // Обновляем символ в родителе, чтобы select выбрал его
                        if (order.symbol && onSymbolChange) {
                            onSymbolChange(order.symbol);
                        }

                        setFormData({
                            volume: order.quantity,
                            stopLoss: order.stopLoss || '',
                            takeProfit: order.takeProfit || '',
                            lotStopLoss: '', // Эти поля нужно рассчитывать отдельно, если нужно
                            lotTakeProfit: '',
                            comment: order.comment || '',
                            orderType: order.type || 'MARKET'
                        });

                        if (setSideModal) setSideModal(order.side);
                    } else {
                        console.error("Ошибка при загрузке сделки:", response.statusText);
                    }
                } catch (error) {
                    console.error("Ошибка сети:", error);
                }
            };
            fetchOrder();
        }
    }, [mode, orderId, isOpen]);

    // Достаем актуальную цену для ВЫБРАННОГО в данный момент тикера
    const currentPrice = allPrices[selectedCoin.ticker]?.close || '0.00';
    const priceBid = allPrices[selectedCoin.ticker]?.bid || '0.00';
    const priceAsk = allPrices[selectedCoin.ticker]?.ask || '0.00';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Send on backend - Edit Order
    const handleEditOrder = async (orderId) => {
        // Формируем параметры для URL: ?stopLoss=...&takeProfit=...
        const queryParams = new URLSearchParams({
            stopLoss: formData.stopLoss || 0,
            takeProfit: formData.takeProfit || 0
        }).toString();

        try {
            console.log("Отправка изменений ордера:", queryParams);
            const response = await fetch(`http://localhost:8082/api/v1/trades/${orderId}/edit?${queryParams}`, {
                method: 'POST',
                headers: { ...authHeader() }
            });

            if (response.ok) {
                const result = await response.json();

                if (onSuccess) onSuccess(); // Вызываем колбэк из родителя

                console.log("Сделка изменена:", result);
                onClose(); // Закрываем модалку при успехе
            } else {
                console.error("Ошибка при изменении сделки:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
        }
    };

    // Send on backend - Buy or Sell
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
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const result = await response.json();

                if (onSuccess) onSuccess(); // Вызываем колбэк из родителя

                console.log("Сделка открыта:", result);
                onClose(); // Закрываем модалку при успехе
            } else {
                console.error("Ошибка при открытии сделки:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
            <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content shadow-lg" >

                        {/* Шапка с ID символа для отладки */}
                        <div className="modal-header py-2" style={{ backgroundColor: '#444', color: '#fff' }}>
                            <h6 className="modal-title m-0">Сделка {orderId ? `#${orderId}` : ''} — {selectedCoin.ticker}</h6>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        <div className="modal-body p-4" >
                            <div className="row g-3">
                                {/* ВЫПАДАЮЩИЙ СПИСОК СИМВОЛОВ */}
                                <div className="col-4 text-end pt-1"><small>Символ:</small></div>
                                <div className="col-8">
                                    <select
                                        className="form-select form-select-sm"
                                        value={selectedCoin?.ticker || ""}
                                        onChange={(e) => onSymbolChange(e.target.value)}
                                        disabled={mode === "EDIT"}
                                    >
                                        {symbols.map(s => ( // Ошибка Line 29 исчезнет
                                           <option key={s.id} value={s.ticker}>{s.ticker}  — {s.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Тип ордера, Объем,  Stop Loss и Take Profit */}
                                {mode === "EDIT" ? (
                                    <>
                                        <div className="col-4 text-end pt-2"><small>Сторона:</small></div>
                                        <div className="col-8 pt-1">
                                            <div className="row">
                                                <div className="col-4 align-items-center">
                                                    <span className={`badge ${sideModal === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                                                        {sideModal}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

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

                                                <div className="col-4 text-end pt-1"><small>Пунктов:</small></div>
                                                <div className="col-4 align-items-center">
                                                    <input
                                                        type="number"
                                                        name="lotStopLoss"
                                                        value={formData.lotStopLoss}
                                                        onChange={handleChange}
                                                        className="form-control form-control-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-4 text-end pt-2"><small>Take Profit:</small></div>
                                        <div className="col-8 text-end pt-1">
                                            <div className="row">
                                                <div className="col-4 align-items-center">
                                                    <input
                                                        type="number"
                                                        name="takeProfit"
                                                        value={formData.takeProfit}
                                                        onChange={handleChange}
                                                        className="form-control form-control-sm"
                                                    />
                                                </div>

                                                <div className="col-4 text-end pt-1"><small>Пунктов:</small></div>
                                                <div className="col-4 align-items-center">
                                                    <input
                                                        type="number"
                                                        name="lotTakeProfit"
                                                        value={formData.lotTakeProfit}
                                                        onChange={handleChange}
                                                        className="form-control form-control-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}

                                {/* ЦЕНЫ ИЗ PROPS */}
                                <div className="col-12 text-center my-4">
                                    <h2 className="fw-light">
                                        <span className="text-danger">{priceBid}</span>
                                        <span className="mx-2">/</span>
                                        <span className="text-primary">{priceAsk}</span>
                                    </h2>
                                    <small className="text-muted text-uppercase">{selectedCoin.ticker}</small>
                                </div>

                                {mode === "EDIT" ? (
                                    <>
                                        <div className="col-12 text-center mt-0">
                                            <div style={{ fontSize: '12px', color: 'grey' }}>Задаваемый Stop Loss и Take Profit должны отличаться от рыночной цены как минимум на 50 пунктов</div>
                                            <div style={{ fontSize: '12px', color: 'grey' }}>Обработка Stop Loss выполняется на стороне Binance</div>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" onClick={() => handleEditOrder(orderId)} >
                                                Изменить #{orderId} {sideModal} {formData.volume} лот {selectedCoin.ticker} {formData.takeProfit ? `tp:${formData.takeProfit}` : ''} {formData.stopLoss ? `sl:${formData.stopLoss}` : ''}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-6 mt-0">
                                            <button className="btn btn-danger w-100" onClick={() => handlePlaceOrder('SELL')}>
                                                Sell по рынку
                                            </button>
                                        </div>
                                        <div className="col-6 mt-0">
                                            <button className="btn btn-primary w-100" onClick={() => handlePlaceOrder('BUY')}>
                                                Buy по рынку
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderModal;

