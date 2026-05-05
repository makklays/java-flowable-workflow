import React, { useState, useEffect } from 'react';
import { Nav, Container } from 'react-bootstrap';
import ThemeToggle from '../components/ThemeToggle';

// Переводы текстов
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';

// context для глобального состояния
import { AppProvider, useApp } from '../context/AppContext';

// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse, faAddressBook, faHeartPulse, faUsers, faHandshake, faChartBar, faListUl, faCoins,
    faSitemap, faBriefcase, faUserShield, faUserGroup, faTasks, faHistory, faCalendarDays, faChartArea, faFlask,
    faGear, faCircleInfo, faChartLine, faLaptopCode, faDisplay, faWallet, faRightLeft, faCreditCard, faHandHoldingDollar,
    faFileInvoice, faChartPie, faArrowTrendUp, faUserTie
} from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "flag-icons/css/flag-icons.min.css";

// Флаги для языков
import Header from './Header';
import MySiteHeader from './MySiteHeader';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { role } = useApp();

    // 1. Логика активности раздела Trading
    const isTradingActive = location.pathname.startsWith('/trading') || location.pathname.startsWith('/trade');

    console.log('Current path:', location.pathname, 'Is Trading active?', isTradingActive);

    // 2. Стили активных ссылок
    const activeLinkStyle = ({ isActive }) => ({
        backgroundColor: isActive ? '#e9ecef' : 'transparent',
        fontWeight: isActive ? 'bold' : 'normal',
        color: '#000'
    });

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // Вспомогательная функция для получения кода страны
    const getFlagClass = (lang) => {
        if (lang === 'en') return 'fi fi-us'; // Для английского обычно ставят флаг США или Британии (gb)
        if (lang === 'ru') return 'fi fi-ru';
        if (lang === 'es') return 'fi fi-es';
        return 'fi fi-ru'; // по умолчанию
    };

    // --- КОМПОНЕНТ САЙДБАРА ДЛЯ АДМИНА ---
    const AdminSidebar = () => (
        <aside style={{
            width: '260px',
            minWidth: '260px',
            maxWidth: '260px',
            backgroundColor: '#f8f9fa',
            borderRight: '1px solid #dee2e6',
            overflowY: 'auto' // Прокрутка только внутри меню, если пунктов много
        }}>
            <Nav className="flex-column p-3 gap-1">
                <Nav.Link as={NavLink} to="/" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faHouse} className="me-3 text-secondary" /> {t('dashboard')}
                </Nav.Link>

                <div className="small text-uppercase text-muted fw-bold mt-3 mb-2 px-3" style={{ fontSize: '0.7rem' }}>
                    {t('crm')}
                </div>

                <Nav.Link as={NavLink} to="/contacts" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faAddressBook} className="me-3 text-secondary" /> {t('contacts')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/activities" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faHeartPulse} className="me-3 text-secondary" /> {t('activities')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/clients" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faUsers} className="me-3 text-secondary" /> {t('clients')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/deals" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faHandshake} className="me-3 text-secondary" /> {t('deals')}
                </Nav.Link>

                <div className="small text-uppercase text-muted fw-bold mt-3 mb-2 px-3" style={{ fontSize: '0.7rem' }}>
                    {t('trading')}
                </div>

                <Nav.Link as={NavLink} to="/trading" style={isTradingActive ? { backgroundColor: '#e9ecef', fontWeight: 'bold', color: '#000' } : {}} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faChartLine} className="me-3 text-secondary" /> {t('trading')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/backtest" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faFlask} className="me-3 text-secondary" /> {t('backtest')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/grafics" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faDisplay} className="me-3 text-secondary" /> {t('grafics')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/symbols" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faCoins} className="me-3 text-secondary" /> {t('symbols')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/candles" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faChartArea} className="me-3 text-secondary" /> {t('candles')}
                </Nav.Link>

                <div className="small text-uppercase text-muted fw-bold mt-3 mb-2 px-3" style={{ fontSize: '0.7rem' }}>
                    {t('Flowable')}
                </div>

                <Nav.Link as={NavLink} to="/tasks" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faTasks} className="me-3 text-secondary" /> {t('tasks')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/history" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faHistory} className="me-3 text-secondary" /> {t('history')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/calendar" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faCalendarDays} className="me-3 text-secondary" /> {t('calendar')}
                </Nav.Link>

                <div className="small text-uppercase text-muted fw-bold mt-3 mb-2 px-3" style={{ fontSize: '0.7rem' }}>
                    {t('company')}
                </div>

                <Nav.Link as={NavLink} to="/departments" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faSitemap} className="me-3 text-secondary" /> {t('departments')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/positions" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faBriefcase} className="me-3 text-secondary" /> {t('positions')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/roles" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faUserShield} className="me-3 text-secondary" /> {t('roles')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faUserGroup} className="me-3 text-secondary" /> {t('users')}
                </Nav.Link>

                <hr className="my-2 opacity-25" />

                <Nav.Link as={NavLink} to="/learn" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faLaptopCode} className="me-3 text-secondary" /> {t('learn') + ' counter' }
                </Nav.Link>
                <Nav.Link as={NavLink} to="/learn2" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faLaptopCode} className="me-3 text-secondary" /> {t('learn') + ' redux' }
                </Nav.Link>

                <hr className="my-auto opacity-25" />

                <Nav.Link as={NavLink} to="/settings" style={activeLinkStyle} className="rounded px-3 py-2 text-dark mt-3">
                    <FontAwesomeIcon icon={faGear} className="me-3 text-secondary" /> {t('settings')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/about" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faCircleInfo} className="me-3 text-secondary" /> {t('about')}
                </Nav.Link>
            </Nav>
        </aside>
    );

    // --- КОМПОНЕНТ САЙДБАРА ДЛЯ БАНКА ---
    const BankSidebar = () => (
        <aside style={{ width: '260px', minWidth: '260px', backgroundColor: '#e3f2fd', borderRight: '1px solid #dee2e6', overflowY: 'auto' }}>
            <Nav className="flex-column p-3 gap-1 bank">
                <div className="small text-uppercase text-primary fw-bold mt-2 mb-3 px-3"> {t('private_cabinet')}</div>
                <Nav.Link as={NavLink} to="/bank/accounts" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faWallet} className="me-3 text-primary" /> {t('my_accounts')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/bank/applications" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faFileInvoice} className="me-3 text-primary" /> {t('applications')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/tasks" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faFileInvoice} className="me-3 text-primary" /> {t('tasks')}
                </Nav.Link>

                <hr/>

                <div className="small text-uppercase text-primary fw-bold mt-2 mb-3 px-3"> {t('private_banking')}</div>
                <Nav.Link as={NavLink} to="/bank/transfers" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faRightLeft} className="me-3 text-primary" /> {t('perevodu')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/bank/payments" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faCreditCard} className="me-3 text-primary" /> {t('payments')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/bank/credits" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faHandHoldingDollar} className="me-3 text-primary" /> {t('credits')}
                </Nav.Link>

                <hr/>

                <div className="small text-uppercase text-primary fw-bold mt-2 mb-3 px-3"> {t('wealth_management')}</div>
                <Nav.Link as={NavLink} to="/bank/investments" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faChartPie} className="me-3 text-primary" /> {t('investments')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/bank/forex" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faCoins} className="me-3 text-primary" /> {t('forex')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/bank/stock-market" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="me-3 text-primary" /> {t('stock_market')}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/bank/advisor" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                    <FontAwesomeIcon icon={faUserTie} className="me-3 text-primary" /> {t('advisor')}
                </Nav.Link>
            </Nav>
        </aside>
    );

    const MySiteSidebar = () => (
        <aside></aside>
    );

    // Реестр всех доступных сайдбаров
    const sidebarRegistry = {
        'admin': <AdminSidebar />,
        'user_bank': <BankSidebar />,
        //'manager': <ManagerSidebar />,
        //'trader': <TraderSidebar />,
        default: <MySiteSidebar />
    };

    // Реестр тем оформления (классов для тега main)
    const themeRegistry = {
        'admin': 'bg-white admin-theme',
        'user_bank': 'bg-light bank-theme',
        //'manager': 'bg-info-subtle manager-theme',
        //'trader': 'bg-dark text-white trader-theme',
    };

    // Выбираем нужный сайдбар или ставим дефолтный (например, админский)
    const CurrentSidebar = sidebarRegistry[role] || <MySiteSidebar />;
    const currentTheme = themeRegistry[role] || 'bg-white';

    if (role == 'user_bank') {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                {/* 2. Убираем overflow-hidden, чтобы страница могла скроллиться целиком */}
                <div className="container d-flex flex-grow-1">

                    {/* Сайдбар (он будет растягиваться вместе с контентом) */}
                    {CurrentSidebar}

                    {/* 3. Убираем overflow-auto здесь */}
                    <main className={`flex-grow-1 p-4 ${currentTheme}`}>
                        <Container fluid>
                            <Outlet />
                        </Container>
                    </main>
                </div>

                {/* Футер теперь всегда будет в самом низу: либо прижат к краю экрана, либо после контента */}
                <footer className="border-top px-3 py-3 bg-white" style={{ boxShadow: '5px 5px 10px rgba(0,0,0,0.5)' }}>
                    <div className="container">Footer</div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <a href="/settings">
                                    <FontAwesomeIcon icon={faGear} className="me-3 text-secondary" /> {t('settings')}
                                </a>
                            </div>
                            <div className="col-md-6 text-end">
                                <ThemeToggle/>
                            </div>
                        </div>
                    </div>
                    <div className="container small text-muted">
                        © 2026 CRM Flowable Ocean. All rights reserved.
                    </div>
                </footer>
            </div>
        );
    } else if (role == 'admin') {
        return (
            <div className="d-flex flex-column vh-100">
                <Header />
                <div className="d-flex flex-grow-1 overflow-hidden">

                    {/* Просто вставляем переменную */}
                    {CurrentSidebar}

                    <main className={`flex-grow-1 p-4 overflow-auto ${currentTheme}`}>
                        <Container fluid>
                            <Outlet />
                        </Container>
                    </main>
                </div>
            </div>
        );
    } else {
        return (
            <div className="d-flex flex-column vh-100">
                <MySiteHeader />
                {/* Просто вставляем переменную */}
                {CurrentSidebar}

                <Outlet />
            </div>
        );
    }
};

export default MainLayout;

