import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';

// context для глобального состояния
import { AppProvider } from './context/AppContext';
import { PricesProvider } from './context/PricesContext';
import { SignalsProvider } from './context/SignalsContext';

import myLogo from './assets/img/fl-logo1.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Импорты ваших страниц (убедитесь, что пути верны)
import First from './pages/my-site/First';
import AboutUs from './pages/my-site/AboutUs';
import WeMaking from './pages/my-site/WeMaking';
import HowWork from './pages/my-site/HowWork';
import Articles from './pages/my-site/Articles';
import ArticleView from './pages/my-site/ArticleView';
import OurContacts from './pages/my-site/OurContacts';
import LandingPage from './pages/my-site/services/LandingPage';
import CorporateSite from './pages/my-site/services/CorporateSite';
import OnlineStore from './pages/my-site/services/OnlineStore';
import ApiService from './pages/my-site/services/ApiService';
import SiteSystem from './pages/my-site/services/SiteSystem';
import WebPortal from './pages/my-site/services/WebPortal';

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

import Tasks from './pages/flowables/Tasks';
import TaskFormPage from './pages/flowables/TaskFormPage';
import History from './pages/flowables/History';
import Calendar from './pages/flowables/Calendar';

import Trading from './pages/trading/Trading';
import TradeDetails from './pages/trading/TradeDetails';
import Grafics from './pages/trading/Grafics';

import Backtest from './pages/Backtest';
import Settings from './pages/Settings';
import About from './pages/About';
import Login from './pages/Login';
import Learn from './pages/Learn';
import Learn2 from './pages/Learn2';

// Pages for role: user_bank
import Accounts from './pages/bank/Accounts';
import Transfers from './pages/bank/Transfers';
import Payments from './pages/bank/Payments';
import Credits from './pages/bank/Credits';
import Applications from './pages/bank/Applications';
import Investments from './pages/bank/Investments';
import Forex from './pages/bank/Forex';
import StockMarket from './pages/bank/StockMarket';
import Advisor from './pages/bank/Advisor';

