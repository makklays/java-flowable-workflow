import React from 'react';
import { Navbar, Container, NavDropdown, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext'; // Подключаем контекст
import myLogo from '../assets/fl-logo1.png';

const Header = () => {
    const { t, i18n } = useTranslation();
    const { user: currentUser, role, logout } = useApp(); // Берем данные из контекста

    const changeLanguage = (lng) => i18n.changeLanguage(lng);
    const getFlagClass = (lang) => {

    if (lang === 'en') return 'fi fi-us';
        if (lang === 'ru') return 'fi fi-ru';
        return 'fi fi-es';
    };

    return (
        <Navbar bg="white" expand="lg" className="border-bottom px-3 shadow-sm">
            <div className="container">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                <img src={myLogo} width="30" height="30" className="me-2" alt="Logo" />
                <span className="fw-bold text-primary">CRM Flowable Ocean</span>
            </Navbar.Brand>

            <Navbar.Collapse id="top-nav">
                <Nav className="ms-auto align-items-center">
                    {/* Переключатель языков остался тут */}
                    <NavDropdown
                        title={
                            <span>
                                <span className={`${getFlagClass(i18n.language)} me-1`}></span>
                                {i18n.language?.toUpperCase().substring(0, 2)}
                            </span>
                        }
                        id="lang-drop"
                        align="end"
                        /* Прокидываем стиль напрямую в выпадающий список */
                        style={{ '--bs-dropdown-min-width': '100px' }}
                    >
                        {/* Эта обертка заставит пункты быть узкими */}
                        <div style={{ width: '100px', minWidth: '70px' }}>
                            <NavDropdown.Item onClick={() => changeLanguage('ru')} className="d-flex justify-content-center py-1 px-0 border-0">
                                <span className="fi fi-ru me-1"></span> RU
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeLanguage('en')} className="d-flex justify-content-center py-1 px-0 border-0">
                                <span className="fi fi-us me-1"></span> EN
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeLanguage('es')} className="d-flex justify-content-center py-1 px-0 border-0">
                                <span className="fi fi-es me-1"></span> ES
                            </NavDropdown.Item>
                        </div>
                    </NavDropdown>

                    {currentUser ? (
                        <div className="d-flex align-items-center ms-3">
                            <span className="me-3 fw-bold text-secondary">
                                <i className="bi bi-person-circle me-1"></i> {currentUser} [{role}]
                            </span>
                            <Button variant="outline-danger" size="sm" onClick={logout}>
                                {t('logout')}
                            </Button>
                        </div>
                    ) : (
                        <Button as={Link} to="/login" variant="primary" size="sm" className="ms-3">
                            {t('login')}
                        </Button>
                    )}
                </Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Header;

