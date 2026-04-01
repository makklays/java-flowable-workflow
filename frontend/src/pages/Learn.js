import React, { useState } from 'react';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const Learn = () => {
    const [count, setCount] = useState(0);
    const { t, i18n } = useTranslation();

    function handleClickPlus() {
        setCount(count + 1);
    }
    function handleClickMinus() {
        setCount(count - 1);
    }

    return (
        <>
            <div>
                <h1>Обучение React</h1>
                <p>Здесь будут елементы обучения React...</p>
            </div>

            <div style={{ fontSize: '24px', fontWeight: 'bold' }} >{count}</div>
            <div style={{ marginTop: '20px' }} >
                <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleClickPlus} >{t('big')}</button>
                <button className="btn btn-primary" onClick={handleClickMinus} >{t('less')}</button>
            </div>
        </>
    );
};

export default Learn;