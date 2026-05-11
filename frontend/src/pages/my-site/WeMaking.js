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
const WeMaking = () => {
    const { t, i18n } = useTranslation();
    const { lng } = useParams();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    return (
        <div>
            <Jumbotron />

            <div className="container">
                <div className="row" style={{ marginBottom: '40px' }}>
                    <div className="col-md-12">
                        <div className="container" style={{ marginTop:'20px' }} ></div>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={`/${lng}/`} className="a-green"><FontAwesomeIcon icon={faHome} className="me-2" /></Link></li>
                                <li className="breadcrumb-item" aria-current="page">{t('how_work')}</li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-12">
                                <br />
                                <h1 className="text-center text-design2">
                                    {t('how_work')}
                                </h1>
                                <br />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-5">
                                <img src="/img/img/333.jpg" alt="TechMatrix18 - Как мы работаем? image1" title="Как мы работаем?" className="img-fluid kromka" /> <br/><br/>
                            </div>
                            <div className="col-md-7">
                                <h4>Разработка состоит из нескольких этапов:</h4> <br/>
                                1. постановка задачи; <br/>
                                2. подготовка технического задания и заключение договора с клиентом; <br/>
                                3. разработка макета, согласование с заказчиком; <br/>
                                4. верстка шаблона, установка системы управления сайтом, настройка хостинга; <br/>
                                5. разработка необходимого функционала, тестирование; <br/>
                                6. наполнение контентом; <br/>
                                7. закрытие заказа после принятия клиентом; <br/><br/>
                            </div>
                        </div>
                        <div className="col-md-12 ">
                            Разработка сайта в TechMatrix18 не является конечной целью. Это лишь инструмент, который должен помогать развитию бизнеса и увеличению прибыли заказчика. <br/><br/>
                            Используем передовые технологии. Facebook, Amazon — все эти платформы написаны на языке программирования PHP с самыми прочными стандартами безопастности и стабильностью кода. <br/>
                            Мы выбрали этот язык и его фреймворки Yii2, Laravel, когда они ещё не ворвались в ТОП самых используемых на планете. <br/>
                            Эти технологии позволяют нам разрабатывать в TechMatrix18 уникальное предложение для Вас и быть гибким в реализации Ваших пожеланий. <br/><br/>

                            <h4>Формы консультаций:</h4> <br/>
                            - Встреча в городе (по договоренности); <br/>
                            - Skype-консультация; <br/>
                            - Письменная консультация (формат: вопрос/ответ); <br/><br/>
                        </div>
                        <div className="col-md-12 ">
                            <h1 className="text-center text-design2">Как нам платить?</h1> <br/><br/>

                            Мы как и все международные ИТ-компании имеем счет в Европейском банке, а также SWIFT счет, для наших клиентов со всей Европы, которые могут оплатить наши услуги в евро.
                            Скачать и просмотреть реквизиты вы можете ниже:<br/><br/>

                            <b>Account in the bank</b><br/>
                            400886700401<br/><br/>

                            <b>SWIFT Code of bank</b><br/>
                            COBADEFF<br/><br/>

                            <b>Bank</b><br/>
                            Commerzbank AG, Frankfurt am Main, Germany<br/><br/>

                            В результате нашей работы мы предоставляем вам разработанный сайт и акт выполненных работ.<br/>
                            Всё очень просто, мы не запутываем наших клиентов, мы говорим правду и только правду. <br/><br/><br/><br/>
                        </div>

                        <div className="col-md-12 text-center">
                            <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                            <br/><br/><br/><br/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row" style={{ marginBottom: '40px' }}>
                    <div className="col-md-12">
                        <div className="section6">
                            <div className="row parallax3">
                                <div className="col-6 col-sm-6 col-md-6"></div>
                                <div className="col-12 col-sm-6 col-md-6">
                                    <div style={{ margin:'40px 20px 40px 0', padding:'20px 0 20px 0', borderRadius:'0px', backgroundColor:'#FFFFFF' }} >
                                        <h4 className="text-center">О работе и счастьи <span style={{ color:'red' }} >❤</span></h4> <br />
                                        <div className="text-justify" style={{ margin:'0 40px 0 40px' }} >
                                            <blockquote>
                                                <p>«Счастье - это когда утром с радостью идешь на работу, а вечером с радостью возвращаешься домой.»</p>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-justify">
                        <br/><br/>
                        <h1 className="text-center text-design2">Наши преимущества?</h1> <br/>
                    </div>

                    <div className="col-md-7">
                        ✔ <b>Удобная и понятная CMS</b> <br/>
                        <span>Система управления сайта с разными правами доступа. Улучшенный интерфейс для удобной работы администратора. </span><br/><br/>
                        ✔ <b>Хостинг и протокол HTTPS</b> <br/>
                        <span>Мы настраиваем защищенный протокол https на Ваш сайт при заказе услуги нашего хостинга. </span><br/><br/>
                        ✔ <b>Сервисы аналитики</b> <br/>
                        <span>Интеграция и настройка популярных сервисов отслеживания статистики посещения Вашего сайта. </span><br/><br/>
                        ✔ <b>Оптимизация скорости загрузки</b> <br/>
                        <span>Предлагаем услуги по оптимизации контента и скорости загрузки Вашего сайта. </span><br/><br/>
                        ✔ <b>Интеграция с сервисами / CRM</b> <br/>
                        <span>Автоматизация продаж, бизнес процессов и взаимодействия с Вашими клиентами. </span><br/><br/>
                        ✔ <b>Работа с контентом</b> <br/>
                        <span>При необходимости, вопросы, связанные с наполнением сайта, команда может взять на себя. </span><br/>
                        <br/><br/>
                    </div>
                    <div className="col-md-5">
                        <img src="/img/img/advantages.jpg" alt="TechMatrix18 - Как мы работаем? image2" title="site.circle_project" class="img-fluid kromka" />
                    </div>

                    <div className="col-md-12">
                        <h1 className="text-center text-design2">Гарантия!</h1> <br/>
                    </div>

                    <div class="col-md-5">
                        <img src="/img/img/100-percent.jpg" alt="TechMatrix18 - Как мы работаем? image3" title="Гарантия!" class="img-fluid kromka" />
                    </div>
                    <div className="col-md-7">
                        ✔ <b>Запуск итерациями</b> <br/>
                            Итерации позволяют выделить часть работы для успешной реализации <br/><br/>
                        ✔ <b>Без "воды"</b> <br/>
                            Только факты и действия ведущие к результату <br/><br/>
                        ✔ <b>Гарантия результата</b> <br/>
                            На все наши разработки даем годовую гарантию и бесплатно устраняем выявленные ошибки
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default WeMaking;