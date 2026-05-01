import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Investments = () => {

    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    return (
        <div>
            Investments
        </div>
    );
}

export default Investments;

