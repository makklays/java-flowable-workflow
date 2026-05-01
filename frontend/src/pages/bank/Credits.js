import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice, faPlus, faClock, faWallet, faHandHoldingDollar
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const Credits = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role } = useApp();

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3><FontAwesomeIcon icon={faHandHoldingDollar} className="me-2" /> {t('payments')}</h3>
                    <p>Список возможных банковских кредитов. {role === 'ADMIN' ? 'Все активные кредиты' : ''}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">

                    Здесь Flowable — это «движок» кредитного конвейера: <br/><br/>

                    Кредитный калькулятор: Запуск процесса оценки (Scoring). <br/>
                    Сбор документов: Динамические задачи (Ad-hoc tasks) — если клиент самозанятый, процесс запрашивает один набор документов, если ИП — другой. <br/>
                    Рефинансирование: Процесс сравнения условий других банков через DMN-таблицы. <br/>

                </div>
            </div>
        </div>
    );
}

export default Credits;

