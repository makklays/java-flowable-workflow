import React from 'react';

const OrderModal = ({ isOpen, onClose, symbol, symbolId, askPrice, bidPrice }) => {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>
            <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1055 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content shadow-lg">

                        {/* Шапка с ID символа для отладки */}
                        <div className="modal-header py-2" style={{ backgroundColor: '#444', color: '#fff' }}>
                            <h6 className="modal-title m-0">Ордер #{symbolId} — {symbol}</h6>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        <div className="modal-body p-4">
                            <div className="row g-3">
                                {/* Символ (статично отображаем то, что пришло) */}
                                <div className="col-4 text-end pt-1"><small>Символ:</small></div>
                                <div className="col-8">
                                    <input className="form-control form-control-sm bg-light" value={symbol} readOnly />
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
                                    <small className="text-muted">лот {symbol}</small>
                                </div>

                                {/* ЦЕНЫ ИЗ PROPS */}
                                <div className="col-12 text-center my-4">
                                    <h2 className="fw-light">
                                        <span className="text-danger">{bidPrice}</span>
                                        <span className="mx-2">/</span>
                                        <span className="text-primary">{askPrice}</span>
                                    </h2>
                                    <small className="text-muted text-uppercase">Текущая котировка (ID: {symbolId})</small>
                                </div>

                                {/* Кнопки */}
                                <div className="col-6">
                                    <button className="btn btn-danger w-100 py-2">
                                        Sell {bidPrice}
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-primary w-100 py-2" style={{ backgroundColor: '#8ea9db', border: 'none' }}>
                                        Buy {askPrice}
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

