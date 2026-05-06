import React, { useState } from 'react';
import { Navbar, Container, NavDropdown, Button, Nav } from 'react-bootstrap';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext'; // Подключаем контекст
import myLogo from '../assets/img/fl-logo1.png';
import '../styles/main10.css';

const MySiteHeader = () => {
    const { t, i18n } = useTranslation();
    const { user: currentUser, role, logout } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    const { lng } = useParams(); // 'es', 'en', 'ua' и т.д.

    // Читаем текущий URL напрямую из роутера
    const activePath = location.pathname;

    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    const [expanded, setExpanded] = useState(false);

    const handleMobileMenuClick = () => {
        setExpanded(!expanded);
    };

    const closeMenu = () => {
        setExpanded(false);
    };

    // Проверяет, активна ли страница, убирая языковой префикс
    const isRouteActive = (path) => {
        return activePath === `/${lng}${path}` || activePath === path;
    };

    // Функция программного перехода
    const handleNavClick = (path) => {
        navigate(`/${lng}${path}`);
        closeMenu();
    };

    const changeLanguageAndRedirect = (newLng) => {
        // 1. Меняем язык в i18n
        i18n.changeLanguage(newLng);

        // 2. Получаем сегменты текущего URL
        const pathSegments = location.pathname.split('/').filter(Boolean);

        // 3. Если в URL уже есть языковой префикс, удаляем его
        const supportedLangs = ['es', 'en', 'ua', 'ru', 'ch'];
        if (supportedLangs.includes(pathSegments[0])) {
            pathSegments.shift();
        }

        // 4. Формируем новый путь и переходим по нему
        const newPath = `/${newLng}/${pathSegments}`; // .join('/')
        navigate(newPath);

        // 5. Закрываем мобильное меню
        closeMenu();
    };

    return (
        <Navbar
            expand="lg"
            expanded={expanded} // Связываем со стейтом
            className="navbar navbar-expand"
        >
            {/* Логотип */}
            <Navbar.Brand as={Link} to={`/${lng || 'es'}/`} onClick={closeMenu} style={{ fontSize:'21px', color:'#FFF' }} className="navbar-brand">
                <img src="/logo50.png" height="30" className="d-inline-block align-top me-2" alt="Logo" />
                Tech Matrix 18
            </Navbar.Brand>

            {/* Мобильные контакты */}
            <span className="mob_menu_text" style={{ color: '#FFF' }}>
                <a href="tel:+380988705397" style={{ color: '#FFF', paddingRight: '20px', textDecoration: 'none' }}>+380 98 8705397</a>
                <a href="mailto:office@techmatrix18.com" style={{ color: '#FFF', textDecoration: 'none' }}>office@techmatrix18.com</a>
            </span>

            {/* Бургер-иконка (мобильное меню) */}
            <div
                className={`mob_menu ${expanded ? 'open' : ''}`}
                onClick={handleMobileMenuClick}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Навигационная панель */}
            <Navbar.Collapse id="navbarResponsive" className="collapse navbar-collapse">
                <Nav className="navbar-nav ms-0">
                    <Nav.Link
                        as={Link}
                        to={`/${lng}/about-us`}
                        onClick={closeMenu}
                        className={`nav-link dev-navbar-link px-3 ${isRouteActive('/about-us') ? 'active' : ''}`}
                    >
                        Nosotros
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to={`/${lng}/we-making`}
                        onClick={closeMenu}
                        className={`nav-link dev-navbar-link px-3 ${isRouteActive('/we-making') ? 'active' : ''}`}
                    >
                        ¿Como trabajamos?
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to={`/${lng}/development-site-store`}
                        onClick={closeMenu}
                        className={`nav-link dev-navbar-link px-3 ${isRouteActive('/development-site-store') ? 'active' : ''}`}
                    >
                        ¿Que estamos haciendo?
                    </Nav.Link>

                    {/* Выпадающее меню "Desarrollo" */}
                    <NavDropdown
                        title="Desarrollo"
                        id="desarrollo-dropdown"
                        className={`nav-item dropdown dev-navbar-link ${
                            ['/landing-page', '/corporate-site', '/online-store', '/api-service', '/site-system', '/web-portal']
                            .some(path => isRouteActive(path)) ? 'active' : ''
                        }`}
                    >
                        <NavDropdown.Item
                            onClick={() => handleNavClick('/landing-page')}
                            className={`dropdown-item green-bk ${isRouteActive('/landing-page') ? 'active' : ''}`}
                        >
                            Página de aterrizaje
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            onClick={() => handleNavClick('/corporate-site')}
                            className={`dropdown-item green-bk ${isRouteActive('/corporate-site') ? 'active' : ''}`}
                        >
                            Sitio web corporativo
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            onClick={() => handleNavClick('/online-store')}
                            className={`dropdown-item green-bk ${isRouteActive('/online-store') ? 'active' : ''}`}
                        >
                            Tienda en línea
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            onClick={() => handleNavClick('/api-service')}
                            className={`dropdown-item green-bk ${isRouteActive('/api-service') ? 'active' : ''}`}
                        >
                            Servicio web y API para aplicación móvil
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            onClick={() => handleNavClick('/site-system')}
                            className={`dropdown-item green-bk ${isRouteActive('/site-system') ? 'active' : ''}`}
                        >
                            Sistema de sitio web
                        </NavDropdown.Item>

                        <NavDropdown.Item
                            onClick={() => handleNavClick('/web-portal')}
                            className={`dropdown-item green-bk ${isRouteActive('/web-portal') ? 'active' : ''}`}
                        >
                            Portal web
                        </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link
                        as={Link}
                        to={`/${lng}/articles`}
                        onClick={closeMenu}
                        className={`nav-link dev-navbar-link px-3 ${isRouteActive('/articles') ? 'active' : ''}`}
                    >
                        Artículos
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to={`/${lng}/our-contacts`}
                        onClick={closeMenu}
                        className={`nav-link dev-navbar-link px-3 ${isRouteActive('/our-contacts') ? 'active' : ''}`}
                    >
                        Contactos
                    </Nav.Link>
                </Nav>

                {/* Переключатель языка и контакты */}
                <Nav className="navbar-nav ms-auto d-lg-flex align-items-lg-center">
                    <NavDropdown
                        title={<img src={`/img/flags/${i18n.language || 'es'}.png`} style={{ width: '21px' }} alt="Lang" />}
                        id="navbarDropdownMenuLink"
                        className="nav-item dropdown"
                        style={{ minWidth: '10px' }}
                    >
                        <NavDropdown.Item onClick={() => changeLanguageAndRedirect('ua')} className="dropdown-item green-bk">
                            <img src="/img/flags/ua.png" className="mlimg" alt="UA" /> UA
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguageAndRedirect('es')} className="dropdown-item green-bk">
                            <img src="/img/flags/es.png" className="mlimg" alt="ES" /> ES
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguageAndRedirect('en')} className="dropdown-item green-bk">
                            <img src="/img/flags/en.png" className="mlimg" alt="EN" /> EN
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguageAndRedirect('ru')} className="dropdown-item green-bk">
                            <img src="/img/flags/ru.png" className="mlimg" alt="RU" /> RU
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguageAndRedirect('ch')} className="dropdown-item green-bk">
                            <img src="/img/flags/ch.png" className="mlimg" alt="CH" /> CH
                        </NavDropdown.Item>
                    </NavDropdown>

                    {/* Контакты десктопные */}
                    <span className="navbar-text ms-lg-3" style={{ color: '#FFF' }}>
                        <a href="tel:+380988705397" style={{ color: '#FFF', paddingRight: '20px', textDecoration: 'none' }}>+380 98 8705397</a>
                        <a href="mailto:office@techmatrix18.com" style={{ color: '#FFF', textDecoration: 'none' }}>office@techmatrix18.com</a>
                    </span>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MySiteHeader;

