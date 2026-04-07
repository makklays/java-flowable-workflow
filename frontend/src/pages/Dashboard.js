import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const [data, setData] = useState([]);

    const notify = () => toast.success("Библиотека работает!");

    return (
        <div className="p-4">
            <h1>Панель управления</h1>
            <p>Здесь будут графики продаж...</p>

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm bg-dark text-white border-secondary">
                        <div className="card-body text-center">
                            <h6 className="card-title text-info mb-3">Рыночный сантимент</h6>
                            <div className="py-3">
                                <span className="h2 text-success fw-bold">Strong Buy</span>
                            </div>
                            <div className="progress bg-secondary" style={{height: '10px'}}>
                                <div className="progress-bar bg-success progress-bar-striped progress-bar-animated"
                                     style={{width: '75%'}}>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between small mt-2 fw-bold">
                                <span className="text-danger">Sell</span>
                                <span className="text-warning">Neutral</span>
                                <span className="text-success">Buy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button className="btn btn-primary" onClick={notify}>Проверить тост</button>

            </div>
        </div>
    );
};

export default Dashboard;

