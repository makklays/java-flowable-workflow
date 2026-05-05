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
import { Link, useNavigate } from 'react-router-dom';

// Короткая запись компонента - стрелочная функция
const Footer = () => {
    const { t, i18n } = useTranslation();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    return (
        <footer style={{ backgroundColor:'#e7e7e7', marginTop: '90px' }} >
            <div className="container">
                <div className="row" style={{ padding: '40px 0 0 0' }} >
                    <div className="col-md-4 col-sm-6 col-12">
                        <h4>El equipo</h4>
                        <div><a href="http://techmatrix18/es/about-us" className="a-green-xl">Nosotros</a></div>
                        <div><a href="http://techmatrix18/es/we-making" className="a-green-xl">¿Como trabajamos?</a></div>
                        <div><a href="http://techmatrix18/es/development-site-store" className="a-green-xl">¿Que estamos haciendo?</a></div>
                        <div><a href="http://techmatrix18/es/articles" className="a-green-xl">Artículos</a></div>
                        <div><a href="http://techmatrix18/es/contacts" className="a-green-xl">Contactos</a></div>
                        <div style={{ padding:'20px 0 0 0' }} >
                            <h4>Idioma</h4>
                            <Link to="/es"><img src="/img/flags/Spain-flag-48.png" style={{ width: '28px' }} alt="ES" title="ES" /></Link> &nbsp;
                            <Link to="/en"><img src="/img/flags/United-kingdom-flag-48.png" style={{ width:'28px' }} alt="EN" title="EN" /></Link> &nbsp;
                            <Link to="/ua"><img src="/img/flags/ukraine-flag.png" style={{ width:'28px' }} alt="UA" title="UA" /></Link>  &nbsp;
                            <Link to="/ru"><img src="/img/flags/Russia-flag-48.png" style={{ width: '28px' }} alt="RU" title="RU" /></Link> &nbsp;
                            <Link to="/ch"><img src="/img/flags/China-flag-48.png" style={{ width:'28px' }} alt="CH" title="CH" /></Link>
                        </div>
                        <br />
                    </div>
                    <div className="col-md-4 col-sm-6 col-12">
                        <h4>Desarrollo</h4>
                        <div><a href="http://techmatrix18/es/landing-page" className="a-green-xl">Página de aterrizaje</a></div>
                        <div><a href="http://techmatrix18/es/online-store" className="a-green-xl">Tienda en línea</a></div>
                        <div><a href="http://techmatrix18/es/corporate-site" className="a-green-xl">Sitio web corporativo</a></div>
                        <div><a href="http://techmatrix18/es/api-service" className="a-green-xl">Servicio web y API para aplicación móvil</a></div>
                        <div><a href="http://techmatrix18/es/web-portal" className="a-green-xl">Portal web</a></div>
                        <div><a href="http://techmatrix18/es/site-system" className="a-green-xl">Sistema de sitio web</a></div>
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
                        <div><a href="http://techmatrix18/es/download-price" className="a-green-xl">Precio de descarga</a></div>
                        <div><a href="http://techmatrix18/es/online-brief" className="a-green-xl">Complete un breve en línea</a></div>
                        <div><a href="http://techmatrix18/es/brief" className="a-green-xl">Descargar resumen de desarrollo</a></div>
                        <br />
                        <div><a href="http://techmatrix18/es/test-php" className="a-green-xl">Prueba PHP</a></div>
                        <div><a href="http://techmatrix18/es/cat-o-dog" className="a-green-xl">Gattos o perros</a></div>
                        <div><a href="http://techmatrix18/es/wait" className="a-green-xl">Te espero</a></div>
                        <div><a href="http://techmatrix18/es/wait2" className="a-green-xl">Esperando una cita</a></div>
                        <div><a href="http://techmatrix18/es/seo-words" className="a-green-xl">Word Count (SEO)</a></div>
                        <div><a href="http://techmatrix18/sitemap.xml" className="a-green-xl">Sitemap</a></div>
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