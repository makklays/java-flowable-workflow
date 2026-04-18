import React from 'react';

// Добавь все эти переменные в фигурные скобки здесь:
const OrderModal = ({
  isOpen,
  onClose,
  symbols,
  selectedCoin,
  onSymbolChange,
  type,
  allPrices
}) => {
    if (!isOpen) return null;

    // Достаем актуальную цену для ВЫБРАННОГО в данный момент тикера
    const currentPrice = allPrices[selectedCoin.ticker] || '0.00';

    const handlePlaceOrder = (side) => {
        // Формируем объект для Java бэкенда
        const orderData = {
            symbolId: selectedCoin.id,
            ticker: selectedCoin.ticker,
            side: side, // 'BUY' или 'SELL'
            type: 'MARKET',
            volume: 1.0, // Тут можно добавить стейт для инпута объема
            price: currentPrice,
        };

        console.log("Отправка ордера:", orderData);
        // Здесь будет вызов: api.post('/orders', orderData)
        onClose(); // Закрываем после клика
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
                                    <select className="form-select form-select-sm text-white" style={{ backgroundColor: '#03aac7' }}>
                                        <option>Исполнение по рынку</option>
                                        <option>Лимитный ордер</option>
                                    </select>
                                </div>

                                <hr className="my-2" />

                                {/* Объем */}
                                <div className="col-4 text-end pt-1"><small>Объем:</small></div>
                                <div className="col-8 d-flex align-items-center gap-2">
                                    <input type="number" className="form-control form-control-sm w-50" defaultValue="1.00" step="0.01" />
                                    <small className="text-muted">лот {selectedCoin.ticker}</small>
                                </div>

                                {/* Stop Loss и Take Profit */}
                                <div className="col-4 text-end pt-2"><small>Stop Loss:</small></div>
                                <div className="col-8 text-end pt-1">
                                    <div className="row">
                                        <div className="col-4 align-items-center">
                                            <input type="number" className="form-control form-control-sm" defaultValue="0.00" step="0.1" />
                                        </div>

                                        <div className="col-4 text-end pt-1"><small>Take Profit:</small></div>
                                        <div className="col-4 align-items-center">
                                            <input type="number" className="form-control form-control-sm" defaultValue="0.00" step="0.1" />
                                        </div>
                                    </div>
                                </div>

                                {/* Комментарий */}
                                <div className="col-4 text-end pt-2"><small>Комментарий:</small></div>
                                <div className="col-8 text-end pt-1">
                                    <input type="text" className="form-control form-control-sm" value="" />
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

