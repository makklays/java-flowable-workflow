
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector) // Автоматически определяет язык и сохраняет его в localStorage
    .use(initReactI18next)
    .init({
        resources: {
            ru: {
                translation: {
                    dashboard: "Дашборд",
                    contacts: "Контакты",
                    activities: "Активности",
                    clients: "Клиенты",
                    deals: "Сделки",
                    departments: "Отделы",
                    positions: "Должности",
                    roles: "Роли",
                    users: "Пользователи",
                    trading: "Торговля",
                    settings: "Настройки",
                    about: "О нас",
                    logout: "Выход",
                    login: "Логин",
                    learn: "Обучение",
                    big: "Увеличить",
                    less: "Уменьшить",
                    symbols: "Символы",
                    candles: "Свечи",
                    view_candle: "Просмотр свечи",
                    view_symbol: "Просмотр символа",
                    close: "Закрыть",
                    go_back: "Назад",
                    upload_candles: "Загрузить свечи",
                    view_candles: "Просмотр свечей",
                    backtest: "Тесты",
                    tasks: "Мои Flowable задачи",
                    history: "История задач",
                    deleteSelected: "Удалить выбранное",
                    calendar: 'Календарь',
                }
            },
            en: {
                translation: {
                    dashboard: "Dashboard",
                    contacts: "Contacts",
                    activities: "Activities",
                    clients: "Clients",
                    deals: "Deals",
                    departments: "Departments",
                    positions: "Positions",
                    roles: "Roles",
                    users: "Users",
                    trading: "Trading",
                    settings: "Settings",
                    about: "About",
                    logout: "Logout",
                    login: "Login",
                    learn: "Learn",
                    big: "Increase",
                    less: "Decrease",
                    symbols: "Symbols",
                    candles: "Candles",
                    view_candle: "View Candle",
                    view_symbol: "View Symbol",
                    close: "Close",
                    go_back: "Go Back",
                    upload_candles: "Upload Candles",
                    view_candles: "View Candles",
                    backtest: "Backtest",
                    tasks: "My Flowable tasks",
                    history: "Tasks history",
                    deleteSelected: "Delete selected",
                    calendar: 'Calendar',
                }
            },
            es: {
                translation: {
                    dashboard: "Tablero",
                    contacts: "Contactos",
                    activities: "Actividades",
                    clients: "Clientes",
                    deals: "Tratos",
                    departments: "Departamentos",
                    positions: "Puestos",
                    roles: "Roles",
                    users: "Usuarios",
                    trading: "Comercio",
                    settings: "Ajustes",
                    about: "Nosotros",
                    logout: "Cerrar sesión",
                    login: "Acceder",
                    learn: "Educación",
                    big: "Aumentar",
                    less: "Disminuir",
                    symbols: "Símbolos",
                    candles: "Velas",
                    view_candle: "Ver Vela",
                    view_symbol: "Ver Símbolo",
                    close: "Cerrar",
                    go_back: "Regresar",
                    upload_candles: "Subir Velas",
                    view_candles: "Ver Velas",
                    backtest: "Backtest",
                    tasks: "Mis Flowable tareas",
                    history: "Historial de tareas",
                    deleteSelected: "Eliminar seleccionados",
                    calendar: 'Calendario',
                }
            }
        }, // Закрываем resources здесь
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage'] // Чтобы язык не сбрасывался после перезагрузки
        }
    });

export default i18n;

