import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice, faPlus, faClock, faWallet, faRightLeft
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const Transfers = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role } = useApp();

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3><FontAwesomeIcon icon={faRightLeft} className="me-2" /> {t('perevodu')}</h3>
                    <p>Список возможных банковских переводов. {role === 'ADMIN' ? 'Все активные переводы' : ''}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">

                    Вместо простой формы сделайте «Умный помощник по переводам»: <br/><br/>

                    Диспетчеризация (DMN): Система сама выбирает тип процесса (СБП, по реквизитам или Swift) в зависимости от суммы и валюты. <br/>
                    Комплаенс-проверка: Если сумма выше лимита, Flowable ставит задачу сотруднику банка на ручной аппрув. <br/>
                    Заявка на розыск платежа: Полноценный кейс (CMMN) для отслеживания статуса проблемной транзакции. <br/>

                </div>
            </div>
        </div>
    );
}

export default Transfers;