function App() {

    useEffect(() => {
        // Подключаемся к твоему новому Java WebSocket серверу
        const socket = new WebSocket("ws://localhost:8082/ws/signals");
        socket.onopen = () => {
            console.log("✅ WebSocket подключен к бэкенду");
            // Можно отправить тестовый тост, что связь установлена
            toast.success("Связь с торговым сервером установлена");
            playNotificationSound();
        };

        socket.onmessage = (event) => {
            //console.log("📩 Получено сообщение:", event.data);
            const data = JSON.parse(event.data);
            // Проверяем поле 'type', которое мы задали в Java SignalDto
            if (data.type === "SIGNAL") {
                // Используем поле 'label', куда мы в Java пишем текст сообщения
                /*toast.info("Связь с торговым сервером установлена 11111", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });*/
                //toast.success("Связь с торговым сервером установлена");
                toast.info(data.label, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                playNotificationSound();
            }
        };
        socket.onerror = (error) => {
            console.error("❌ Ошибка WebSocket:", error);
        };
        return () => socket.close();
    }, []);

    const showToast = (message) => {
        toast.info(message); // или toast.success, toast.error
    };

    const playNotificationSound = () => {
        const audio = new Audio('/sounds/magic.wav'); // Путь к файлу в папке public
        audio.play().catch(error => console.error("Ошибка воспроизведения звука:", error));
    };

    return (
        <>
            <ToastContainer theme="dark" position="top-right" autoClose={3000} />
            <AppProvider>
                <PricesProvider>
                    <SignalsProvider>
                        <Router>
                            <Routes>
                                {/* Главная обертка — MainLayout управляет дизайном на основе роли */}
                                <Route path="/:lng/" element={<MainLayout />}>
                                    {/* My Site */}
                                    <Route index element={<First />} />
                                    <Route path="about-us" element={<AboutUs />} />
                                    <Route path="we-making" element={<WeMaking />} />
                                    <Route path="development-site-store" element={<HowWork />} />
                                    <Route path="articles" element={<Articles />} />
                                    <Route path="articles/:slug" element={<ArticleView />} />
                                    <Route path="our-contacts" element={<OurContacts />} />

                                    <Route path="landing-page" element={<LandingPage />} />
                                    <Route path="corporate-site" element={<CorporateSite />} />
                                    <Route path="online-store" element={<OnlineStore />} />
                                    <Route path="api-service" element={<ApiService />} />
                                    <Route path="site-system" element={<SiteSystem />} />
                                    <Route path="web-portal" element={<WebPortal />} />

                                    <Route path="dashboard" element={<Dashboard />} />

                                    <Route path="contacts" element={<Contacts />} />
                                    <Route path="contacts/add" element={<ContactAdd />} />
                                    <Route path="contacts/:id/edit" element={<ContactEdit />} />
                                    <Route path="contacts/:id" element={<ContactView />} />

                                    <Route path="activities" element={<Activities />} />
                                    <Route path="activities/add" element={<ActivityAdd />} />
                                    <Route path="activities/:id/edit" element={<ActivityEdit />} />
                                    <Route path="activities/:id" element={<ActivityView />} />

                                    <Route path="clients" element={<Clients />} />
                                    <Route path="clients/add" element={<ClientAdd />} />
                                    <Route path="clients/:id/edit" element={<ClientEdit />} />
                                    <Route path="clients/:id" element={<ClientView />} />

                                    <Route path="deals" element={<Deals />} />
                                    <Route path="deals/add" element={<DealAdd />} />
                                    <Route path="deals/:id/edit" element={<DealEdit />} />
                                    <Route path="deals/:id" element={<DealView />} />

                                    <Route path="tasks" element={<Tasks />} />
                                    <Route path="tasks/:taskId/form" element={<TaskFormPage />} />
                                    <Route path="history" element={<History />} />
                                    <Route path="calendar" element={<Calendar />} />

                                    <Route path="symbols" element={<Symbols />} />
                                    <Route path="symbols/:id" element={<SymbolView />} />

                                    <Route path="candles" element={<Candles />} />
                                    <Route path="candles/:id" element={<CandleView />} />

                                    <Route path="departments" element={<Departments />} />
                                    <Route path="departments/add" element={<DepartmentAdd />} />
                                    <Route path="departments/:id/edit" element={<DepartmentEdit />} />
                                    <Route path="departments/:id" element={<DepartmentView />} />

                                    <Route path="positions" element={<Positions />} />
                                    <Route path="positions/add" element={<PositionAdd />} />
                                    <Route path="positions/:id" element={<PositionView />} />
                                    <Route path="positions/:id/edit" element={<PositionEdit />} />

                                    <Route path="roles" element={<Roles />} />
                                    <Route path="roles/add" element={<RoleAdd />} />
                                    <Route path="roles/:id/edit" element={<RoleEdit />} />
                                    <Route path="roles/:id" element={<RoleView />} />

                                    <Route path="users" element={<Users />} />
                                    <Route path="users/add" element={<UserAdd />} />
                                    <Route path="users/:id/edit" element={<UserEdit />} />
                                    <Route path="users/:id" element={<UserView />} />

                                    <Route path="trading" element={<Trading />} />
                                    <Route path="trade/:id" element={<TradeDetails />} />
                                    <Route path="backtest" element={<Backtest />} />
                                    <Route path="grafics" element={<Grafics />} />

                                    <Route path="settings" element={<Settings />} />
                                    <Route path="about" element={<About />} />
                                    <Route path="login" element={<Login />} />
                                    <Route path="learn" element={<Learn />} />
                                    <Route path="learn2" element={<Learn2 />} />

                                    {/* Pages for role: user_bank */}
                                    <Route path="bank/accounts" element={<Accounts />} />
                                    <Route path="bank/transfers" element={<Transfers />} />
                                    <Route path="bank/payments" element={<Payments />} />
                                    <Route path="bank/credits" element={<Credits />} />
                                    <Route path="bank/applications" element={<Applications />} />
                                    <Route path="bank/investments" element={<Investments />} />
                                    <Route path="bank/forex" element={<Forex />} />
                                    <Route path="bank/stock-market" element={<StockMarket />} />
                                    <Route path="bank/advisor" element={<Advisor />} />

                                    <Route path="*" element={<div className="text-center mt-5"><h3>404: Page Not Found</h3></div>} />
                                </Route>

                                <Route path="*" element={<Navigate to="/es" replace />} />
                            </Routes>
                        </Router>
                    </SignalsProvider>
                </PricesProvider>
            </AppProvider>
        </>
    );
}

export default App;

