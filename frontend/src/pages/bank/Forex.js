import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice, faPlus, faClock, faWallet, faCoins
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const Forex = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role } = useApp();

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3><FontAwesomeIcon icon={faCoins} className="me-2" /> {t('forex')}</h3>
                    <p>Список валютных пар из валютного рынка. {role === 'ADMIN' ? '' : ''}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">

                    https://api.frankfurter.dev/v1/latest?to=USD,GBP,CHF,AUD,NZD,CAD  <br/><br/>

                </div>
            </div>
        </div>
    );
}

export default Forex;

