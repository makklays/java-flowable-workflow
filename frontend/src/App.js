import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

// Стили и компоненты Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, NavDropdown, Button, Nav } from 'react-bootstrap';

// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faAddressBook, faHeartPulse, faUsers, faHandshake,
  faSitemap, faBriefcase, faUserShield, faUserGroup,
  faGear, faCircleInfo, faChartLine
}
from '@fortawesome/free-solid-svg-icons';

// Флаги для языков
import "flag-icons/css/flag-icons.min.css";

// Переводы текстов
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

// Импорты ваших страниц (убедитесь, что пути верны)
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Activities from './pages/Activities';
import Clients from './pages/Clients';
import Deals from './pages/Deals';
import Departments from './pages/Departments';
import Positions from './pages/Positions';
import Roles from './pages/Roles';
import Users from './pages/Users';
import Trading from './pages/Trading';
import Settings from './pages/Settings';
import About from './pages/About';

import myLogo from './assets/fl-logo1.png';

function App() {
  const { t, i18n } = useTranslation();
  const isLoggedIn = false;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Вспомогательный стиль для активных ссылок
  const activeLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? '#e9ecef' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    color: '#000'
  });

  // Вспомогательная функция для получения кода страны
  const getFlagClass = (lang) => {
    if (lang === 'en') return 'fi fi-us'; // Для английского обычно ставят флаг США или Британии (gb)
    if (lang === 'ru') return 'fi fi-ru';
    if (lang === 'es') return 'fi fi-es';
    return 'fi fi-ru'; // по умолчанию
  };

  return (
    <Router>
      {/* Главный контейнер на всю высоту экрана */}
      <div className="d-flex flex-column vh-100">

        {/* 1. Верхняя навигация (Navbar) */}
        <Navbar bg="white" expand="lg" className="border-bottom px-3 shadow-sm" style={{ zIndex: 1000 }}>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={myLogo} width="30" height="30" className="me-2" alt="Logo" />
            <span className="fw-bold text-primary">CRM Flowable</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="top-nav" />
          <Navbar.Collapse id="top-nav">
            <Nav className="ms-auto align-items-center">
              <NavDropdown
                title={
                  <span>
                    <span className={`${getFlagClass(i18n.language)} me-2`}></span>
                    {i18n.language?.toUpperCase() || 'RU'}
                  </span>
                }
                id="lang-drop"
                align="end"
                className="me-3"
              >
                <NavDropdown.Item onClick={() => changeLanguage('ru')}>
                  <span className="fi fi-ru me-2"></span> RU
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('en')}>
                  <span className="fi fi-us me-2"></span> EN
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('es')}>
                  <span className="fi fi-es me-2"></span> ES
                </NavDropdown.Item>
              </NavDropdown>

              {isLoggedIn ? (
                  <Button variant="outline-danger" size="sm">{t('logout')}</Button>
              ) : (
                  <Button variant="primary" size="sm">{t('login')}</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* 2. Основная рабочая область (Sidebar + Content) */}
        <div className="d-flex flex-grow-1 overflow-hidden">

          {/* ФИКСИРОВАННОЕ БОКОВОЕ МЕНЮ (260px) */}
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
                {t('management')}
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

              <hr className="my-2 opacity-25" />

              <Nav.Link as={NavLink} to="/departments" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                  <FontAwesomeIcon icon={faSitemap} className="me-3 text-secondary" /> {t('departments')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/positions" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                  <FontAwesomeIcon icon={faBriefcase} className="me-3 text-secondary" /> {t('positions')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/users" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                  <FontAwesomeIcon icon={faUserGroup} className="me-3 text-secondary" /> {t('users')}
              </Nav.Link>

              <hr className="my-2 opacity-25" />

              <Nav.Link as={NavLink} to="/trading" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                  <FontAwesomeIcon icon={faChartLine} className="me-3 text-secondary" /> {t('trading')}
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

          {/* ОБЛАСТЬ КОНТЕНТА (Занимает всё остальное место) */}
          <main className="flex-grow-1 p-4 bg-white shadow-inner" style={{ overflowY: 'auto' }}>
            <Container fluid>
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/clients" element={<Clients />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/positions" element={<Positions />} />
                  <Route path="/roles" element={<Roles />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/trading" element={<Trading />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="*" element={<div className="text-center mt-5"><h3>404: Page Not Found</h3></div>} />
              </Routes>
            </Container>
          </main>

        </div>
      </div>
    </Router>
  );
}

export default App;

