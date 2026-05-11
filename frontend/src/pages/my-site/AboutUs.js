import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faTasks, faSync, faChartLine, faHome, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
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
const AboutUs = () => {
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
                                <li className="breadcrumb-item" aria-current="page">О нас</li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-12">
                                <br />
                                <h1 className="text-center text-design2">
                                    {t('about_us')}
                                </h1>
                                <br />
                            </div>

                            <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                                <p className="text-left">
                                    <b>TechMatrix18</b> - команда людей, которая профессионально занимается компьютерным программированием и разработкой сайтов c 2007 года. Основываясь на нашем опыте и знаниях, мы можем гарантировать выполнение работы качественно и в сроки.                Успешно разработали и запрограммировали не один корпоративный сайт, интернет-магазин для среднего бизнеса, а также сложные веб-порталы для банков. <br/><br/>
                                    <b>Наша миссия</b> — помогать развитию успешного бизнеса в IT сфере. Мы хотели бы стать для Вас надежным партнером по предоставлению услуг разработки, развития бизнеса в интернете и сопровождению сайта. Мы достигаем своей цели, предлагая услуги, которые приводят к развитию и процветанию общества. <br/><br/>
                                    <b>Разработка сайта</b> для нас не является конечной целью. Это лишь инструмент, который должен помогать развитию бизнеса и увеличению прибыли заказчика. <br/><br/>
                                    Каждый специалист имеет более 10 лет опыта разработки или работы в своей сфере. <br />
                                </p>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                                <img src="http://techmatrix18/img/planshet2.png" alt="About techmatrix18" title="About TechMatrix18" className="img-fluid kromka" />
                            </div>

                            <div className="col-md-12">
                                <p className="text-left">
                                    TechMatrix18 любит новые знания, помогающие нам работать, а ещё любит разрабатывать и делать большие нестандартные проекты в IT сфере. Мы как Чип и Дейл, спешим прийти к Вам на помощь в реализации Ваших целей. А кто как не мы, лучше всех разбираемся в современных технологиях сайто строения? А кто как не мы, знаем, как легко выполнить заказ клиента так, чтобы он остался доволен результатом работы? Только мы! Разработка сайта с нами - легко и весело! <br/><br/>
                                    Наша разработка сайта уникальна тем, что мы не используем бесплатные коробочные решения, которые урезаны в функционале, дизайне и зачастую, не дают покупателю нужного результата, а об отсутствии модификации, он узнает со временем. Наша разработка является гибкой под Вас, начиная с ваших пожелай по функционалу, наполнению, дизайну и заканчивая тем, что сайт успешно размещен в интернете, в оговоренные сроки, а также имеет желаемый вами дизайн, функциональность и практичность. Нашим сайтом легко пользоваться, он понятен, имеет всё необходимое и желаемое, прост в управлении, защищен, практичен. <br/>
                                </p>
                            </div>

                            <div className="col-md-12">
                                <p className="text-left">
                                    <b>Наша география</b> — это весь мир. Мы разговариваем на нескольких языках и разрабатываем сайты, интернет магазины и сложные системы для бизнеса на современных технологиях. <br/><br/>
                                    Возвраст наших клиентов от 28 до 53 лет. Это собственник бизнеса, бизнесмен, бизнес леди, маркетолог и бренд менеджер, владелец производства, предприниматель из сегмента B2B и B2C, публичная личность. <br/><br/>
                                    Сайты заказывают для развития собственного бизнеса, для популяризации компании через интернет, сайт-система для автоматизация процесов на производстве или заводе с привлечением IT, сайт-система или сервис для ведения клинтов и их данных, сайт-система для логистики на предприятии, веб-сервис и API для мобильных приложений, запуск и вывод нового бренда, для увеличение продаж, поиск новых клиентов, социальный развлекательный или новостной портал, популяризация бренда или захват нового сегмента рынка, сайт-система для ведения данных в лаборатории, для увеличение прибыли из интернета. <br/><br/>
                                    Наши сайты: <b>в интернете</b>, <b>на предприятии</b>, <b>на заводе</b>, <b>в банке</b>, <b>в холдинге</b>, <b>в лаборатории</b>, <b>в компании</b>, <b>в корпорации</b>. <br/><br/>
                                    Преимущество сайтов в том, что сайты доступны для ваших клиентов как в рабочие дни, так и в любое другое время, представляя ваши услуги на корпоративном сайте или продавая ваши товары 24/7 в интернете тогда, когда офисы закрыты. <br/>
                                </p>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="o-item" style={{ marginTop:'40px' }} >
                                    <div className="o-circle" style={{ paddingBottom:'140px' }}>
                                        <div style={{ position:'relative', zIndex:'1' }} >
                                            <div className="o-cir" style={{ borderWidth:'2px', borderColor:'#267f00', background:'#267f00' }}></div>
                                            <div className="o-number" style={{ color:'#FFFFFF' }} >1</div>
                                        </div>
                                        <div style={{ position:'absolute', height:'100%', left:'50%', width:'2px', background:'#267f00' }}></div>
                                    </div>
                                    <div className="o-h" style={{ paddingBottom:'15px' }} >
                                        <div className="o-title" style={{ color:'#000000' }} >
                                            Дизайнер <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }} >
                                            <div style={{ fontSize:'18px' }} >
                                                <i>Удовлетворит ваши графические пожелания в цветах. Совместит современный дизайн с вашими желаниями. Рисует дизайн сайта для разработки.</i>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="o-item">
                                    <div className="o-circle" style={{ paddingBottom:'140px' }}>
                                        <div style={{ position:'relative', zIndex:'1' }}>
                                            <div className="o-cir" style={{ borderWidth:'2px', borderColor:'#267f00', background:'#267f00' }}></div>
                                            <div className="o-number" style={{ color:'#FFFFFF' }} >2</div>
                                        </div>
                                        <div style={{ position:'absolute', height:'100%', left:'50%', width:'2px', background:'#267f00' }}></div>
                                    </div>
                                    <div className="o-h" style={{ paddingBottom:'15px' }}>
                                        <div className="o-title" style={{ color:'#000000' }}>
                                            Frontend - разработчик <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }} >
                                                <i>Сверстает и разместит, согласно правил размещения html верстки с использованием графического дизайна для последующей разработки сайта.</i>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="o-item">
                                    <div className="o-circle" style={{ paddingBottom:'140px' }}>
                                        <div style={{ position:'relative', zIndex:'1' }}>
                                            <div className="o-cir" style={{ borderWidth:'2px', borderColor:'#267f00', background:'#267f00' }} ></div>
                                            <div className="o-number" style={{ color:'#FFFFFF' }}>3</div>
                                        </div>
                                        <div style={{ position:'absolute', height:'100%', left:'50%', width:'2px', background:'#267f00' }}></div>
                                    </div>
                                    <div className="o-h" style={{ paddingBottom:'15px' }}>
                                        <div className="o-title" style={{ color:'#000000' }}>
                                            Backend - разработчик <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }} >
                                                <i>Запрограммирует, разработает сайт и его сложную логику, натянет верстку, провалидирует данные и защитит сайт, сильная разработка - его конёк против хакерских атак.</i>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="o-item">
                                    <div className="o-circle" style={{ paddingBottom:'140px' }}>
                                        <div style={{ position:'relative', zIndex:'1' }}>
                                            <div className="o-cir" style={{ borderWidth:'2px', borderColor:'#267f00', background:'#267f00' }} ></div>
                                            <div className="o-number" style={{ color:'#FFFFFF' }}>4</div>
                                        </div>
                                        <div style={{ position:'absolute', height:'100%', left:'50%', width:'2px', background:'#267f00' }}></div>
                                    </div>
                                    <div className="o-h" style={{ paddingBottom:'15px' }} >
                                        <div className="o-title" style={{ color:'#000000' }} >
                                            Контент менеджер <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }}>
                                                <i>Заполнит сайт желанной информацией, продуктами, товарами, текстами или изображениями.</i>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="o-item">
                                    <div className="o-circle" style={{ paddingBottom:'140px' }}>
                                        <div style={{ position:'relative', zIndex:'1' }}>
                                            <div className="o-cir" style={{ borderWidth:'2px', borderColor:'#267f00', background:'#267f00' }}></div>
                                            <div className="o-number" style={{ color:'#FFFFFF' }}>5</div>
                                        </div>
                                    </div>
                                    <div className="o-h" style={{ paddingBottom:'40px' }}>
                                        <div className="o-title" style={{ color:'#000000' }}>
                                            Менеджер проекта <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }}>
                                                <i>Организует работу специалистов, взаимодействует с заказчиком. Знает, что делают разработчики и на каком этапе сейчас идет разработка сайта.</i>
                                                <br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group text-center">
                                    <Link to={`/${lng}/our-contacts`} className="btn btn-lg btn-block btn-success2">{t('order_development')}</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;