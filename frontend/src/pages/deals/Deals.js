import React, { useState, useEffect, useReducer } from 'react';
//import departmentService from '../../services/departmentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { user, useApp } from '../../context/AppContext';

// Короткая запись компонента - стрелочная функция
const Deals = () => {

    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>Сделки</h1>
            <p>Здесь будут сделки...</p>
        </div>
    );
};

export default Deals;

