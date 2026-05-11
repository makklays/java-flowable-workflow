import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHome, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import authHeader from '../../services/authHeader';
import Jumbotron from '../../components/Jumbotron';
import Footer from '../../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Короткая запись компонента - стрелочная функция
const OurContacts = () => {
    const { t, i18n } = useTranslation();
    const { lng } = useParams();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Функция инициализации
        const initializeMap = () => {
            if (!window.google || !window.google.maps) return;
            const mapElement = document.getElementById('map');
            if (!mapElement) return;

            const techmatrix18_es = { lat: 41.38656815875593, lng: 2.1720706616829237 };

            const map = new window.google.maps.Map(mapElement, {
                center: techmatrix18_es,
                zoom: 13,
                mapTypeControl: true,
            });

            const marker = new window.google.maps.Marker({
                position: techmatrix18_es,
                map: map,
                title: 'TechMatrix18',
                animation: window.google.maps.Animation.DROP,
            });

            const infowindow = new window.google.maps.InfoWindow({
                content: `<div style="color:#333; padding:5px;">
                            <h5>TechMatrix18</h5>
                            <p><strong>${t('contacts')}</strong><br/>
                            Barcelona, Spain</p>
                          </div>`
            });

            marker.addListener('click', () => infowindow.open(map, marker));
            infowindow.open(map, marker);
        };

        // Если Google уже загружен, просто перерисовываем карту
        if (window.google && window.google.maps) {
            initializeMap();
        } else {
            // Если нет - создаем callback и грузим скрипт
            window.initMap = initializeMap;

            // Проверяем, не висит ли уже скрипт, чтобы не плодить ошибки L is undefined
            if (!document.getElementById('google-maps-script')) {
                const script = document.createElement('script');
                script.id = 'google-maps-script';
                script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyARJ6syX24A-hsZMsKFIufHeQYCgevlv4Q&callback=initMap&language=${lng || 'ru'}`;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
            }
        }

        // Очистка при размонтировании
        return () => {
            // Не удаляем скрипт и google.maps, иначе при возврате на страницу будет ошибка L is undefined
            window.initMap = null;
        };
    }, [lng, t]);

    return (
        <div>
            <Jumbotron />

            <div className="container">
                <div className="row" style={{ marginBottom: '40px' }}>
                    <div className="col-md-12">
                        <div style={{ marginTop: '20px' }}></div>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={`/${lng}/`} className="a-green">
                                        <FontAwesomeIcon icon={faHome} className="me-2" />
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {t('contacts')}
                                </li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-12">
                                <br />
                                <h1 className="text-center text-design2">
                                    {t('contacts')}
                                </h1>
                                <br />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <img src="/img/img/contacts_.jpg" alt="TechMatrix18 - Контакты" title="Контакты" className="img-fluid kromka" />
                            </div>
                            <div className="col-md-6">
                                <p>Давайте обсудим ваш проект</p>
                                <address>
                                    <strong>Адрес</strong><br/>
                                    Испания, <br/>г. Барселона 08002, <br/>
                                    Проспект Портал-дел-Анхель, 40 <br/>
                                </address>
                                <address>
                                    <strong>Контакты</strong><br/>
                                    <abbr title="Skype">Skype:</abbr> <a href="Skype:makklays" className="a-green">makklays</a> <br/>
                                    <abbr title="Моб.">Моб.:</abbr> <a href="tel:+380988705397" className="a-green">+38 (098) 870 5397</a>
                                    <br/><br/>
                                    <a href="mailto:office@techmatrix18.com" className="a-green">office@techmatrix18.com</a> <br/>
                                    <a href="mailto:hhrr@matrix18.com" className="a-green">hhrr@techmatrix18.com</a> <br/>
                                </address>
                                <address>
                                    <strong>Часы работы</strong> <br/>
                                    <span>Понедельник - Пятница: 9:00 - 18:00</span> <br/>
                                    <span>Суббота и Воскресенье: выходной</span>
                                </address>
                            </div>

                            <div className="col-md-12" style={{ margin: '30px 0' }}>
                                <div className="form-group text-center">
                                    <a href={`/brief`} className="a-green link-big2 d-block mb-2">Скачать бриф</a>
                                    <a href={`/online-brief`} className="a-green link-big2 d-block mb-2">Заполнить бриф - онлайн</a>
                                    <a href={`/download-price`} className="a-green link-big2 d-block mb-3">Скачать прайс</a>

                                    <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div
                                    id="map"
                                    className="kromka"
                                    style={{ height: '400px', width: '100%', position: 'relative', border: '1px solid #ddd' }}
                                ></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default OurContacts;