import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice, faPlus, faClock, faWallet
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const Accounts = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role } = useApp();

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3><FontAwesomeIcon icon={faWallet} className="me-2" /> {t('my_accounts')}</h3>
                    <p>Список моих считов. {role === 'ADMIN' ? 'Все активные счета' : ''}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    //
                </div>
            </div>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/><br/>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/><br/>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/><br/>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/><br/>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/><br/>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/><br/>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/><br/>

            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text, <br/>
            text, text, text.

        </div>
    );
}

export default Accounts;

