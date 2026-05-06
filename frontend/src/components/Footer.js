import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import authHeader from '../services/authHeader';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';

// Короткая запись компонента - стрелочная функция
const Footer = () => {
    const { t, i18n } = useTranslation();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    const { lng } = useParams();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const changeLanguageAndRedirect = (newLng) => {
        // 1. Меняем язык в i18next
        i18n.changeLanguage(newLng);

        // 2. Получаем текущие сегменты URL (например, ['es', 'about-us'])
        const pathSegments = location.pathname.split('/').filter(Boolean);

        // Проверяем, есть ли уже языковой префикс
        const supportedLangs = ['es', 'en', 'ua', 'ru', 'ch'];
        if (supportedLangs.includes(pathSegments[0])) {
            pathSegments.shift(); // Удаляем старый префикс
        }

        // 3. Собираем новый путь с новым языком (например, '/en/about-us')
        const newPath = `/${newLng}/${pathSegments.join('/')}`;

        // 4. Перенаправляем пользователя
        navigate(newPath);
    };

    return (
        <footer style={{ backgroundColor:'#e7e7e7', marginTop: '90px' }} >
            <div className="container">
                <div className="row" style={{ padding: '40px 0 0 0' }} >
                    <div className="col-md-4 col-sm-6 col-12">
                        <h4>El equipo</h4>
                        <div><Link to={`/${lng}/about-us`} className="a-green-xl">Nosotros</Link></div>
                        <div><Link to={`/${lng}/we-making`} className="a-green-xl">¿Como trabajamos?</Link></div>
                        <div><Link to={`/${lng}/development-site-store`} className="a-green-xl">¿Que estamos haciendo?</Link></div>
                        <div><Link to={`/${lng}/articles`} className="a-green-xl">Artículos</Link></div>
                        <div><Link to={`/${lng}/our-contacts`} className="a-green-xl">Contactos</Link></div>
                        <div style={{ padding: '20px 0 0 0' }}>
                            <h4>Idioma</h4>
                            <span onClick={() => changeLanguageAndRedirect('es')} style={{ cursor: 'pointer' }}>
                                <img src="/img/flags/Spain-flag-48.png" style={{ width: '28px' }} alt="ES" title="ES" />
                            </span> &nbsp;
                            <span onClick={() => changeLanguageAndRedirect('en')} style={{ cursor: 'pointer' }}>
                                <img src="/img/flags/United-kingdom-flag-48.png" style={{ width: '28px' }} alt="EN" title="EN" />
                            </span> &nbsp;
                            <span onClick={() => changeLanguageAndRedirect('ua')} style={{ cursor: 'pointer' }}>
                                <img src="/img/flags/ukraine-flag.png" style={{ width: '28px' }} alt="UA" title="UA" />
                            </span> &nbsp;
                            <span onClick={() => changeLanguageAndRedirect('ru')} style={{ cursor: 'pointer' }}>
                                <img src="/img/flags/Russia-flag-48.png" style={{ width: '28px' }} alt="RU" title="RU" />
                            </span> &nbsp;
                            <span onClick={() => changeLanguageAndRedirect('ch')} style={{ cursor: 'pointer' }}>
                                <img src="/img/flags/China-flag-48.png" style={{ width: '28px' }} alt="CH" title="CH" />
                            </span>
                        </div>
                        <br />
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">
                        <h4>Desarrollo</h4>
                        <div><Link to={`/${lng}/landing-page`} className="a-green-xl">Página de aterrizaje</Link></div>
                        <div><Link to={`/${lng}/online-store`} className="a-green-xl">Tienda en línea</Link></div>
                        <div><Link to={`/${lng}/corporate-site`} className="a-green-xl">Sitio web corporativo</Link></div>
                        <div><Link to={`/${lng}/api-service`} className="a-green-xl">Servicio web y API para aplicación móvil</Link></div>
                        <div><Link to={`/${lng}/web-portal`} className="a-green-xl">Portal web</Link></div>
                        <div><Link to={`/${lng}/site-system`} className="a-green-xl">Sistema de sitio web</Link></div>
                        <div style={{ padding:'20px 0 0 0' }} >
                            <a href="https://www.facebook.com/techmatrix18/" style={{ color:'#FFFFFF', textDecoration:'none' }} target="_blank">
                                <img src="/img/fb-icon.png" style={{ width:'25px' }} alt="Facebook" />
                            </a> &nbsp;
                            <a href="https://www.linkedin.com/company/techmatrix18/" style={{ color:'#FFFFFF', textDecoration:'none' }} target="_blank">
                                <img src="/img/linkedin-icon.png" style={{ width:'25px' }} alt="Linkedin" />
                            </a>
                        </div>
                        <br />
                    </div>
                    <div className="col-md-4">
                        <h4>Precio</h4>
                        <div><Link to={`/${lng}/download-price`} className="a-green-xl">Precio de descarga</Link></div>
                        <div><Link to={`/${lng}/online-brief`} className="a-green-xl">Complete un breve en línea</Link></div>
                        <div><Link to={`/${lng}/brief`} className="a-green-xl">Descargar resumen de development</Link></div>
                        <br />
                        <div><Link to={`/${lng}/test-php`} className="a-green-xl">Prueba PHP</Link></div>
                        <div><Link to={`/${lng}/cat-o-dog`} className="a-green-xl">Gattos o perros</Link></div>
                        <div><Link to={`/${lng}/wait`} className="a-green-xl">Te espero</Link></div>
                        <div><Link to={`/${lng}/wait2`} className="a-green-xl">Esperando una cita</Link></div>
                        <div><Link to={`/${lng}/seo-words`} className="a-green-xl">Word Count (SEO)</Link></div>
                        {/* Sitemap оставляем обычным тегом <a>, чтобы браузер открывал сам файл */}
                        <div><a href="/sitemap.xml" className="a-green-xl" target="_blank" rel="noopener noreferrer">Sitemap</a></div>
                        <br />
                    </div>
                    <div className="col-md-12">
                        <p style={{ fontSize: '18px' }} >© techmatrix18.com 2007-2026</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;