import React from 'react';
import { Navbar, Container, NavDropdown, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext'; // Подключаем контекст
import myLogo from '../assets/img/fl-logo1.png';
import '../styles/main10.css';

const MySiteHeader = () => {
    const { t, i18n } = useTranslation();
    const { user: currentUser, role, logout } = useApp();

    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    const handleMobileMenuClick = () => {
        if (typeof window.openNav === 'function') {
            window.openNav();
        }
    };

    return (
        <Navbar expand="lg" className="navbar navbar-expand">
            {/* Логотип */}
            <Navbar.Brand as={Link} to="/" style={{ fontSize: '21px' }} className="navbar-brand">
                <img src="/logo50.png" height="30" className="d-inline-block align-top me-2" alt="Logo" />
                Tech Matrix 18
            </Navbar.Brand>

            {/* Мобильные контакты */}
            <span className="mob_menu_text" style={{ color: '#FFF' }}>
                <a href="tel:+380988705397" style={{ color: '#FFF', paddingRight: '20px', textDecoration: 'none' }}>+380 98 8705397</a>
                <a href="mailto:office@techmatrix18.com" style={{ color: '#FFF', textDecoration: 'none' }}>office@techmatrix18.com</a>
            </span>

            {/* Бургер-иконка (мобильное меню) */}
            <div className="mob_menu" onClick={handleMobileMenuClick}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Навигационная панель */}
            <Navbar.Collapse id="navbarResponsive" className="collapse navbar-collapse">
                <Nav className="navbar-nav mr-auto">
                    <Nav.Link as={Link} to="/about-us" className="nav-link dev-navbar-link px-3 active">
                        Nosotros
                    </Nav.Link>
                    <Nav.Link as={Link} to="/we-making" className="nav-link dev-navbar-link px-3">
                        ¿Como trabajamos?
                    </Nav.Link>
                    <Nav.Link as={Link} to="/development-site-store" className="nav-link dev-navbar-link px-3">
                        ¿Que estamos haciendo?
                    </Nav.Link>

                    {/* Выпадающее меню "Desarrollo" */}
                    <NavDropdown
                        title="Desarrollo"
                        id="desarrollo-dropdown"
                        className="nav-item dropdown dev-navbar-link"
                    >
                        <NavDropdown.Item as={Link} to="/landing-page" className="dropdown-item green-bk">
                            Página de aterrizaje
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/corporate-site" className="dropdown-item green-bk">
                            Sitio web corporativo
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/online-store" className="dropdown-item green-bk">
                            Tienda en línea
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/api-service" className="dropdown-item green-bk">
                            Servicio web y API para aplicación móvil
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/site-system" className="dropdown-item green-bk">
                            Sistema de sitio web
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/web-portal" className="dropdown-item green-bk">
                            Portal web
                        </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link as={Link} to="/articles" className="nav-link dev-navbar-link px-3">
                        Artículos
                    </Nav.Link>
                    <Nav.Link as={Link} to="/our-contacts" className="nav-link dev-navbar-link px-3">
                        Contactos
                    </Nav.Link>
                </Nav>

                {/* Выпадающее меню выбора языка */}
                <Nav className="navbar-nav">
                    <NavDropdown
                        title={<img src={`http://techmatrix18.com{i18n.language || 'es'}.png`} style={{ width: '21px' }} alt="Lang" />}
                        id="navbarDropdownMenuLink"
                        className="nav-item dropdown"
                        style={{ minWidth: '10px' }}
                    >
                        <NavDropdown.Item onClick={() => changeLanguage('ua')} className="dropdown-item green-bk">
                            <img src="img/flags/ua.png" className="mlimg" alt="UA" /> UA
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguage('es')} className="dropdown-item green-bk">
                            <img src="/img/flags/es.png" className="mlimg" alt="ES" /> ES
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguage('en')} className="dropdown-item green-bk">
                            <img src="/img/flags/en.png" className="mlimg" alt="EN" /> EN
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguage('ru')} className="dropdown-item green-bk">
                            <img src="./img/flags/ru.png" className="mlimg" alt="RU" /> RU
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeLanguage('ch')} className="dropdown-item green-bk">
                            <img src="./img/flags/ch.png" className="mlimg" alt="CH" /> CH
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                {/* Контакты справа */}
                <span className="navbar-text" style={{ color: '#FFF', marginLeft: '20px' }}>
                    <a href="tel:+380988705397" style={{ color: '#FFF', paddingRight: '20px', textDecoration: 'none' }}>+380 98 8705397</a>
                    <a href="mailto:office@techmatrix18.com" style={{ color: '#FFF', textDecoration: 'none' }}>office@techmatrix18.com</a>
                </span>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default MySiteHeader;

