
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
          learn: "Обучение"
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
          learn: "Learn"
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
          learn: "Educación"
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

