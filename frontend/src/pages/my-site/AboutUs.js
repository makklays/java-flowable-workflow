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
                                <li className="breadcrumb-item" aria-current="page">{t('bread_about')}</li>
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
                                    <span dangerouslySetInnerHTML={{ __html: t('about_1') }} />  <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_2') }} />  <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_3') }} />  <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_4') }} />  <br/>
                                </p>
                            </div>
                            <div className="col-lg-5 col-md-5 col-sm-12 col-12">
                                <img src="http://techmatrix18/img/planshet2.png" alt="About techmatrix18" title="About TechMatrix18" className="img-fluid kromka" />
                            </div>

                            <div className="col-md-12">
                                <p className="text-left">
                                    <span dangerouslySetInnerHTML={{ __html: t('about_5') }} /> <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_6') }} /> <br/>
                                </p>
                            </div>

                            <div className="col-md-12">
                                <p className="text-left">
                                    <span dangerouslySetInnerHTML={{ __html: t('about_7') }} /> <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_8') }} /> <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_9') }} /> <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_10') }} /> <br/><br/>
                                    <span dangerouslySetInnerHTML={{ __html: t('about_11') }} /> <br/>
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
                                            {t('about_title_1')} <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }} >
                                            <div style={{ fontSize:'18px' }} >
                                                <i><span dangerouslySetInnerHTML={{ __html: t('text_1') }} /></i>
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
                                            {t('about_title_2')} <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }} >
                                                <i><span dangerouslySetInnerHTML={{ __html: t('text_2') }} /></i>
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
                                            {t('about_title_3')} <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }} >
                                                <i><span dangerouslySetInnerHTML={{ __html: t('text_3') }} /></i>
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
                                            {t('about_title_4')} <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }}>
                                                <i><span dangerouslySetInnerHTML={{ __html: t('text_4') }} /></i>
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
                                            {t('about_title_5')} <br/>
                                        </div>
                                        <div className="o-descr" style={{ color:'#000000', fontSize:'20px', fontWeight:'400' }}>
                                            <div style={{ fontSize:'18px' }}>
                                                <i><span dangerouslySetInnerHTML={{ __html: t('text_5') }} /></i>
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