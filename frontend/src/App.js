import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Header from './components/Header';

// context для глобального состояния
import { AppProvider } from './context/AppContext';

// Стили и компоненты Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, NavDropdown, Button, Nav } from 'react-bootstrap';

// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faAddressBook, faHeartPulse, faUsers, faHandshake, faChartBar, faListUl, faCoins,
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

import Contacts from './pages/contacts/Contacts';
import ContactAdd from './pages/contacts/ContactAdd';
import ContactEdit from './pages/contacts/ContactEdit';
import ContactView from './pages/contacts/ContactView';

import Activities from './pages/activities/Activities';
import ActivityAdd from './pages/activities/ActivityAdd';
import ActivityEdit from './pages/activities/ActivityEdit';
import ActivityView from './pages/activities/ActivityView';

import Clients from './pages/clients/Clients';
import ClientAdd from './pages/clients/ClientAdd';
import ClientEdit from './pages/clients/ClientEdit';
import ClientView from './pages/clients/ClientView';

import Deals from './pages/deals/Deals';
import DealAdd from './pages/deals/DealAdd';
import DealEdit from './pages/deals/DealEdit';
import DealView from './pages/deals/DealView';

import Departments from './pages/departments/Departments';
import DepartmentAdd from './pages/departments/DepartmentAdd';
import DepartmentEdit from './pages/departments/DepartmentEdit';
import DepartmentView from './pages/departments/DepartmentView';

import Positions from './pages/positions/Positions';
import PositionAdd from './pages/positions/PositionAdd';
import PositionEdit from './pages/positions/PositionEdit';
import PositionView from './pages/positions/PositionView';

import Roles from './pages/roles/Roles';
import RoleAdd from './pages/roles/RoleAdd';
import RoleEdit from './pages/roles/RoleEdit';
import RoleView from './pages/roles/RoleView';

import TableView from './components/TableView';
import Users from './pages/users/Users';
import UserAdd from './pages/users/UserAdd';
import UserEdit from './pages/users/UserEdit';
import UserView from './pages/users/UserView';

import Symbols from './pages/symbols/Symbols';
import SymbolView from './pages/symbols/SymbolView';

import Candles from './pages/candles/Candles';
import CandleView from './pages/candles/CandleView';

import Trading from './pages/Trading';
import Backtest from './pages/Backtest';
import Settings from './pages/Settings';
import About from './pages/About';
import Login from './pages/Login';
import Learn from './pages/Learn';

import myLogo from './assets/fl-logo1.png';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  //const [currentUser, setCurrentUser] = useState(localStorage.getItem('userName'));

  // Функция выхода
  /*const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAuth');
      setCurrentUser(null);
  };*/

  // Вспомогательная функция для получения кода страны
  const getFlagClass = (lang) => {
    if (lang === 'en') return 'fi fi-us'; // Для английского обычно ставят флаг США или Британии (gb)
    if (lang === 'ru') return 'fi fi-ru';
    if (lang === 'es') return 'fi fi-es';
    return 'fi fi-ru'; // по умолчанию
  };

  // Следим за изменениями в localStorage
  /*useEffect(() => {
      const handleStorageChange = () => {
          setCurrentUser(localStorage.getItem('userName'));
      };
      // Слушаем событие входа (нужно будет вызвать его в Login.js)
      window.addEventListener('authChange', handleStorageChange);
      return () => {
          window.removeEventListener('authChange', handleStorageChange);
      };
  }, []);*/

  return (
    <>
    <ToastContainer theme="dark" position="top-right" autoClose={3000} />
    <AppProvider>
        <Router>
          {/* Главный контейнер на всю высоту экрана */}
          <div className="d-flex flex-column vh-100">

            <Header /> {/* Теперь Header внутри провайдера и видит контекст! */}

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
                      {t('symbols')}
                  </div>

                  <Nav.Link as={NavLink} to="/symbols" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                      <FontAwesomeIcon icon={faCoins} className="me-3 text-secondary" /> {t('symbols')}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/candles" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                      <FontAwesomeIcon icon={faChartLine} className="me-3 text-secondary" /> {t('candles')}
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
                  <Nav.Link as={NavLink} to="/backtest" style={activeLinkStyle} className="rounded px-3 py-2 text-dark">
                      <FontAwesomeIcon icon={faChartLine} className="me-3 text-secondary" /> {t('backtest')}
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
                      <Route path="/contacts/add" element={<ContactAdd />} />
                      <Route path="/contacts/:id/edit" element={<ContactEdit />} />
                      <Route path="/contacts/:id" element={<ContactView />} />

                      <Route path="/activities" element={<Activities />} />
                      <Route path="/activities/add" element={<ActivityAdd />} />
                      <Route path="/activities/:id/edit" element={<ActivityEdit />} />
                      <Route path="/activities/:id" element={<ActivityView />} />

                      <Route path="/clients" element={<Clients />} />
                      <Route path="/clients/add" element={<ClientAdd />} />
                      <Route path="/clients/:id/edit" element={<ClientEdit />} />
                      <Route path="/clients/:id" element={<ClientView />} />

                      <Route path="/deals" element={<Deals />} />
                      <Route path="/deals/add" element={<DealAdd />} />
                      <Route path="/deals/:id/edit" element={<DealEdit />} />
                      <Route path="/deals/:id" element={<DealView />} />

                      <Route path="/symbols" element={<Symbols />} />
                      <Route path="/symbols/:id" element={<SymbolView />} />

                      <Route path="/candles" element={<Candles />} />
                      <Route path="/candles/:id" element={<CandleView />} />

                      <Route path="/departments" element={<Departments />} />
                      <Route path="/departments/add" element={<DepartmentAdd />} />
                      <Route path="/departments/:id/edit" element={<DepartmentEdit />} />
                      <Route path="/departments/:id" element={<DepartmentView />} />

                      <Route path="/positions" element={<Positions />} />
                      <Route path="/positions/add" element={<PositionAdd />} />
                      <Route path="/positions/:id" element={<PositionView />} />
                      <Route path="/positions/:id/edit" element={<PositionEdit />} />

                      <Route path="/roles" element={<Roles />} />
                      <Route path="/roles/add" element={<RoleAdd />} />
                      <Route path="/roles/:id/edit" element={<RoleEdit />} />
                      <Route path="/roles/:id" element={<RoleView />} />

                      <Route path="/users" element={<Users />} />
                      <Route path="/users/add" element={<UserAdd />} />
                      <Route path="/users/:id/edit" element={<UserEdit />} />
                      <Route path="/users/:id" element={<UserView />} />

                      <Route path="/trading" element={<Trading />} />
                      <Route path="/backtest" element={<Backtest />} />
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

    </AppProvider>

    {/* Попробуйте переместить его В САМЫЙ НИЗ внутри div */}
    <div id="notifications">
        <ToastContainer theme="dark" />
    </div>

    </>
  );
}

export default App;

