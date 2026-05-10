import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import authHeader from '../../services/authHeader';
import Jumbotron from '../../components/Jumbotron';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

// Короткая запись компонента - стрелочная функция
const First = () => {
    const { t, i18n } = useTranslation();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    return (
        <div>
            <Jumbotron />

            <div className="container">
                {/*
                <h1><FontAwesomeIcon icon={faTasks} className="me-2" /> {t('first')}</h1>
                <p>Tasks from Flowable assigned to me. {role === 'ADMIN' ? 'Все активные процессы в системе' : 'Задачи, назначенные на меня'}</p>
                */}

                <div className="row" style={{ marginBottom: '40px' }}>
                    <div className="col-md-12">
                        <div class="container" style={{ marginBottom:'90px' }} >
                            <div style={{ margin:'20px 0' }} ></div>

                            <div class="row">
                                <div class="col-md-7">
                                    <p class="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('first_1') }} /> <br /><br />
                                        <span dangerouslySetInnerHTML={{ __html: t('first_2') }} /> <br /><br />
                                        <span dangerouslySetInnerHTML={{ __html: t('first_3') }} />
                                    </p>
                                </div>
                                <div class="col-md-5">
                                    <img src="http://techmatrix18/img/team5.png" class="img-fluid kromka" alt="." title="команда разработки сайтов TechMatrix18" />
                                </div>
                            </div>

                            <br /><br />

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">{t('who_we_are')}</h1>
                                </div>
                                <div class="col-md-12">
                                    <p class="text-left">
                                        <b>Наша география</b> — это весь мир. Мы разговариваем на нескольких языках и разрабатываем сайты, интернет магазины и сложные системы для бизнеса на современных технологиях. <br /><br />
                                        Возвраст наших клиентов от 28 до 53 лет. Это собственник бизнеса, бизнесмен, бизнес леди, маркетолог и бренд менеджер, владелец производства, предприниматель из сегмента B2B и B2C, публичная личность. <br/><br/>
                                        Сайты заказывают для развития собственного бизнеса, для популяризации компании через интернет, сайт-система для автоматизация процесов на производстве или заводе с привлечением IT, сайт-система или сервис для ведения клинтов и их данных, сайт-система для логистики на предприятии, запуск и вывод нового бренда, для увеличение продаж, поиск новых клиентов, социальный развлекательный или новостной портал, популяризация бренда или захват нового сегмента рынка, веб-сервис и API для мобильных приложений, сайт-система для ведения данных в лаборатории, для увеличение прибыли из интернета. <br/><br/>
                                        Наши сайты: в интернете, на предприятии, на заводе, в банке, в холдинге, в лаборатории, в компании, в корпорации. <br /><br />
                                        Преимущество сайтов в том, что сайты доступны для ваших клиентов как в рабочие дни, так и в любое другое время, представляя ваши услуги на корпоративном сайте или продавая ваши товары 24/7 в интернете тогда, когда офисы закрыты. <br/>
                                    </p>
                                </div>
                            </div>

                            <br /><br />

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">Почему мы?</h1>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/years2.png" alt="TechMatrix18 - МНОГО ЛЕТ ОПЫТА image 1" title="МНОГО ЛЕТ ОПЫТА" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        МНОГО ЛЕТ ОПЫТА <br /><br />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/teams3.png" alt="TechMatrix18 - СЛАЖЕННАЯ КОМАНДА image 2" title="СЛАЖЕННАЯ КОМАНДА" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        СЛАЖЕННАЯ КОМАНДА <br /><br />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/newtecho.png" alt="TechMatrix18 - ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ image 3" title="ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ <br /><br />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/my_clients2.png" alt="TechMatrix18 - НАРАБОТАННЫЕ КЛИЕНТЫ image 4" title="НАРАБОТАННЫЕ КЛИЕНТЫ" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >НАРАБОТАННЫЕ КЛИЕНТЫ</div>
                                </div>
                            </div>

                            <br /><br />

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">А ещё</h1>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/years.png" alt="TechMatrix18 - ЛЕТ <br/>ОПЫТА image 5" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        13
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        ЛЕТ <br/>ОПЫТА <br/><br />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/wagons_water.png" alt="TechMatrix18 - ВАГОНОВ <br/>ВОДЫ ВЫПИТО image 6" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        7
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        ВАГОНОВ <br/>ВОДЫ ВЫПИТО <br/><br/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/days2.png" alt="TechMatrix18 - ДНЕЙ <br/>ПРОГРАММИРОВАНИЯ image 7" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        &gt;4680
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }}>
                                        ДНЕЙ <br/>ПРОГРАММИРОВАНИЯ <br/><br/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/93percent_.png" alt="TechMatrix18 - ДОВОЛЬНЫХ <br/>КЛИЕНТОВ image 8" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        93%
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        ДОВОЛЬНЫХ <br/>КЛИЕНТОВ                </div>
                                </div>
                            </div>

                            <br/><br/>

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">Разработка</h1> <br/>
                                    <p class="text-left">
                                        Да, мы разрабатываем и делаем сайты. Мы пишем код. Делаем большие и не очень сайты. Сайты, которые нам легко поддерживать, ибо мы знаем свой код и знаем, что делаем. Мы не используем бесплатные CMS, которые не предназначены для модицикации и маштабирования в последующем, потому они и бесплатны, а разработка на них стоит дешевле и быстрее. Вам нужно разработать сайт под ключ и запустить его в интернете? Это к нам! Мы готовы разработать сайт для Вас и запустить его в интернете. Наш вектор направления — это корпоративный сайт, интернет магазин и сайт-система. Мы гордимся тем, что мы делаем и разрабатываем сайты. Мы гордимся результатами своей роботы и нашими клиентами. Мы хотим, чтобы и Вы смогли получить желаемый результат, поработав с нами.
                                    </p>
                                    <br/><br/>
                                </div>
                            </div>

                            <div class="card-deck mb-3">
                                <div class="col-md-4 text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                    <a href="http://techmatrix18/ru/landing-page" class="text-corporate">
                                        <div>
                                            <img src="http://techmatrix18/img/icons/lpage_.png" alt="TechMatrix18 - Лендинг пейдж image 9" title="Лендинг пейдж" class="img-development" />
                                        </div>
                                        <h2 class="site-sitio">Лендинг пейдж</h2>
                                    </a>
                                </div>

                                <div class="col-md-4 text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                    <a href="http://techmatrix18/ru/corporate-site" class="text-corporate">
                                        <div>
                                            <img src="http://techmatrix18/img/icons/corporate_.png" alt="TechMatrix18 - Корпоративный сайт image 10" title="Корпоративный сайт" class="img-development" />
                                        </div>
                                        <h2 class="site-sitio">Корпоративный сайт</h2>
                                    </a>
                                </div>

                                <div class="col-md-4 text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                    <a href="http://techmatrix18/ru/api-service" class="text-corporate">
                                        <div>
                                            <img src="http://techmatrix18/img/icons/api_.png" alt="TechMatrix18 - Веб сервис и API для моб. image 11" title="Веб сервис и API для моб." class="img-development" />
                                        </div>
                                        <h2 class="site-sitio">Веб сервис и API для моб.</h2>
                                    </a>
                                </div>
                            </div>
                            <div class="card-deck mb-3">
                                <div class="col-md-4 text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                    <a href="http://techmatrix18/ru/web-portal" class="text-corporate">
                                        <div>
                                            <img src="http://techmatrix18/img/icons/web_portal2.png" alt="TechMatrix18 - Web-портал image 12" title="Web-портал" class="img-development" />
                                        </div>
                                        <h2 class="site-sitio">Web-портал</h2>
                                    </a>
                                </div>

                                <div class="col-md-4 text-center card mb-4 shadow-sm">
                                    <a href="http://techmatrix18/ru/site-system" class="text-corporate">
                                        <div>
                                            <img src="http://techmatrix18/img/icons/sysite.png" alt="TechMatrix18 - Сайт-система image 13" title="Сайт-система" class="img-development" />
                                        </div>
                                        <h2 class="site-sitio">Сайт-система</h2>
                                    </a>
                                </div>

                                <div class="col-md-4 text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                    <a href="http://techmatrix18/ru/online-store" class="text-corporate">
                                        <div>
                                            <img src="http://techmatrix18/img/icons/store2.png" alt="TechMatrix18 - Интернет-магазин image 14" title="Интернет-магазин" class="img-development" />
                                        </div>
                                        <h2 class="site-sitio">Интернет-магазин</h2>
                                    </a>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">Как мы работаем?</h1> <br/>
                                </div>
                                <div class="col-md-5">
                                    <img src="http://techmatrix18/img/planshet2.png" class="img-fluid kromka" alt="." title="команда разработки сайтов TechMatrix18" />
                                    <br/><br/>
                                </div>
                                <div class="col-md-7">
                                    <h4>Разработка состоит из нескольких этапов:</h4><br/>
                                    <p class="text-left">
                                    1. постановка задачи; <br/>
                                    2. подготовка технического задания и заключение договора с клиентом; <br/>
                                    3. разработка макета, согласование с заказчиком; <br/>
                                    4. верстка шаблона, установка системы управления сайтом, настройка хостинга, демо сайта; <br/>
                                    5. разработка необходимого функционала, тестирование; <br/>
                                    6. наполнение контентом; <br/>
                                    7. закрытие заказа после принятия клиентом;
                                    </p>
                                </div>
                                <div class="col-md-12">
                                    <p class="text-left">
                                        Используем разработку, основываясь на современных и передовых технологиях. Facebook, Amazon - все эти платформы написаны на языке программирования PHP с самыми прочными стандартами безопастности и стабильностью кода. <br/><br/>
                                        Мы выбрали этот язык и его фреймворки Yii2, Laravel, когда они ещё не ворвались в ТОП самых используемых на планете. Это позволяет нам разрабатывать в TechMatrix18 уникальное предложение для Вас и быть гибким в реализации Ваших необычных пожеланий. <br/><br/>
                                    </p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 text-left">
                                    <h1 class="text-center text-design2">Наши цены</h1> <br/>
                                </div>
                                <div class="col-md-12 text-left">
                                    <p class="text-left">
                                        - Мы не делаем шаблонных решений (если Вы этого не попросите) <br/>
                                        - Мы не делаем сайты "под копирку" (если Вы этого не попросите) <br/>
                                        - Мы не делаем "тут работы на пару часов" <br/>
                                        - Мы не делаем так, что бы нравилось Вам. Мы делаем так, чтобы нравилось Ваших клиентам <br/>
                                        - Мы добиваемся поставленных целей (не всегда удачно, но главное же что добиваемся) <br/><br/>
                                    </p>
                                    <p class="text-center">
                                        </p><h4 class="text-center">Мы делаем дорого? Делаем!</h4>
                                    <p></p>
                                    <p class="text-left">
                                        Хотя всё это — оплата за наш труд, и если Вы считаете что труд должен оплачиваться - мы сработаемся. Ещё мы умеем заговаривать язык, поэтому если Вы всё ещё хотите узнать цены, <a href="http://techmatrix18/ru/contacts" class="a-green">перейдите по ссылке</a>.
                                    </p> <br/><br/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card-deck mb-3 text-center">
                                        <div class="card mb-4 shadow-sm">
                                            <div class="card-header">
                                                <h4 class="my-0 font-weight-normal">Корпоративный сайт</h4>
                                            </div>
                                            <div class="card-body">
                                                <h1 class="card-title pricing-card-title">от 25000 грн<small class="text-muted"></small></h1>
                                                <ul class="text-left list-unstyled mt-3 mb-4">
                                                    <li>✔ Срок выполнения 10-20 дней</li>
                                                    <li>✔ Определение и наполнение основных разделов</li>
                                                    <li>✔ Дизайн в корпоративных цветах</li>
                                                    <li>✔ 5 функциональных модулей</li>
                                                    <li>✔ Адаптивность под все устройства</li>
                                                    <li>✔ Базовая SEO-оптимизация</li>
                                                    <li>✔ Laravel</li>
                                                    <li>✔ Система управления сайтом</li>
                                                    <li>✔ Обучение работы с сайтом</li>
                                                </ul>
                                                <a type="button" href="http://techmatrix18/ru/contacts" class="btn btn-lg btn-block btn-success">Заказать разработку</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-deck mb-3 text-center">
                                        <div class="card mb-4 shadow-sm">
                                            <div class="card-header">
                                                <h4 class="my-0 font-weight-normal">Интернет-магазин</h4>
                                            </div>
                                            <div class="card-body">
                                                <h1 class="card-title pricing-card-title">от 50000 грн<small class="text-muted"></small></h1>
                                                <ul class="text-left list-unstyled mt-3 mb-4">
                                                    <li>✔ Срок выполнения 2-3 недели</li>
                                                    <li>✔ Наполнение 100 позиций</li>
                                                    <li>✔ Уникальный дизайн</li>
                                                    <li>✔ Возможность онлайн-оплаты</li>
                                                    <li>✔ Адаптивность под все устройства</li>
                                                    <li>✔ Базовая SEO-оптимизация</li>
                                                    <li>✔ 10000 знаков уникального текста</li>
                                                    <li>✔ Laravel</li>
                                                    <li>✔ Обучение работы с сайтом</li>
                                                    <li>✔ Подключение внешних сервисов</li>
                                                    <li>✔ Установка https</li>
                                                    <li>✔ Доменное имя в подарок</li>
                                                </ul>
                                                <a type="button" href="http://techmatrix18/ru/contacts" class="btn btn-lg btn-block btn-success">Заказать разработку</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-deck mb-3 text-center">
                                        <div class="card mb-4 shadow-sm">
                                            <div class="card-header">
                                                <h4 class="my-0 font-weight-normal">Сайт-система</h4>
                                            </div>
                                            <div class="card-body">
                                                <h1 class="card-title pricing-card-title">от 85000 грн<small class="text-muted"></small></h1>
                                                <ul class="text-left list-unstyled mt-3 mb-4">
                                                    <li>✔ Срок выполнения от 2 месяцев</li>
                                                    <li>✔ Наполнение 500 позиций/списков</li>
                                                    <li>✔ Разработка основных составляющих</li>
                                                    <li>✔ Уникальный дизайн</li>
                                                    <li>✔ Разработка логических частей</li>
                                                    <li>✔ Адаптивность под все устройства</li>
                                                    <li>✔ Базовая SEO-оптимизация</li>
                                                    <li>✔ Laravel</li>
                                                    <li>✔ Внутренняя отправка email</li>
                                                    <li>✔ Подключение внешних сервисов</li>
                                                    <li>✔ Система управления сайтом</li>
                                                    <li>✔ Обучение работы с сайтом</li>
                                                    <li>✔ Установка https</li>
                                                    <li>✔ Доменное имя в подарок</li>
                                                </ul>
                                                <a href="http://techmatrix18/ru/contacts" class="btn btn-lg btn-block btn-success">Заказать разработку</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">Отзывы</h1>
                                    <p class="text-center">Наши клиенты говорят о нас</p>
                                </div>
                            </div>
                            <div class="carousel slide py-4" data-interval="false" data-ride="carousel" id="successStories">
                                <ol class="carousel-indicators">
                                    <li class="" data-slide-to="0" data-target="#successStories"></li>
                                    <li data-slide-to="1" data-target="#successStories" class="active"></li>
                                    <li data-slide-to="2" data-target="#successStories"></li>
                                </ol>
                                <div class="carousel-inner pb-4">
                                    <span class="x-link-without-decoration carousel-item" href="/blog/posts/moy-put-i-rol-hexlet-v-moyom-razvitii"><div class="row slide justify-content-center">
                                            <div class="col-12 col-md-10 col-lg-2 d-flex align-items-center d-lg-block mb-5">
                                                <div class="mb-lg-4">
                                                    <img class="img-fluid rounded-circle kromka" width="105" height="105" alt="Аватар пользователя" src="http://techmatrix18/img/foto3.jpg" />
                                                </div>
                                                <div class="ml-4 ml-lg-0">
                                                    <div class="h3 font-weight-bold">Kirill Zakimov</div>
                                                    <div class="h5 mb-0 font-italic">г. Киев</div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-10 col-lg-8">
                                                <p class="lead text-justify">«Мой интернет-магазин сейчас приносит мне прибыль и в нем реализовано все мио сумашедшие идеи, загрузки, каталоги и главное финансовые отчеты с графиками. Работой очень доволен. Есть мобильная версия. Сейчас от туда поступает много заказов. Скорость и оптимизация великолепны.»</p>
                                            </div>
                                        </div>
                                    </span>
                                    <span class="x-link-without-decoration carousel-item " href="/blog/posts/kak-ya-stal-programmistom-v-33-goda"><div class="row slide justify-content-center">
                                            <div class="col-12 col-md-10 col-lg-2 d-flex align-items-center d-lg-block mb-5">
                                                <div class="mb-lg-4">
                                                    <img class="img-fluid rounded-circle kromka" width="105" height="105" alt="Аватар пользователя" src="http://techmatrix18/img/foto.jpg" />
                                                </div>
                                                <div class="ml-4 ml-lg-0">
                                                    <div class="h3 font-weight-bold">Valeriy Zadavysvichka</div>
                                                    <div class="h5 mb-0 font-italic">г. Киев</div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-10 col-lg-8">
                                                <p class="lead text-justify">«Alexander is a good specialist who decided many different technical tasks for our Learning Management system. The development was completed on time and all my wishes and improvements were taken into account. The development was completed on time and all my wishes and improvements were taken into account. Separately, I can highlight the best technical implementations offered to me for the product. I was understood from the floor by words.»</p>
                                            </div>
                                        </div>
                                    </span>
                                    <span class="x-link-without-decoration carousel-item active" href="/blog/posts/feycot-success-story"><div class="row slide justify-content-center">
                                            <div class="col-12 col-md-10 col-lg-2 d-flex align-items-center d-lg-block mb-5">
                                                <div class="mb-lg-4">
                                                    <img class="img-fluid rounded-circle kromka" width="105" height="105" alt="Аватар пользователя" src="http://techmatrix18/img/foto2.jpg" />
                                                </div>
                                                <div class="ml-4 ml-lg-0">
                                                    <div class="h3 font-weight-bold">Katy Antonenko</div>
                                                    <div class="h5 mb-0 font-italic">г. Барселона</div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-10 col-lg-8">
                                                <p class="lead text-justify">«Вот уже месяц как пользуюсь сделаным для меня сайтов. Сайтом и разработкой удовлетворена. Глубина страниц была утверждена на этапе заключения контракта. Сроками, объемом и скоростью разработки осталась довольна, рекомендую.»</p>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <a class="carousel-control-prev x-link-without-decoration d-none d-md-flex" data-slide="prev" href="#successStories" role="button">
                                    <span aria-hidden="true" class="carousel-control-prev-icon"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next x-link-without-decoration d-none d-md-flex" data-slide="next" href="#successStories" role="button">
                                    <span aria-hidden="true" class="carousel-control-next-icon"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>

                            {/* Статьи */}

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default First;