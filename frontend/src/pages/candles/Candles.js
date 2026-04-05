import React, { useState, useEffect, useReducer } from 'react';
//import departmentService from '../../services/departmentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { user, useApp } from '../../context/AppContext';

/**
 * Candles - страница для отображения информации о свечах.
 *
 * @author Alexander Kuziv
 * @since 05.04.2026
 * @company TechMatrix18
 * @version 0.0.1
 */

// Короткая запись компонента - стрелочная функция
const Candles = () => {

    const { t, i18n } = useTranslation(); // 2. Инициализируем t

    return (
        <div>
            <h1>{t('candles')}</h1>
            <p>Здесь будут свечи...</p>
        </div>
    );
};

export default Candles;