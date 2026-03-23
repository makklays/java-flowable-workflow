import React from 'react';
// Импортируем всё из роутера одной строкой
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Стили и компоненты Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, NavDropdown, Button, Row, Col, Nav } from 'react-bootstrap';

// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faAddressBook, faHeartPulse, faUsers, faHandshake,
  faSitemap, faBriefcase, faUserShield, faUserGroup,
  faGear, faCircleInfo, faChartLine
} from '@fortawesome/free-solid-svg-icons';

// Ваши страницы
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

// 1. Импортируем файл (в начале файла App.js)
import myLogo from './assets/fl-logo1.png';

function Home() { return <h2>Главная страница</h2>; }

function App() {
  const isLoggedIn = false; // Состояние авторизации

  return (
    <Router>
      <Container fluid className="p-0"> {/* p-0 убирает лишние отступы по бокам меню */}
        {/* ВСТАВЛЯЕМ МЕНЮ СЮДА */}
        <Navbar style={{ backgroundColor: '#e7e7e7' }} expand="lg" className="border-bottom px-3">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={myLogo} width="30" height="30" className="me-2" alt="L" />
            <span className="fw-bold">CRM Flowable</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="top-nav" />
          <Navbar.Collapse id="top-nav">
            <Nav className="ms-auto align-items-center">
              <NavDropdown title="RU" id="lang-drop" align="end" className="me-3">
                  <NavDropdown.Item>RU</NavDropdown.Item>
                  <NavDropdown.Item>EN</NavDropdown.Item>
                  <NavDropdown.Item>ES</NavDropdown.Item>
              </NavDropdown>

              {isLoggedIn ? (
                  <Button variant="outline-dark" size="sm">Выход</Button>
              ) : (
                  <Button variant="primary" size="sm">Логин</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Row className="mx-0">
            {/* Боковая панель */}
            <Col xs={2} md={1} className="bg-light vh-100 border-end p-3">
                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/">
                        <FontAwesomeIcon icon={faHouse} className="me-2" /> Дашборд
                    </Nav.Link>

                    <Nav.Link as={Link} to="/contacts">
                        <FontAwesomeIcon icon={faAddressBook} className="me-2" /> Контакты
                    </Nav.Link>
                    <Nav.Link as={Link} to="/activities">
                        <FontAwesomeIcon icon={faHeartPulse} className="me-2" /> Активности
                    </Nav.Link>
                    <Nav.Link as={Link} to="/clients">
                        <FontAwesomeIcon icon={faUsers} className="me-2" /> Клиенты
                    </Nav.Link>
                    <Nav.Link as={Link} to="/deals">
                        <FontAwesomeIcon icon={faHandshake} className="me-2" /> Сделки
                    </Nav.Link>

                    <hr className="my-3 opacity-25" /> {/* Разделитель для визуальной группировки */}

                    <Nav.Link as={Link} to="/departments">
                        <FontAwesomeIcon icon={faSitemap} className="me-2" /> Отделы
                    </Nav.Link>
                    <Nav.Link as={Link} to="/positions">
                        <FontAwesomeIcon icon={faBriefcase} className="me-2" /> Должности
                    </Nav.Link>
                    <Nav.Link as={Link} to="/roles">
                        <FontAwesomeIcon icon={faUserShield} className="me-2" /> Роли
                    </Nav.Link>
                    <Nav.Link as={Link} to="/users">
                        <FontAwesomeIcon icon={faUserGroup} className="me-2" /> Пользователи
                    </Nav.Link>

                    <hr className="my-3 opacity-25" />

                    <Nav.Link as={Link} to="/trading">
                        <FontAwesomeIcon icon={faChartLine} className="me-2" /> Торговля
                    </Nav.Link>

                    <hr className="my-3 opacity-25" />

                    <Nav.Link as={Link} to="/settings">
                        <FontAwesomeIcon icon={faGear} className="me-2" /> Настройки
                    </Nav.Link>

                    <Nav.Link as={Link} to="/about">
                        <FontAwesomeIcon icon={faCircleInfo} className="me-2" /> О нас
                    </Nav.Link>
                </Nav>
            </Col>

            {/* Основной контент */}
            <Col xs={10} md={11} className="p-4">
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
                </Routes>
            </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;*/

