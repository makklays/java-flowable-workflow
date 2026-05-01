import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice, faPlus, faClock, faWallet, faUserTie
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const Advisor = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role } = useApp();

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3><FontAwesomeIcon icon={faUserTie} className="me-2" /> {t('advisor')}</h3>
                    <p>Персональный финансовый советник по управлению активами. {role === 'ADMIN' ? '' : ''}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">

                    Тут идеально ложится концепция управления портфелем: <br/><br/>

                    Инвест-профиль: Тестирование (опросник), результат которого сохраняется как бизнес-переменная и определяет доступные стратегии. <br/>
                    Автоследование: Процесс-таймер, который раз в месяц инициирует проверку портфеля на отклонение от стратегии. <br/>
                    Чат с советником: Кейс-менеджмент (CMMN), где общение — это часть процесса формирования финансового плана. <br/>

                </div>
            </div>
        </div>
    );
}

export default Advisor;

