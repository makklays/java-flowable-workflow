import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

// Стили и компоненты Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, NavDropdown, Button, Nav } from 'react-bootstrap';

// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faAddressBook, faHeartPulse, faUsers, faHandshake,
  faSitemap, faBriefcase, faUserShield, faUserGroup,
  faGear, faCircleInfo, faChartLine, faLaptopCode
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
import DepartmentAdd from './pages/DepartmentAdd';
import DepartmentEdit from './pages/DepartmentEdit';
import DepartmentView from './pages/DepartmentView';

import Positions from './pages/Positions';
import PositionAdd from './pages/PositionAdd';
import PositionEdit from './pages/PositionEdit';
import PositionView from './pages/PositionView';

import Roles from './pages/Roles';
import RoleAdd from './pages/RoleAdd';
import RoleEdit from './pages/RoleEdit';
import RoleView from './pages/RoleView';

import Users from './pages/Users';
import Trading from './pages/Trading';
import Settings from './pages/Settings';
import About from './pages/About';
import Login from './pages/Login';
import Learn from './pages/Learn';

import TableView from './components/TableView';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';
import UserView from './pages/UserView';

import myLogo from './assets/fl-logo1.png';

function App() {
  const { t, i18n } = useTranslation();
  //const isLoggedIn = false;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Вспомогательный стиль для активных ссылок
  const activeLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? '#e9ecef' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    color: '#000'
  });

  // Создаем состояние для пользователя
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('userName'));

  // Функция выхода
  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAuth');
      setCurrentUser(null);
  };

  // Вспомогательная функция для получения кода страны
  const getFlagClass = (lang) => {
    if (lang === 'en') return 'fi fi-us'; // Для английского обычно ставят флаг США или Британии (gb)
    if (lang === 'ru') return 'fi fi-ru';
    if (lang === 'es') return 'fi fi-es';
    return 'fi fi-ru'; // по умолчанию
  };

  // Следим за изменениями в localStorage
  useEffect(() => {
      const handleStorageChange = () => {
          setCurrentUser(localStorage.getItem('userName'));
      };
      // Слушаем событие входа (нужно будет вызвать его в Login.js)
      window.addEventListener('authChange', handleStorageChange);
      return () => {
          window.removeEventListener('authChange', handleStorageChange);
      };
  }, []);

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
                    <span className={`${getFlagClass(i18n.language)} me-1`}></span>
                    {i18n.language?.toUpperCase().substring(0, 2)}
                  </span>
                }
                id="lang-drop"
                align="end"
                /* Прокидываем стиль напрямую в выпадающий список */
                style={{ '--bs-dropdown-min-width': '50px' }}
              >
                {/* Эта обертка заставит пункты быть узкими */}
                <div style={{ width: '50px', minWidth: '70px' }}>
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
                /* Если залогинен — показываем имя и кнопку выхода */
                <div className="d-flex align-items-center ms-3">
                    <span className="me-3 fw-bold text-secondary">
                        <i className="bi bi-person-circle me-1"></i> {currentUser}
                    </span>
                    <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                        {t('logout')}
                    </Button>
                </div>
              ) : (
                /* Если не залогинен — показываем кнопку войти */
                <Button as={Link} to="/login" variant="primary" size="sm" className="ms-3">
                    {t('login')}
                </Button>
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

              <Nav.Link as={NavLink} to="/trading" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                  <FontAwesomeIcon icon={faChartLine} className="me-3 text-secondary" /> {t('trading')}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/learn" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                  <FontAwesomeIcon icon={faLaptopCode} className="me-3 text-secondary" /> {t('learn')}
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
                  <Route path="/departments/add" element={<DepartmentAdd />} />
                  <Route path="/departments/:id" element={<DepartmentView />} />
                  <Route path="/departments/:id/edit" element={<DepartmentEdit />} />

                  <Route path="/positions" element={<Positions />} />
                  <Route path="/positions/add" element={<PositionAdd />} />
                  <Route path="/positions/:id" element={<PositionView />} />
                  <Route path="/positions/:id/edit" element={<PositionEdit />} />

                  <Route path="/roles" element={<Roles />} />
                  <Route path="/roles/add" element={<RoleAdd />} />
                  <Route path="/roles/:id" element={<RoleView />} />
                  <Route path="/roles/:id/edit" element={<RoleEdit />} />

                  <Route path="/users" element={<Users />} />
                  <Route path="/users/add" element={<UserAdd />} />
                  <Route path="/users/:id" element={<UserView />} />
                  <Route path="/users/:id/edit" element={<UserEdit />} />

                  <Route path="/trading" element={<Trading />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/learn" element={<Learn />} />
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

