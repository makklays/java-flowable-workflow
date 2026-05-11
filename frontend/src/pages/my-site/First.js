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
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';

// Короткая запись компонента - стрелочная функция
const First = () => {
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
                                        <span dangerouslySetInnerHTML={{ __html: t('first_4') }} />
                                    </p>
                                </div>
                            </div>

                            <br /><br />

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">{t('why_us')}</h1>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/years2.png" alt="TechMatrix18 - МНОГО ЛЕТ ОПЫТА image 1" title="МНОГО ЛЕТ ОПЫТА" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_1')} <br /><br />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/teams3.png" alt="TechMatrix18 - СЛАЖЕННАЯ КОМАНДА image 2" title="СЛАЖЕННАЯ КОМАНДА" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_2')} <br /><br />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/newtecho.png" alt="TechMatrix18 - ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ image 3" title="ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_3')} <br /><br />
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/my_clients2.png" alt="TechMatrix18 - НАРАБОТАННЫЕ КЛИЕНТЫ image 4" title="НАРАБОТАННЫЕ КЛИЕНТЫ" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_4')}
                                    </div>
                                </div>
                            </div>

                            <br /><br />

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">{t('a_ewe')}</h1>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <img class="img-development" src="http://techmatrix18/img/icons/years.png" alt="TechMatrix18 - ЛЕТ <br/>ОПЫТА image 5" />
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        13
                                    </div>
                                    <div class="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_5')} <br/><br />
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
                                        {t('title_6')} <br/><br/>
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
                                        {t('title_7')} <br/><br/>
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
                                        {t('title_8')}
                                    </div>
                                </div>
                            </div>

                            <br/><br/>

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">{t('development')}</h1> <br/>
                                    <p class="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('first_5') }} />
                                    </p>
                                    <br/><br/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="card-deck mb-3">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                                <Link to={`/${lng}/landing-page`} className="text-corporate">
                                                    <div>
                                                        <img src="http://techmatrix18/img/icons/lpage_.png" alt="TechMatrix18 - Лендинг пейдж image 9" title="Лендинг пейдж" class="img-development" />
                                                    </div>
                                                    <h2 class="site-sitio">{t('service_1')}</h2>
                                                </Link>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                                <Link to={`/${lng}/corporate-site`} className="text-corporate">
                                                    <div>
                                                        <img src="http://techmatrix18/img/icons/corporate_.png" alt="TechMatrix18 - Корпоративный сайт image 10" title="Корпоративный сайт" class="img-development" />
                                                    </div>
                                                    <h2 class="site-sitio">{t('service_2')}</h2>
                                                </Link>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                                <Link to={`/${lng}/api-service`} className="text-corporate">
                                                    <div>
                                                        <img src="http://techmatrix18/img/icons/api_.png" alt="TechMatrix18 - Веб сервис и API для моб. image 11" title="Веб сервис и API для моб." class="img-development" />
                                                    </div>
                                                    <h2 class="site-sitio">{t('service_3')}</h2>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-deck mb-3">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                            <Link to={`/${lng}/web-portal`} className="text-corporate">
                                                <div>
                                                    <img src="http://techmatrix18/img/icons/web_portal2.png" alt="TechMatrix18 - Web-портал image 12" title="Web-портал" class="img-development" />
                                                </div>
                                                <h2 class="site-sitio">{t('service_4')}</h2>
                                            </Link>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="text-center card mb-4 shadow-sm">
                                            <Link to={`/${lng}/site-system`} className="text-corporate">
                                                <div>
                                                    <img src="http://techmatrix18/img/icons/sysite.png" alt="TechMatrix18 - Сайт-система image 13" title="Сайт-система" class="img-development" />
                                                </div>
                                                <h2 class="site-sitio">{t('service_5')}</h2>
                                            </Link>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                            <Link to={`/${lng}/online-store`} className="text-corporate">
                                                <div>
                                                    <img src="http://techmatrix18/img/icons/store2.png" alt="TechMatrix18 - Интернет-магазин image 14" title="Интернет-магазин" class="img-development" />
                                                </div>
                                                <h2 class="site-sitio">{t('service_6')}</h2>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">{t('how_work')}</h1> <br/>
                                </div>
                                <div class="col-md-5">
                                    <img src="http://techmatrix18/img/planshet2.png" class="img-fluid kromka" alt="." title="команда разработки сайтов TechMatrix18" />
                                    <br/><br/>
                                </div>
                                <div class="col-md-7">
                                    <h4>{t('title_f1')}:</h4><br/>
                                    <p class="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('descr_f1') }} />
                                    </p>
                                </div>
                                <div class="col-md-12">
                                    <p class="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('first_7') }} />
                                    </p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 text-left">
                                    <h1 class="text-center text-design2">{t('our_prices')}</h1> <br/>
                                </div>
                                <div class="col-md-12 text-left">
                                    <p class="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('descr_f2') }} /> <br/>
                                    </p>
                                    <p class="text-center">
                                        </p><h4 class="text-center">{t('we_work_expensive')}</h4>
                                    <p></p>
                                    <p class="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('descr_f3') }} />&nbsp;
                                        <Link to={`/${lng}/our-contacts`} className="a-green">{t('go_link')}</Link>.
                                    </p> <br/><br/>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="card-deck mb-3 text-center">
                                        <div class="card mb-4 shadow-sm">
                                            <div class="card-header">
                                                <h4 class="my-0 font-weight-normal">{t('corporate_website')}</h4>
                                            </div>
                                            <div class="card-body">
                                                <h1 class="card-title pricing-card-title">{t('corp_site_price')}<small class="text-muted"></small></h1>
                                                <ul class="text-left list-unstyled mt-3 mb-4" style={{ textAlign:'left' }} >
                                                    <span dangerouslySetInnerHTML={{ __html: t('corp_site_descr') }} />
                                                </ul>
                                                <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-deck mb-3 text-center">
                                        <div class="card mb-4 shadow-sm">
                                            <div class="card-header">
                                                <h4 class="my-0 font-weight-normal">{t('online_store')}</h4>
                                            </div>
                                            <div class="card-body">
                                                <h1 class="card-title pricing-card-title">{t('online_store_price')}<small class="text-muted"></small></h1>
                                                <ul class="text-left list-unstyled mt-3 mb-4" style={{ textAlign:'left' }} >
                                                    <span dangerouslySetInnerHTML={{ __html: t('online_store_descr') }} />
                                                </ul>
                                                <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card-deck mb-3 text-center">
                                        <div class="card mb-4 shadow-sm">
                                            <div class="card-header">
                                                <h4 class="my-0 font-weight-normal">{t('site_system')}</h4>
                                            </div>
                                            <div class="card-body">
                                                <h1 class="card-title pricing-card-title">{t('site_system_price')}<small class="text-muted"></small></h1>
                                                <ul class="text-left list-unstyled mt-3 mb-4" style={{ textAlign:'left' }} >
                                                    <span dangerouslySetInnerHTML={{ __html: t('site_system_descr') }} />
                                                </ul>
                                                <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-design2">{t('reviews')}</h1>
                                    <p class="text-center">{t('reviews_title')}</p>
                                </div>
                            </div>
                            <div class="carousel slide py-4" data-interval="false" data-ride="carousel" id="successStories">
                                <ol class="carousel-indicators">
                                    <li class="" data-slide-to="0" data-target="#successStories"></li>
                                    <li data-slide-to="1" data-target="#successStories" class="active"></li>
                                    <li data-slide-to="2" data-target="#successStories"></li>
                                </ol>
                                <div class="carousel-inner pb-4">
                                    <span class="x-link-without-decoration carousel-item" href="/blog/posts/moy-put-i-rol-hexlet-v-moyom-razvitii">
                                        <div class="row slide justify-content-center">
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
                                    <span class="x-link-without-decoration carousel-item " href="/blog/posts/kak-ya-stal-programmistom-v-33-goda">
                                        <div class="row slide justify-content-center">
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
                                    <span class="x-link-without-decoration carousel-item active" href="/blog/posts/feycot-success-story">
                                        <div class="row slide justify-content-center">
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