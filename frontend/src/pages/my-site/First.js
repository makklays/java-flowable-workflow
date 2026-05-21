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
import RecommendCarousel from '../../components/RecommendCarousel';

const mockRecommend = [
    {
        id: 1,
        person: 'Kirill Zakimov',
        city: 'г. Киев',
        photo: 'http://techmatrix18/img/foto3.jpg',
        recommend: `«Мой интернет-магазин сейчас приносит мне прибыль и в нем реализовано все мио сумашедшие идеи,
            загрузки, каталоги и главное финансовые отчеты с графиками. Работой очень доволен. Есть мобильная версия.
            Сейчас от туда поступает много заказов. Скорость и оптимизация великолепны.»`,
    },
    {
        id: 2,
        person: 'Valeriy Zadavysvichka',
        city: 'г. Киев',
        photo: 'http://techmatrix18/img/foto.jpg',
        recommend: `«Alexander is a good specialist who decided many different technical tasks for our Learning
            Management system. The development was completed on time and all my wishes and improvements were taken into
            account. The development was completed on time and all my wishes and improvements were taken into account.
            Separately, I can highlight the best technical implementations offered to me for the product.
            I was understood from the floor by words.»`,
    },
    {
        id: 3,
        person: 'Katy Antonenko',
        city: 'г. Барселона',
        photo: 'http://techmatrix18/img/foto2.jpg',
        recommend: `«Вот уже месяц как пользуюсь сделаным для меня сайтов. Сайтом и разработкой удовлетворена. Глубина
            страниц была утверждена на этапе заключения контракта. Сроками, объемом и скоростью разработки осталась
            довольна, рекомендую.»`,
    }
];

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
                        <div className="container" style={{ marginBottom:'90px' }} >
                            <div style={{ margin:'20px 0' }} ></div>

                            <div className="row">
                                <div className="col-md-7">
                                    <p className="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('first_1') }} /> <br /><br />
                                        <span dangerouslySetInnerHTML={{ __html: t('first_2') }} /> <br /><br />
                                        <span dangerouslySetInnerHTML={{ __html: t('first_3') }} />
                                    </p>
                                </div>
                                <div className="col-md-5">
                                    <img src="http://techmatrix18/img/team5.png" className="img-fluid kromka" alt="." title="команда разработки сайтов TechMatrix18" />
                                </div>
                            </div>

                            <br /><br />

                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center text-design2">{t('who_we_are')}</h1>
                                </div>
                                <div className="col-md-12">
                                    <p className="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('first_4') }} />
                                    </p>
                                </div>
                            </div>

                            <br /><br />

                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center text-design2">{t('why_us')}</h1>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/years2.png" alt="TechMatrix18 - МНОГО ЛЕТ ОПЫТА image 1" title="МНОГО ЛЕТ ОПЫТА" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_1')} <br /><br />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/teams3.png" alt="TechMatrix18 - СЛАЖЕННАЯ КОМАНДА image 2" title="СЛАЖЕННАЯ КОМАНДА" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_2')} <br /><br />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/newtecho.png" alt="TechMatrix18 - ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ image 3" title="ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_3')} <br /><br />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/my_clients2.png" alt="TechMatrix18 - НАРАБОТАННЫЕ КЛИЕНТЫ image 4" title="НАРАБОТАННЫЕ КЛИЕНТЫ" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_4')}
                                    </div>
                                </div>
                            </div>

                            <br /><br />

                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center text-design2">{t('a_ewe')}</h1>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/years.png" alt="TechMatrix18 - ЛЕТ <br/>ОПЫТА image 5" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        13
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_5')} <br/><br />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/wagons_water.png" alt="TechMatrix18 - ВАГОНОВ <br/>ВОДЫ ВЫПИТО image 6" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        7
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_6')} <br/><br/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/days2.png" alt="TechMatrix18 - ДНЕЙ <br/>ПРОГРАММИРОВАНИЯ image 7" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        &gt;4680
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }}>
                                        {t('title_7')} <br/><br/>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="text-center">
                                        <img className="img-development" src="http://techmatrix18/img/icons/93percent_.png" alt="TechMatrix18 - ДОВОЛЬНЫХ <br/>КЛИЕНТОВ image 8" />
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'44px' }} >
                                        93%
                                    </div>
                                    <div className="text-center" style={{ color:'#46bf00', fontSize:'20px' }} >
                                        {t('title_8')}
                                    </div>
                                </div>
                            </div>

                            <br/><br/>

                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center text-design2">{t('development')}</h1> <br/>
                                    <p className="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('first_5') }} />
                                    </p>
                                    <br/><br/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="card-deck mb-3">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                                <Link to={`/${lng}/landing-page`} className="text-corporate">
                                                    <div>
                                                        <img src="http://techmatrix18/img/icons/lpage_.png" alt="TechMatrix18 - Лендинг пейдж image 9" title="Лендинг пейдж" className="img-development" />
                                                    </div>
                                                    <h2 className="site-sitio">{t('service_1')}</h2>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                                <Link to={`/${lng}/corporate-site`} className="text-corporate">
                                                    <div>
                                                        <img src="http://techmatrix18/img/icons/corporate_.png" alt="TechMatrix18 - Корпоративный сайт image 10" title="Корпоративный сайт" className="img-development" />
                                                    </div>
                                                    <h2 className="site-sitio">{t('service_2')}</h2>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                                <Link to={`/${lng}/api-service`} className="text-corporate">
                                                    <div>
                                                        <img src="http://techmatrix18/img/icons/api_.png" alt="TechMatrix18 - Веб сервис и API для моб. image 11" title="Веб сервис и API для моб." className="img-development" />
                                                    </div>
                                                    <h2 className="site-sitio">{t('service_3')}</h2>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-deck mb-3">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                            <Link to={`/${lng}/web-portal`} className="text-corporate">
                                                <div>
                                                    <img src="http://techmatrix18/img/icons/web_portal2.png" alt="TechMatrix18 - Web-портал image 12" title="Web-портал" className="img-development" />
                                                </div>
                                                <h2 className="site-sitio">{t('service_4')}</h2>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="text-center card mb-4 shadow-sm">
                                            <Link to={`/${lng}/site-system`} className="text-corporate">
                                                <div>
                                                    <img src="http://techmatrix18/img/icons/sysite.png" alt="TechMatrix18 - Сайт-система image 13" title="Сайт-система" className="img-development" />
                                                </div>
                                                <h2 className="site-sitio">{t('service_5')}</h2>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                            <Link to={`/${lng}/online-store`} className="text-corporate">
                                                <div>
                                                    <img src="http://techmatrix18/img/icons/store2.png" alt="TechMatrix18 - Интернет-магазин image 14" title="Интернет-магазин" className="img-development" />
                                                </div>
                                                <h2 className="site-sitio">{t('service_6')}</h2>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center text-design2">{t('how_work')}</h1> <br/>
                                </div>
                                <div className="col-md-5">
                                    <img src="http://techmatrix18/img/planshet2.png" className="img-fluid kromka" alt="." title="команда разработки сайтов TechMatrix18" />
                                    <br/><br/>
                                </div>
                                <div className="col-md-7">
                                    <h4>{t('title_f1')}:</h4><br/>
                                    <p className="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('descr_f1') }} />
                                    </p>
                                </div>
                                <div className="col-md-12">
                                    <p className="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('first_7') }} />
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <h1 className="text-center text-design2">{t('our_prices')}</h1> <br/>
                                </div>
                                <div className="col-md-12 text-left">
                                    <p className="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('descr_f2') }} /> <br/>
                                    </p>
                                    <p className="text-center">
                                        </p><h4 className="text-center">{t('we_work_expensive')}</h4>
                                    <p></p>
                                    <p className="text-left">
                                        <span dangerouslySetInnerHTML={{ __html: t('descr_f3') }} />&nbsp;
                                        <Link to={`/${lng}/our-contacts`} className="a-green">{t('go_link')}</Link>.
                                    </p> <br/><br/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card-deck mb-3 text-center">
                                        <div className="card mb-4 shadow-sm">
                                            <div className="card-header">
                                                <h4 className="my-0 font-weight-normal">{t('corporate_website')}</h4>
                                            </div>
                                            <div className="card-body">
                                                <h1 className="card-title pricing-card-title">{t('corp_site_price')}<small className="text-muted"></small></h1>
                                                <ul className="text-left list-unstyled mt-3 mb-4" style={{ textAlign:'left' }} >
                                                    <span dangerouslySetInnerHTML={{ __html: t('corp_site_descr') }} />
                                                </ul>
                                                <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-deck mb-3 text-center">
                                        <div className="card mb-4 shadow-sm">
                                            <div className="card-header">
                                                <h4 className="my-0 font-weight-normal">{t('online_store')}</h4>
                                            </div>
                                            <div className="card-body">
                                                <h1 className="card-title pricing-card-title">{t('online_store_price')}<small className="text-muted"></small></h1>
                                                <ul className="text-left list-unstyled mt-3 mb-4" style={{ textAlign:'left' }} >
                                                    <span dangerouslySetInnerHTML={{ __html: t('online_store_descr') }} />
                                                </ul>
                                                <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-deck mb-3 text-center">
                                        <div className="card mb-4 shadow-sm">
                                            <div className="card-header">
                                                <h4 className="my-0 font-weight-normal">{t('site_system')}</h4>
                                            </div>
                                            <div className="card-body">
                                                <h1 className="card-title pricing-card-title">{t('site_system_price')}<small className="text-muted"></small></h1>
                                                <ul className="text-left list-unstyled mt-3 mb-4" style={{ textAlign:'left' }} >
                                                    <span dangerouslySetInnerHTML={{ __html: t('site_system_descr') }} />
                                                </ul>
                                                <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="text-center text-design2">{t('reviews')}</h1>
                                    <p className="text-center">{t('reviews_title')}</p>
                                </div>
                            </div>

                            {/* 2. Передаем массив в проп `jobs` или `initialJobs` (в зависимости от выбранного вами варианта карусели) */}
                            <div style={{ marginTop: '40px' }}>
                                <RecommendCarousel jobs={mockRecommend} />
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

