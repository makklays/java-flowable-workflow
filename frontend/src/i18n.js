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
                    tasks: "Flowable задачи",
                    history: "История задач",
                    deleteSelected: "Удалить выбранное",
                    calendar: 'Календарь',
                    back: "Назад",
                    back_to_list: "Вернуться к списку",
                    trade_details: "Детали сделки",
                    close_trade: "Закрыть сделку",
                    edit_trade: "Редактировать сделку",
                    view_details: "Просмотреть детали",
                    grafics: "Графики",
                    perevodu: "Переводы",
                    payments: "Платежи",
                    credits: "Кредиты",
                    applications: "Заявки",
                    banking_services: "Банковские услуги",
                    private_banking: "Приват-банкинг",
                    wealth_management: "Управление капиталом",
                    investments: "Инвестиции",
                    stock_market: "Фондовый рынок",
                    advisor: "Фин. советник",
                    forex: "Валютный рынок",
                    private_cabinet: "Личный кабинет",
                    my_accounts: "Мои счета",
                    about_us: "Про нас",
                    first: "Первый",
                    development_site: "Разработка сайта",
                    slogan: "Мы TechMatrix18. Мы помогаем воплотить идею.",
                    how_work: "Как мы работаем?",
                    what_doing: "Что мы делаем?",
                    landing_page: "Лендинг пейдж",
                    development: "Разработка",
                    corporate_website: "Корпоративный сайт",
                    online_store: "Интернет-магазин",
                    service_api: "Веб сервис и API для моб.",
                    site_system: "Сайт-система",
                    web_portal: "Веб-портал",
                    articles: "Статьи",
                    contacts: "Контакты",
                    download_price: "Скачать прайс",
                    brief_online: "Заполнить бриф - онлайн",
                    brief: "Заполнить бриф",
                    team: "Команда",
                    price: "Прайс",
                    seo_words: "Число слов (SEO)",
                    first_1: `<b>TechMatrix18</b> — команда людей, которая профессионально занимается компьютерным программированием
                        и разработкой сайтов с 2007 года. Успешно разработали и спрограммировали не один корпоративный сайт,
                        интернет-магазин для среднего бизнеса, а также сложные веб-порталы для банков нашей страны.`,
                    first_2: `<b>Наша миссия</b> — помогать развитию успешного бизнеса в IT сфере. Мы хотели бы стать для Вас
                        надежным партнером по предоставлению услуг разработки, развития бизнеса в интернете и сопровождению
                        сайта. Мы достигаем своей цели, предлагая услуги, которые приводят к развитию и процветанию общества.`,
                    first_3: `Разработка сайта для нас не является конечной целью. Это лишь инструмент, который должен
                        помогать развитию бизнеса и увеличению Вашей прибыли. <br/><br/>
                        Мы любим жить и любим жизнь во всех её проявлениях. TechMatrix18 любит новые знания, помогающие нам работать,
                        а еще любит большие и интересные проекты в сфере IT, желая стать уверенным партнером для Вас и Вашего бизнеса.`,
                    who_we_are: "Кто мы?",
                    first_4: `<b>Наша география</b> — это весь мир. Мы разговариваем на нескольких языках и разрабатываем сайты, интернет магазины
                        и сложные системы для бизнеса на современных технологиях. <br /><br />
                        Возвраст наших клиентов от 28 до 53 лет. Это собственник бизнеса, бизнесмен, бизнес леди, маркетолог и бренд менеджер,
                        владелец производства, предприниматель из сегмента B2B и B2C, публичная личность. <br/><br/>
                        Сайты заказывают для развития собственного бизнеса, для популяризации компании через интернет, сайт-система для
                        автоматизация процесов на производстве или заводе с привлечением IT, сайт-система или сервис для ведения клинтов
                        и их данных, сайт-система для логистики на предприятии, запуск и вывод нового бренда, для увеличение продаж, поиск
                        новых клиентов, социальный развлекательный или новостной портал, популяризация бренда или захват нового сегмента рынка,
                        веб-сервис и API для мобильных приложений, сайт-система для ведения данных в лаборатории, для увеличение прибыли из интернета. <br/><br/>
                        Наши сайты: в интернете, на предприятии, на заводе, в банке, в холдинге, в лаборатории, в компании, в корпорации. <br /><br />
                        Преимущество сайтов в том, что сайты доступны для ваших клиентов как в рабочие дни, так и в любое другое время,
                        представляя ваши услуги на корпоративном сайте или продавая ваши товары 24/7 в интернете тогда, когда офисы закрыты. <br/>`,
                    why_us: "Почему мы?",
                    a_ewe: "А ещё",
                    title_1: "МНОГО ЛЕТ ОПЫТА",
                    title_2: "СЛАЖЕННАЯ КОМАНДА",
                    title_3: "ВНЕДРЯЕМ НОВЫЕ ТЕХНОЛОГИИ",
                    title_4: "НАРАБОТАННЫЕ КЛИЕНТЫ",
                    title_5: "ЛЕТ ОПЫТА",
                    title_6: "ВАГОНОВ ВОДЫ ВЫПИТО",
                    title_7: "ДНЕЙ ПРОГРАММИРОВАНИЯ",
                    title_8: "ДОВОЛЬНЫХ КЛИЕНТОВ",
                    first_5: `Да, мы разрабатываем и делаем сайты. Мы пишем код. Делаем большие и не очень сайты. Сайты, которые нам легко
                        поддерживать, ибо мы знаем свой код и знаем, что делаем. Мы не используем бесплатные CMS, которые не предназначены
                        для модификации и масштабирования в последующем, потому они и бесплатны, а разработка на них стоит дешевле и быстрее.
                        Вам нужно разработать сайт под ключ и запустить его в интернете? Это к нам! Мы готовы разработать сайт для Вас и
                        запустить его в интернете. Наш вектор направления — это корпоративный сайт, интернет магазин и сайт-система. Мы гордимся
                        тем, что мы делаем и разрабатываем сайты. Мы гордимся результатами своей роботы и нашими клиентами. Мы хотим, чтобы
                        и Вы смогли получить желаемый результат, поработав с нами.`,
                    service_1: "Лендинг пейдж",
                    service_2: "Корпоративный сайт",
                    service_3: "Веб сервис и API для моб.",
                    service_4: "Web-портал",
                    service_5: "Сайт-система",
                    service_6: "Интернет-магазин",
                    how_work: "Как мы работаем?",
                    title_f1: "Разработка состоит из нескольких этапов",
                    descr_f1: `1. постановка задачи; <br/>
                        2. подготовка технического задания и заключение договора с клиентом; <br/>
                        3. разработка макета, согласование с заказчиком; <br/>
                        4. верстка шаблона, установка системы управления сайтом, настройка хостинга, демо сайта; <br/>
                        5. разработка необходимого функционала, тестирование; <br/>
                        6. наполнение контентом; <br/>
                        7. закрытие заказа после принятия клиентом;`,
                    first_7: `Используем разработку, основываясь на современных и передовых технологиях. Facebook, Amazon - все
                        эти платформы написаны на языке программирования PHP с самыми прочными стандартами безопастности и стабильностью кода. <br/><br/>
                        Мы выбрали этот язык и его фреймворки Yii2, Laravel, когда они ещё не ворвались в ТОП самых используемых на планете.
                        Это позволяет нам разрабатывать в TechMatrix18 уникальное предложение для Вас и быть гибким в реализации Ваших необычных пожеланий. <br/><br/>`,
                    our_prices: "Наши цены",
                    descr_f2: `- Мы не делаем шаблонных решений (если Вы этого не попросите) <br/>
                        - Мы не делаем сайты "под копирку" (если Вы этого не попросите) <br/>
                        - Мы не делаем "тут работы на пару часов" <br/>
                        - Мы не делаем так, что бы нравилось Вам. Мы делаем так, чтобы нравилось Ваших клиентам <br/>
                        - Мы добиваемся поставленных целей (не всегда удачно, но главное же что добиваемся) <br/>`,
                    we_work_expensive: "Мы делаем дорого? Делаем!",
                    descr_f3: `Хотя всё это — оплата за наш труд, и если Вы считаете что труд должен оплачиваться - мы сработаемся.
                        Ещё мы умеем заговаривать язык, поэтому если Вы всё ещё хотите узнать цены,`,
                    go_link: "перейдите по ссылке",
                    reviews: "Отзывы",
                    reviews_title: "Наши клиенты говорят о нас",
                    order_development: "Заказать разработку",
                    corp_site_descr: `<li>✔ Срок выполнения 10-20 дней</li>
                        <li>✔ Определение и наполнение основных разделов</li>
                        <li>✔ Дизайн в корпоративных цветах</li>
                        <li>✔ 5 функциональных модулей</li>
                        <li>✔ Адаптивность под все устройства</li>
                        <li>✔ Базовая SEO-оптимизация</li>
                        <li>✔ Laravel</li>
                        <li>✔ Система управления сайтом</li>
                        <li>✔ Обучение работы с сайтом</li>`,
                    online_store_descr: `<li>✔ Срок выполнения 2-3 недели</li>
                        <li>✔ Наполнение 100 позиций</li>
                        <li>✔ Уникальный дизайн</li>
                        <li>✔ Возможность онлайн-оплаты</li>
                        <li>✔ Адаптивность под все устройства</li>
                        <li>✔ Базовая SEO-оптимизация</li>
                        <li>✔ 10000 знаков уникального текста</li>
                        <li>✔ Laravel</li>
                        <li>✔ Обучение работы с сайтом</li>
                        <li>✔ Подключение внешних сервисов</li>
                        <li>✔ Установка https</li>
                        <li>✔ Доменное имя в подарок</li>`,
                    site_system_descr: `<li>✔ Срок выполнения от 2 месяцев</li>
                        <li>✔ Наполнение 500 позиций/списков</li>
                        <li>✔ Разработка основных составляющих</li>
                        <li>✔ Уникальный дизайн</li>
                        <li>✔ Разработка логических частей</li>
                        <li>✔ Адаптивность под все устройства</li>
                        <li>✔ Базовая SEO-оптимизация</li>
                        <li>✔ Laravel</li>
                        <li>✔ Внутренняя отправка email</li>
                        <li>✔ Подключение внешних сервисов</li>
                        <li>✔ Система управления сайтом</li>
                        <li>✔ Обучение работы с сайтом</li>
                        <li>✔ Установка https</li>
                        <li>✔ Доменное имя в подарок</li>`,
                    corp_site_price: "от 25000 грн",
                    site_system_price: "от 85000 грн",
                    online_store_price: "от 50000 грн",

                    about_1: `<b>TechMatrix18</b> - команда людей, которая профессионально занимается компьютерным
                        программированием и разработкой сайтов c 2007 года. Основываясь на нашем опыте и знаниях, мы можем
                        гарантировать выполнение работы качественно и в сроки. Успешно разработали и запрограммировали не один
                        корпоративный сайт, интернет-магазин для среднего бизнеса, а также сложные веб-порталы для банков.`,
                    about_2: `<b>Наша миссия</b> — помогать развитию успешного бизнеса в IT сфере. Мы хотели бы стать для
                        Вас надежным партнером по предоставлению услуг разработки, развития бизнеса в интернете и сопровождению
                        сайта. Мы достигаем своей цели, предлагая услуги, которые приводят к развитию и процветанию общества.`,
                    about_3: `<b>Разработка сайта</b> для нас не является конечной целью. Это лишь инструмент, который
                        должен помогать развитию бизнеса и увеличению прибыли заказчика.`,
                    about_4: `Каждый специалист имеет более 10 лет опыта разработки или работы в своей сфере.`,
                    about_5: `TechMatrix18 любит новые знания, помогающие нам работать, а ещё любит разрабатывать и делать
                        большие нестандартные проекты в IT сфере. Мы как Чип и Дейл, спешим прийти к Вам на помощь в реализации
                        Ваших целей. А кто как не мы, лучше всех разбираемся в современных технологиях сайто строения?
                        А кто как не мы, знаем, как легко выполнить заказ клиента так, чтобы он остался доволен результатом
                        работы? Только мы! Разработка сайта с нами - легко и весело!`,
                    about_6: `Наша разработка сайта уникальна тем, что мы не используем бесплатные коробочные решения, которые
                        урезаны в функционале, дизайне и зачастую, не дают покупателю нужного результата, а об отсутствии
                        модификации, он узнает со временем. Наша разработка является гибкой под Вас, начиная с ваших пожелай
                        по функционалу, наполнению, дизайну и заканчивая тем, что сайт успешно размещен в интернете, в оговоренные
                        сроки, а также имеет желаемый вами дизайн, функциональность и практичность. Нашим сайтом легко пользоваться,
                        он понятен, имеет всё необходимое и желаемое, прост в управлении, защищен, практичен.`,
                    about_7: `<b>Наша география</b> — это весь мир. Мы разговариваем на нескольких языках и разрабатываем сайты,
                        интернет магазины и сложные системы для бизнеса на современных технологиях.`,
                    about_8: `Возвраст наших клиентов от 28 до 53 лет. Это собственник бизнеса, бизнесмен, бизнес леди,
                        маркетолог и бренд менеджер, владелец производства, предприниматель из сегмента B2B и B2C, публичная личность.`,
                    about_9: `Сайты заказывают для развития собственного бизнеса, для популяризации компании через интернет,
                        сайт-система для автоматизация процесов на производстве или заводе с привлечением IT, сайт-система
                        или сервис для ведения клинтов и их данных, сайт-система для логистики на предприятии, веб-сервис и
                        API для мобильных приложений, запуск и вывод нового бренда, для увеличение продаж, поиск новых клиентов,
                        социальный развлекательный или новостной портал, популяризация бренда или захват нового сегмента рынка,
                        сайт-система для ведения данных в лаборатории, для увеличение прибыли из интернета.`,
                    about_10: `Наши сайты: <b>в интернете</b>, <b>на предприятии</b>, <b>на заводе</b>, <b>в банке</b>,
                        <b>в холдинге</b>, <b>в лаборатории</b>, <b>в компании</b>, <b>в корпорации</b>.`,
                    about_11: `Преимущество сайтов в том, что сайты доступны для ваших клиентов как в рабочие дни, так и в
                        любое другое время, представляя ваши услуги на корпоративном сайте или продавая ваши товары 24/7 в
                        интернете тогда, когда офисы закрыты.`,

                    about_title_1: `Дизайнер`,
                    text_1: `Удовлетворит ваши графические пожелания в цветах. Совместит современный дизайн с вашими желаниями. Рисует дизайн сайта для разработки.`,
                    about_title_2: `Frontend - разработчик`,
                    text_2: `Сверстает и разместит, согласно правил размещения html верстки с использованием графического дизайна для последующей разработки сайта.`,
                    about_title_3: `Backend - разработчик`,
                    text_3: `Запрограммирует, разработает сайт и его сложную логику, натянет верстку, провалидирует данные и защитит сайт, сильная разработка - его конёк против хакерских атак.`,
                    about_title_4: `Контент менеджер`,
                    text_4: `Заполнит сайт желанной информацией, продуктами, товарами, текстами или изображениями.`,
                    about_title_5: `Менеджер проекта`,
                    text_5: `Организует работу специалистов, взаимодействует с заказчиком. Знает, что делают разработчики и на каком этапе сейчас идет разработка сайта.`,

                    bread_about: `О нас`,

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
                    back: "Back",
                    back_to_list: "Back to list",
                    trade_details: "Trade Details",
                    close_trade: "Close Trade",
                    edit_trade: "Edit Trade",
                    view_details: "View Details",
                    grafics: "Grafics",
                    perevodu: "Transfers",
                    payments: "Payments",
                    credits: "Loans",
                    applications: "Applications",
                    banking_services: "Banking Services",
                    private_banking: "Private Banking",
                    wealth_management: "Wealth Management",
                    investments: "Investments",
                    stock_market: "Stock Market",
                    advisor: "Financial Advisor",
                    forex: "Forex", // Или "Foreign Exchange"
                    private_cabinet: "Private Cabinet",
                    my_accounts: "My Accounts",
                    about_us: "About us",
                    first: "First",
                    development_site: "Site development",
                    slogan: "We are TechMatrix18. We help to realize the idea.",
                    how_work: "How we work?",
                    what_doing: "What are we doing?",
                    landing_page: "Landing page",
                    development: "Development",
                    corporate_website: "Corporate website",
                    online_store: "Online store",
                    service_api: "Web service and API for mobile.",
                    site_system: "Site system",
                    web_portal: "Web portal",
                    articles: "Articles",
                    contacts: "Contacts",
                    download_price: "Download price",
                    brief_online: "Complete a brief online",
                    brief: "Complete a brief",
                    team: "Team",
                    price: "Price",
                    seo_words: "Word Count (SEO)",
                    first_1: `<b>TechMatrix18</b> — is a team of people who have been professionally involved in computer
                        programming and website development since 2007. We have successfully developed and programmed numerous
                        corporate websites, an online store for medium-sized businesses, and complex web portals for banks across our country.`,
                    first_2: `<b>Our mission</b> is to help develop successful businesses in the IT sector. We would like to become
                        your reliable partner in providing development services, online business development, and website maintenance.
                        We achieve this goal by offering services that contribute to the development and prosperity of society.`,
                    first_3: `Website development isn't our end goal. It's simply a tool that should
                        help grow your business and increase your profits. <br/><br/>
                        We love life and embrace it in all its forms. TechMatrix18 embraces new knowledge that helps us work,
                        and we also embrace large and interesting IT projects, wanting to become a confident partner for you and your business.`,
                    who_we_are: "Who we are?",
                    first_4: `<b>Our geography</b> — is the whole world. We speak several languages ​​and develop websites, online stores, and complex business systems using modern technologies. <br /><br />
                        Our clients range in age from 28 to 53. They include business owners, entrepreneurs, businesswoman, marketers and brand managers,
                        manufacturer owners, B2B and B2C entrepreneurs, and public figures. <br/><br/>
                        Websites are ordered for business development, for online promotion of a company, a website system for
                        automation of processes in a production or factory using IT, a website system or service for managing clients
                        and their data, a website system for enterprise logistics, launching and introducing a new brand, increasing sales, finding new clients, a social entertainment or news portal, promoting a brand or capturing a new market segment,
                        a web service and API for mobile applications, a website system for data management in a laboratory, or increasing online profits. <br/><br/>
                        Our websites: online, at your enterprise, factory, bank, holding company, laboratory, company, or corporation. <br /><br />
                        The advantage of websites is that they are available to your clients both on business days and at any other time,
                        presenting your services on your corporate website or selling your products 24/7 online, even when your offices are closed. <br/>`,
                    why_us: "Why us?",
                    a_ewe: "And also",
                    title_1: "MANY YEARS OF EXPERIENCE",
                    title_2: "A WELL-COORDINATED TEAM",
                    title_3: "IMPLEMENTING NEW TECHNOLOGIES",
                    title_4: "DEVELOPED CLIENTS",
                    title_5: "YEARS OF EXPERIENCE",
                    title_6: "VANS OF WATER DRUNK",
                    title_7: "DAYS OF PROGRAMMING",
                    title_8: "SATISFIED CLIENTS",
                    first_5: `Yes, we develop and build websites. We write code. We build websites, large and small. Websites that are easy
                        for us to maintain because we know our code and know what we're doing. We don't use free CMSs, which aren't designed
                        for future modification and scaling. That's why they're free, and development with them is cheaper and faster.
                        Do you need a turnkey website developed and launched online? That's for us! We're ready to develop a website for you and
                        launch it online. Our focus is corporate websites, online stores, and website systems. We're proud of our work and the results
                        we deliver, and we're proud of our clients. We want you to achieve the results you desire by working with us.`,
                    service_1: "Landing page",
                    service_2: "Corporate website",
                    service_3: "Web service and API for mobile.",
                    service_4: "Web portal",
                    service_5: "Site system",
                    service_6: "Online store",
                    how_work: "How we work?",
                    title_f1: "The development consists of several stages",
                    descr_f1: `1. Setting the task; <br/>
                        2. Preparing the technical specifications and concluding the contract with the client; <br/>
                        3. Developing the layout, coordinating with the client; <br/>
                        4. Template layout, installing the content management system, setting up the hosting, and creating a demo site; <br/>
                        5. Developing the necessary functionality and testing; <br/>
                        6. Filling the content; <br/>
                        7. Closing the order after acceptance by the client;`,
                    first_7: `We use development based on modern and cutting-edge technologies. Facebook, Amazon—all of these platforms are written in PHP,
                        a programming language with the strongest security standards and code stability. <br/><br/>
                        We chose this language and its frameworks, Yii2 and Laravel, before they became the most widely used on the planet.
                        This allows us at TechMatrix18 to develop a unique offering for you and be flexible in implementing your unique requests. <br/><br/>`,
                    our_prices: "Our prices",
                    descr_f2: `- We don't create template solutions (unless you ask us to) <br/>
                        - We don't create carbon-copy websites (unless you ask us to) <br/>
                        - We don't do "just a couple of hours' work" <br/>
                        - We don't do things just to please you. We do things just to please your clients <br/>
                        - We achieve our goals (not always successfully, but the main thing is that we achieve them) <br/>`,
                    we_work_expensive: "We work expensive? We do!",
                    descr_f3: `Although all this is payment for our work, and if you believe that work should be paid, we can work together.
                        We also know how to talk the talk, so if you still want to know the prices,`,
                    go_link: "go to the link",
                    reviews: "Reviews",
                    reviews_title: "Our clients say about us",
                    order_development: "Order development",
                    corp_site_descr: `<li>✔ Completion time: 10-20 days</li>
                        <li>✔ Definition and content of key sections</li>
                        <li>✔ Design in corporate colors</li>
                        <li>✔ 5 functional modules</li>
                        <li>✔ Adaptability for all devices</li>
                        <li>✔ Basic SEO optimization</li>
                        <li>✔ Laravel</li>
                        <li>✔ Content management system</li>
                        <li>✔ Website management training</li>`,
                    online_store_descr: `<li>✔ Completion time: 2-3 weeks</li>
                         <li>✔ 100 positions filled</li>
                         <li>✔ Unique design</li>
                         <li>✔ Online payment option</li>
                         <li>✔ Adaptability for all devices</li>
                         <li>✔ Basic SEO optimization</li>
                         <li>✔ 10,000 characters of unique text</li>
                         <li>✔ Laravel</li>
                         <li>✔ Website training</li>
                         <li>✔ Connecting external services</li>
                         <li>✔ HTTPS installation</li>
                         <li>✔ Free domain name</li>`,
                    site_system_descr: `<li>✔ Completion time from 2 months</li>
                        <li>✔ Filling 500 positions/lists</li>
                        <li>✔ Development of main components</li>
                        <li>✔ Unique design</li>
                        <li>✔ Development of logical sections</li>
                        <li>✔ Adaptability for all devices</li>
                        <li>✔ Basic SEO optimization</li>
                        <li>✔ Laravel</li>
                        <li>✔ Internal email sending</li>
                        <li>✔ Connecting external services</li>
                        <li>✔ Content management system</li>
                        <li>✔ Website training</li>
                        <li>✔ HTTPS installation</li>
                        <li>✔ Free domain name</li>`,
                    corp_site_price: "from 900 $",
                    site_system_price: "from 1855 $",
                    online_store_price: "from 3150 $",

                    about_1: `<b>TechMatrix18</b> - a team of people who have been professionally engaged in computer
                        programming and website development since 2007. Based on our experience and knowledge, we can
                        guarantee the quality and timely completion of work. We have successfully developed and programmed
                        more than one corporate website, an online store for medium-sized businesses, as well as complex
                        web portals for banks.`,
                    about_2: `<b>Our mission</b> — to help develop a successful business in the IT sector. We would like
                        to become a reliable partner for you in providing services for development, business development
                        on the Internet and website maintenance. We achieve our goal by offering services that lead to
                        the development and advancement of society.`,
                    about_3: `<b>Website development</b> is not the ultimate goal for us. It is just a tool that should
                        help develop the business and increase the customer's profit.`,
                    about_4: `Each specialist has more than 10 years of experience in development or work in their field.`,
                    about_5: `TechMatrix18 loves new knowledge that helps us work, and we also love developing and implementing large,
                        custom projects in the IT field. We're like Chip and Dale, eager to help you achieve your goals. Who
                        better than us than we are, more versed in modern website building technologies?
                        And who better than us knows how to easily fulfill a client's order so they're satisfied with the results?
                        Only us! Website development with us is easy and fun!`,
                    about_6: `Our website development is unique in that we don't use free, out-of-the-box solutions, which
                        are limited in functionality and design and often fail to deliver the desired result. The lack of
                        modifications will become apparent over time. Our development is flexible, tailored to your needs,
                        from your wishes for functionality, content, and design to ensuring the website is successfully
                        launched online within the agreed-upon timeframe, and has the design, functionality, and usability
                        you desire. Our website is easy to use, it's intuitive, has everything you need and want, is easy
                        to manage, secure, and practical.`,

                    about_7: `<b>Our geography</b> — is the entire world. We speak several languages and develop websites,
                        online stores, and complex business systems using modern technologies.`,
                    about_8: `Our clients range in age from 28 to 53. They include business owners, entrepreneurs, businesswoman,
                        marketers and brand managers, manufacturing owners, B2B and B2C entrepreneurs, and public figures.`,
                    about_9: `Websites are ordered for business development, for online promotion of a company,
                        a website system for automating processes in a production or factory using IT, a website system or
                        service for managing clients and their data, a website system for enterprise logistics, a web service and
                        API for mobile applications, for launching and launching a new brand, for increasing sales, finding new clients,
                        a social entertainment or news portal, for brand promotion or capturing a new market segment,
                        a website system for data management in a laboratory, for increasing online profits.`,
                    about_10: `Our websites: <b>on the Internet</b>, <b>at the enterprise</b>, <b>at the factory</b>, <b>at the bank</b>,
                        <b>in the holding</b>, <b>in the laboratory</b>, <b>in the company</b>, <b>in the corporation</b>.`,
                    about_11: `The advantage of websites is that they are available to your customers both during business days
                        and at any other time, presenting your services on a corporate website or selling your products 24/7
                        online when your offices are closed.`,

                    about_title_1: `Designer`,
                    text_1: `We'll meet your graphic color requirements. We'll combine modern design with your wishes. We'll also create website designs for development.`,
                    about_title_2: `Frontend developer`,
                    text_2: `Layout and placement, in accordance with the rules for placement of HTML layout using graphic design for subsequent website development.`,
                    about_title_3: `Backend developer`,
                    text_3: `He will program and develop the website and its complex logic, create the layout, validate the data, and protect the website. Strong development is his strong point against hacker attacks.`,
                    about_title_4: `Content manager`,
                    text_4: `Fill the site with desired information, products, goods, texts or images.`,
                    about_title_5: `Project Manager`,
                    text_5: `Manages the work of specialists and interacts with the client. Knows what the developers are doing and what stage the website is currently at.`,

                    bread_about: `About Us`,

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
                    back: "Volver",
                    back_to_list: "Volver a la lista",
                    trade_details: "Detalles de la operación",
                    close_trade: "Cerrar operación",
                    edit_trade: "Editar operación",
                    view_details: "Ver detalles",
                    grafics: "Gráficos",
                    perevodu: "Transferencias",
                    payments: "Pagos",
                    credits: "Créditos",
                    applications: "Solicitudes",
                    banking_services: "Servicios bancarios",
                    private_banking: "Banca privada",
                    wealth_management: "Gestión de patrimonio",
                    investments: "Inversiones",
                    stock_market: "Mercado de valores",
                    advisor: "Asesor financiero",
                    forex: "Forex",
                    private_cabinet: "Gabinete privado",
                    my_accounts: "Mis cuentas",
                    about_us: "Sobre nosotros",
                    first: "Primero",
                    development_site: "Desarrollo del sitio",
                    slogan: "Somos TechMatrix18. Ayudamos a realizar la idea.",
                    how_work: "¿Cómo trabajamos?",
                    what_doing: "¿Qué estamos haciendo?",
                    landing_page: "Página de destino",
                    development: "Desarrollo",
                    corporate_website: "Sitio web corporativo",
                    online_store: "Tienda en línea",
                    service_api: "Servicio web y API para móvil",
                    site_system: "Sistema del sitio",
                    web_portal: "Portal web",
                    articles: "Artículos",
                    contacts: "Contactos",
                    download_price: "Descargar precio",
                    brief_online: "Completar un breve en línea",
                    brief: "Completar un breve",
                    team: "Equipo",
                    price: "Precio",
                    seo_words: "Recuento de palabras (SEO)",
                    first_1: `es un equipo de profesionales que se dedica a la programación informática y al desarrollo web desde 2007.
                        Hemos desarrollado y programado con éxito numerosos sitios web corporativos, una tienda online para empresas
                        medianas y portales web complejos para bancos de todo el país.`,
                    first_2: `<b>Nuestra misión</b> — es ayudar a desarrollar negocios exitosos en el sector de las TI. Queremos
                        convertirnos en su socio de confianza para la prestación de servicios de desarrollo, desarrollo de negocios en línea y mantenimiento de sitios web.
                        Logramos este objetivo ofreciendo servicios que contribuyen al desarrollo y la prosperidad de la sociedad.`,
                    first_3: `El desarrollo web no es nuestro objetivo final. Es simplemente una herramienta que debería
                        ayudar a que su negocio crezca y aumente sus ganancias. <br/><br/>
                        Amamos la vida y la disfrutamos en todas sus formas. En TechMatrix18, adoptamos nuevos conocimientos que nos ayudan a trabajar,
                        y también nos entusiasman los proyectos de TI grandes e interesantes, con el objetivo de convertirnos en un socio de confianza para usted y su negocio.`,
                    who_we_are: "¿Quiénes somos?",
                    first_4: `<b>Nuestra geografía</b> — Este es el mundo entero. Hablamos varios idiomas y desarrollamos sitios web, tiendas online
                        y sistemas empresariales complejos utilizando tecnologías modernas. <br /><br />
                        Nuestros clientes tienen edades comprendidas entre los 28 y los 53 años. Entre ellos se incluyen propietarios de negocios, emprendedores,
                        empresarias, profesionales del marketing y gestores de marca, propietarios de fábricas, emprendedores B2B y B2C, y figuras públicas. <br/><br/>
                        Los sitios web se contratan para el desarrollo empresarial, la promoción online de una empresa, la automatización de procesos en una
                        planta de producción o fábrica mediante TI, un sistema o servicio web para la gestión de clientes y sus datos, un sistema web para
                        la logística empresarial, el lanzamiento e introducción de una nueva marca, el aumento de las ventas y la captación de nuevos clientes,
                        un portal de noticias o entretenimiento social, la promoción de una marca o la captación de un nuevo segmento de mercado, un servicio
                        web y una API para aplicaciones móviles, un sistema web para la gestión de datos en un laboratorio y el aumento de los beneficios online. <br/><br/>
                        Nuestros sitios web: en Internet, en una empresa, en una fábrica, en un banco, en un grupo empresarial, en un laboratorio, en una compañía, en una corporación. <br /><br />
                        La ventaja de los sitios web es que son accesibles para tus clientes tanto durante el horario comercial como en otros momentos, presentando tus servicios en un sitio
                        web corporativo o vendiendo tus productos en línea las 24 horas del día, los 7 días de la semana, cuando tus oficinas están cerradas. <br/>`,
                    why_us: "¿Por qué nosotros?",
                    a_ewe: "Y también",
                    title_1: "MUCHOS AÑOS DE EXPERIENCIA",
                    title_2: "UN EQUIPO BIEN COORDINADO",
                    title_3: "IMPLEMENTANDO NUEVAS TECNOLOGÍAS",
                    title_4: "CLIENTES DESARROLLADOS",
                    title_5: "AÑOS DE EXPERIENCIA",
                    title_6: "VANS DE AGUA BEBIDA",
                    title_7: "DÍAS DE PROGRAMACIÓN",
                    title_8: "CLIENTES SATISFECHOS",
                    first_5: `Sí, desarrollamos y creamos sitios web. Escribimos código. Creamos sitios web de todos los tamaños. Sitios web
                        fáciles de mantener porque conocemos nuestro código y sabemos lo que hacemos. No utilizamos CMS gratuitos, que no están
                        diseñados para futuras modificaciones ni escalabilidad, por eso son gratuitos, y el desarrollo con ellos es más económico y rápido.
                        ¿Necesita un sitio web llave en mano desarrollado y lanzado en línea? ¡Eso es para nosotros! Estamos listos para desarrollar
                        un sitio web para usted y lanzarlo en línea. Nos especializamos en sitios web corporativos, tiendas en línea y sistemas web.
                        Nos enorgullece nuestro trabajo y los resultados que ofrecemos, y nos enorgullecemos de nuestros clientes.
                        Queremos que logre los resultados que desea trabajando con nosotros.`,
                    service_1: "Página de destino",
                    service_2: "Sitio web corporativo",
                    service_3: "Servicio web y API para móv.",
                    service_4: "Portal web",
                    service_5: "Sistema del sitio",
                    service_6: "Tienda en línea",
                    how_work: "¿Cómo trabajamos?",
                    title_f1: "El desarrollo consta de varias etapas",
                    descr_f1: `1. Definición de la tarea; <br/>
                        2. Preparación de las especificaciones técnicas y firma del contrato con el cliente; <br/>
                        3. Desarrollo del diseño y coordinación con el cliente; <br/>
                        4. Diseño de la plantilla, instalación del sistema de gestión de contenidos, configuración del alojamiento web y creación de un sitio de demostración; <br/>
                        5. Desarrollo de la funcionalidad necesaria y pruebas; <br/>
                        6. Inclusión del contenido; <br/>
                        7. Cierre del pedido tras la aceptación del cliente;`,
                    first_7: `Utilizamos tecnologías de desarrollo modernas y de vanguardia. Facebook, Amazon y otras plataformas están escritas en PHP,
                        un lenguaje de programación con los más altos estándares de seguridad y estabilidad de código. <br/><br/>
                        Elegimos este lenguaje y sus frameworks, Yii2 y Laravel, antes de que se convirtieran en los más utilizados a nivel mundial.
                        Esto nos permite en TechMatrix18 desarrollar una solución única para usted y adaptarnos con flexibilidad a sus necesidades específicas. <br/><br/>`,
                    our_prices: "Nuestros precios",
                    descr_f2: `- No creamos plantillas (a menos que nos lo pidas) <br/>
                        - No creamos sitios web idénticos (a menos que nos lo pidas) <br/>
                        - No hacemos "solo un par de horas de trabajo" <br/>
                        - No trabajamos para complacerte a ti, sino para complacer a tus clientes <br/>
                        - Alcanzamos nuestros objetivos (no siempre con éxito, pero lo importante es que los alcanzamos) <br/>`,
                    we_work_expensive: "¿Lo estamos haciendo de forma costosa? ¡Sí!",
                    descr_f3: `Aunque todo esto es el pago por nuestro trabajo, y si usted cree que el trabajo debe ser remunerado, podemos colaborar.
                        También sabemos cómo negociar, así que si aún desea saber los precios,`,
                    go_link: "sigue el enlace",
                    reviews: "Reseñas",
                    reviews_title: "Nuestros clientes hablan de nosotros",
                    order_development: "Ordenar desarrollo",
                    corp_site_descr: `<li>✔ Tiempo de entrega: 10-20 días</li>
                        <li>✔ Definición y contenido de las secciones clave</li>
                        <li>✔ Diseño con los colores corporativos</li>
                        <li>✔ 5 módulos funcionales</li>
                        <li>✔ Adaptabilidad a todos los dispositivos</li>
                        <li>✔ Optimización SEO básica</li>
                        <li>✔ Laravel</li>
                        <li>✔ Sistema de gestión de contenidos</li>
                        <li>✔ Capacitación en gestión de sitios web</li>`,
                    online_store_descr: `<li>✔ Tiempo de entrega: 2-3 semanas</li>
                        <li>✔ 100 puestos cubiertos</li>
                        <li>✔ Diseño único</li>
                        <li>✔ Opción de pago online</li>
                        <li>✔ Adaptable a todos los dispositivos</li>
                        <li>✔ Optimización SEO básica</li>
                        <li>✔ 10 000 caracteres de texto único</li>
                        <li>✔ Laravel</li>
                        <li>✔ Formación en desarrollo web</li>
                        <li>✔ Conexión de servicios externos</li>
                        <li>✔ Instalación HTTPS</li>
                        <li>✔ Dominio gratuito</li>`,
                    site_system_descr: `<li>✔ Plazo de entrega: a partir de 2 meses</li>
                        <li>✔ Relleno de 500 puestos/listas</li>
                        <li>✔ Desarrollo de componentes principales</li>
                        <li>✔ Diseño único</li>
                        <li>✔ Desarrollo de secciones lógicas</li>
                        <li>✔ Adaptabilidad a todos los dispositivos</li>
                        <li>✔ Optimización SEO básica</li>
                        <li>✔ Laravel</li>
                        <li>✔ Envío de correos electrónicos internos</li>
                        <li>✔ Conexión de servicios externos</li>
                        <li>✔ Sistema de gestión de contenidos</li>
                        <li>✔ Formación en el sitio web</li>
                        <li>✔ Instalación de HTTPS</li>
                        <li>✔ Dominio gratuito</li>`,
                    corp_site_price: "de 850 €",
                    site_system_price: "de 1700 €",
                    online_store_price: "de 2850 €",

                    about_1: `<b>TechMatrix18</b> — somos un equipo de profesionales dedicados a la programación informática
                        y al desarrollo web desde 2007. Gracias a nuestra experiencia y conocimientos, garantizamos la calidad
                        y la entrega puntual de nuestros proyectos. Hemos desarrollado y programado con éxito varios sitios
                        web corporativos, tiendas online para medianas empresas y portales web complejos para bancos.`,
                    about_2: `<b>Nuestra misión</b> — para ayudarle a desarrollar un negocio exitoso en el sector de las TI.
                        Nos gustaría convertirnos en su socio de confianza, ofreciéndole servicios de desarrollo, gestión
                        empresarial en internet y mantenimiento de sitios web. Logramos nuestro objetivo brindando servicios
                        que impulsan el desarrollo y el progreso de la sociedad.`,
                    about_3: `<b>Desarrollo de sitios web</b> - no es nuestro objetivo final. Es simplemente una herramienta
                        que debería ayudar a desarrollar el negocio y aumentar las ganancias del cliente.`,
                    about_4: `Cada especialista cuenta con más de 10 años de experiencia en desarrollo o trabajo en su campo.`,
                    about_5: `En TechMatrix18 nos apasiona adquirir nuevos conocimientos que nos ayuden a trabajar, y también nos encanta desarrollar e implementar proyectos personalizados de gran envergadura en el sector de las TI. Somos como Chip y Dale, deseosos de ayudarte a alcanzar tus objetivos. ¿Quién mejor que nosotros para dominar las tecnologías modernas de creación de sitios web?
                        ¿Y quién mejor que nosotros para cumplir fácilmente con los pedidos de nuestros clientes y garantizar su satisfacción?
                        ¡Solo nosotros! ¡Desarrollar tu sitio web con nosotros es fácil y divertido!`,
                    about_6: `Nuestro desarrollo web es único porque no utilizamos soluciones gratuitas preconfiguradas, las cuales
                        tienen funcionalidades y diseños limitados y a menudo no ofrecen el resultado deseado. La falta de
                        modificaciones se hará evidente con el tiempo. Nuestro desarrollo es flexible y se adapta a sus necesidades,
                        desde sus preferencias en cuanto a funcionalidad, contenido y diseño, hasta garantizar que el sitio
                        web se lance con éxito en el plazo acordado y cuente con el diseño, la funcionalidad y la usabilidad
                        que usted desea. Nuestro sitio web es fácil de usar, intuitivo, tiene todo lo que necesita y desea,
                        es fácil de administrar, seguro y práctico.`,

                    about_7: `<b>Nuestra geografía</b> — es el mundo entero. Hablamos varios idiomas y desarrollamos sitios web,
                        tiendas online y sistemas empresariales complejos utilizando tecnologías modernas.`,
                    about_8: `Nuestros clientes tienen edades comprendidas entre los 28 y los 53 años. Entre ellos se incluyen
                        propietarios de negocios, emprendedores, empresarias, profesionales del marketing y gestores de marca,
                        propietarios de fábricas, emprendedores B2B y B2C, y figuras públicas.`,
                    about_9: `Los sitios web se contratan para el desarrollo de negocios, la promoción en línea de una empresa,
                        un sistema web para automatizar procesos en una planta de producción o fábrica mediante TI, un sistema o
                        servicio web para la gestión de clientes y sus datos, un sistema web para la logística empresarial, un servicio web y
                        API para aplicaciones móviles, para el lanzamiento de una nueva marca, para aumentar las ventas, para encontrar nuevos clientes,
                        un portal de noticias o entretenimiento social, para la promoción de la marca o para captar un nuevo segmento de mercado,
                        un sistema web para la gestión de datos en un laboratorio, para aumentar las ganancias en línea.`,
                    about_10: `Nuestros sitios web: <b>en Internet</b>, <b>en la empresa</b>, <b>en la fábrica</b>, <b>en el banco</b>,
                        <b>en la posesión</b>, <b>en el laboratorio</b>, <b>en la empresa</b>, <b>en la corporación</b>.`,
                    about_11: `La ventaja de los sitios web es que están disponibles para sus clientes tanto durante los días
                        laborables como en cualquier otro momento, presentando sus servicios en un sitio web corporativo o vendiendo
                        sus productos en línea las 24 horas del día, los 7 días de la semana, cuando sus oficinas están cerradas.`,

                    about_title_1: `Diseñador`,
                    text_1: `Satisfaremos sus requisitos de color gráfico. Combinaremos el diseño moderno con sus preferencias. También crearemos diseños web para su desarrollo.`,
                    about_title_2: `Desarrollador frontend`,
                    text_2: `Diseño y disposición, de acuerdo con las reglas para la colocación del diseño HTML utilizando diseño gráfico para el posterior desarrollo del sitio web.`,
                    about_title_3: `Desarrollador backend`,
                    text_3: `Él programará y desarrollará el sitio web y su lógica compleja, creará el diseño, validará los datos y protegerá el sitio. Su sólida capacidad de desarrollo es su punto fuerte frente a los ataques de hackers.`,
                    about_title_4: `Gestor de contenidos`,
                    text_4: `Rellene el sitio con la información, productos, artículos, textos o imágenes que desee.`,
                    about_title_5: `Gerente de proyecto`,
                    text_5: `Gestiona el trabajo de los especialistas e interactúa con el cliente. Sabe qué están haciendo los desarrolladores y en qué fase se encuentra el sitio web.`,

                    bread_about: `Sobre nosotros`,

                }
            },
            ua: {
                translation: {
                    dashboard: "Дашборд",
                    contacts: "Контакти",
                    activities: "Активності",
                    clients: "Клієнти",
                    deals: "Угоди",
                    departments: "Відділи",
                    positions: "Посади",
                    roles: "Ролі",
                    users: "Користувачі",
                    trading: "Торгівля",
                    settings: "Налаштування",
                    about: "Про нас",
                    logout: "Вихід",
                    login: "Логін",
                    learn: "Навчання",
                    big: "Збільшити",
                    less: "Зменшити",
                    symbols: "Символи",
                    candles: "Свічки",
                    view_candle: "Перегляд свічки",
                    view_symbol: "Перегляд символу",
                    close: "Закрити",
                    go_back: "Назад",
                    upload_candles: "Завантажити свічки",
                    view_candles: "Перегляд свічок",
                    backtest: "Тести",
                    tasks: "Flowable завдання",
                    history: "Історія завдань",
                    deleteSelected: "Видалити обране",
                    calendar: 'Календар',
                    back: "Назад",
                    back_to_list: "Повернутися до списку",
                    trade_details: "Деталі угоди",
                    close_trade: "Закрити угоду",
                    edit_trade: "Редагувати угоду",
                    view_details: "Переглянути деталі",
                    grafics: "Графіки",
                    perevodu: "Перекази",
                    payments: "Платежі",
                    credits: "Кредити",
                    applications: "Заявки",
                    banking_services: "Банківські послуги",
                    private_banking: "Приват-банкінг",
                    wealth_management: "Управління капіталом",
                    investments: "Інвестиції",
                    stock_market: "Фондовий ринок",
                    advisor: "Фін. радник",
                    forex: "Валютний ринок",
                    private_cabinet: "Особистий кабінет",
                    my_accounts: "Мої рахунки",
                    about_us: "Про нас",
                    first: "Перший",
                    development_site: "Розробка сайту",
                    slogan: "Ми TechMatrix18. Ми допомагаємо втілити ідею.",
                    how_work: "Як ми працюємо?",
                    what_doing: "Що ми робимо?",
                    landing_page: "Лендинг пейдж",
                    development: "Розробка",
                    corporate_website: "Корпоративний сайт",
                    online_store: "Інтернет-магазин",
                    service_api: "Веб сервіс та API для моб.",
                    site_system: "Сайт-система",
                    web_portal: "Веб-портал",
                    articles: "Статті",
                    contacts: "Контакти",
                    download_price: "Завантажити прайс",
                    brief_online: "Заповнити бриф - онлайн",
                    brief: "Заповнити бриф",
                    team: "Команда",
                    price: "Ціна",
                    seo_words: "Кількість слів (SEO)",
                    first_1: `<b>TechMatrix18</b> - команда людей, яка професійно займається комп'ютерним програмуванням
                        та розробкою сайтів з 2007 року. Успішно розробили та спрограмували не один корпоративний сайт,
                        інтернет-магазин для середнього бізнесу та складні веб-портали для банків нашої країни.`,
                    first_2: `<b>Наша місія</b> - допомагати розвитку успішного бізнесу в IT сфері. Ми хотіли б стати для Вас
                        надійним партнером з надання послуг розробки, розвитку бізнесу в інтернеті та супроводу
                        сайту. Ми досягаємо своєї мети, пропонуючи послуги, які призводять до розвитку та процвітання суспільства.`,
                    first_3: `Розробка сайту для нас не є кінцевою метою. Це лише інструмент, який має
                        допомагати розвитку бізнесу та збільшенню Вашого прибутку. <br/><br/>
                        Ми любимо жити і любимо життя у всіх його проявах. TechMatrix18 любить нові знання, що допомагають нам працювати,
                        а ще любить великі та цікаві проекти у сфері IT, бажаючи стати впевненим партнером для Вас та Вашого бізнесу.`,
                    who_we_are: "Хто ми?",
                    first_4: `<b>Наша географія</b> - Це весь світ. Ми розмовляємо кількома мовами та розробляємо сайти, інтернет магазини
                        та складні системи для бізнесу на сучасних технологіях. <br /><br />
                        Вік наших клієнтів віком від 28 до 53 років. Це власник бізнесу, бізнесмен, бізнес леді, маркетолог та бренд менеджер,
                        власник виробництва, підприємець із сегменту B2B та B2C, публічна особистість. <br/><br/>
                        Сайти замовляють для розвитку власного бізнесу, для популяризації компанії через інтернет, сайт-система
                        автоматизація процесів на виробництві чи заводі із залученням IT, сайт-система чи сервіс для ведення клінтів
                        та їх даних, сайт-система для логістики на підприємстві, запуск та виведення нового бренду, для збільшення продажів, пошук
                        нових клієнтів, соціальний розважальний або новинний портал, популяризація бренду або захоплення нового сегменту ринку,
                        веб-сервіс та API для мобільних додатків, сайт-система для ведення даних у лабораторії, для збільшення прибутку з інтернету. <br/><br/>
                        Наші сайти: в інтернеті, на підприємстві, на заводі, в банку, в холдингу, в лабораторії, компанії, корпорації. <br /><br />
                        Перевага сайтів у тому, що сайти доступні для ваших клієнтів як у робочі дні, так і в будь-який інший час,
                        представляючи ваші послуги на корпоративному сайті або продаючи ваші товари 24/7 в інтернеті тоді, коли офіси закриті. <br/>`,
                    why_us: "Чому ми?",
                    a_ewe: "А ще",
                    title_1: "БАГАТО РОКІВ ДОСВІДУ",
                    title_2: "ЗЛАЖЕНА КОМАНДА",
                    title_3: "ВПРОВАДЖУЄМО НОВІ ТЕХНОЛОГІЇ",
                    title_4: "НАПРАЦЬОВАНI КЛІЄНТИ",
                    title_5: "РОКІВ ДОСВІДУ",
                    title_6: "ВАГОНІВ ВОДИ ВИПИТО",
                    title_7: "ДНІВ ПРОГРАМУВАННЯ",
                    title_8: "ЗАДОВОЛЕНИХ КЛІЄНТІВ",
                    first_5: `Так, ми розробляємо та робимо сайти. Ми пишемо код. Робимо великі та не дуже сайти. Сайти, які нам легко
                        підтримувати, бо знаємо свій код і знаємо, що робимо. Ми не використовуємо безкоштовні CMS, які не призначені
                        для модифікації та масштабування надалі, тому вони і безкоштовні, а технологія на них коштує дешевше і швидше.
                        Вам потрібно створити сайт під ключ і запустити його в інтернеті? Це до нас! Ми готові розробити сайт для Вас та
                        запустити його в Інтернеті. Наш вектор напряму – це корпоративний сайт, інтернет магазин та сайт-система. Ми пишаємося
                        тим, що ми робимо та розробляємо сайти. Ми пишаємося результатами своєї роботи та нашими клієнтами. Ми хочемо, щоб
                        і Ви змогли отримати бажаний результат, попрацювавши з нами.`,
                    service_1: "Лендінг пейдж",
                    service_2: "Корпоративний сайт",
                    service_3: "Веб сервіс та API для моб.",
                    service_4: "Web-портал",
                    service_5: "Сайт-система",
                    service_6: "Інтернет-магазин",
                    how_work: "Як ми працюємо?",
                    title_f1: "Розробка складається з кількох етапів",
                    descr_f1: `1. постановка задачі; <br/>
                        2. підготовка технічного завдання та укладання договору з клієнтом; <br/>
                        3. розробка макета, погодження із замовником; <br/>
                        4. верстка шаблону, встановлення системи керування сайтом, налаштування хостингу, демо сайту; <br/>
                        5. розробка необхідного функціоналу, тестування; <br/>
                        6. наповнення контентом; <br/>
                        7. закриття замовлення після прийняття клієнтом;`,
                    first_7: `Використовуємо розробку, ґрунтуючись на сучасних та передових технологіях. Facebook, Amazon - все
                        ці платформи написані мовою програмування PHP з найміцнішими стандартами безпеки та стабільністю коду. <br/><br/>
                        Ми вибрали цю мову і його фреймворки Yii2, Laravel, коли вони ще не увірвалися в ТОП найбільш використовуваних на планеті.
                        Це дозволяє нам розробляти в TechMatrix18 унікальну пропозицію для Вас та бути гнучким у реалізації Ваших незвичайних побажань. <br/><br/>`,
                    our_prices: "Наші ціни",
                    descr_f2: `- Ми не робимо шаблонних рішень (якщо Ви цього не попросите) <br/>
                        - Ми не робимо сайти "під копірку" (якщо Ви цього не попросите) <br/>
                        - Ми не робимо "тут роботи на кілька годин" <br/>
                        - Ми не робимо так, щоб подобалося Вам. Ми робимо так, щоби подобалося Вашим клієнтам <br/>
                        - Ми домагаємося поставленої мети (не завжди вдало, але головне ж що досягаємо) <br/>`,
                    we_work_expensive: "Ми робимо дорого? Робимо!",
                    descr_f3: `Хоча все це — оплата за нашу працю, і якщо Ви вважаєте, що працю має оплачуватись – ми спрацюємося.
                        Ще ми вміємо замовляти мову, тому якщо Ви все ще хочете дізнатися ціни,`,
                    go_link: "перейдіть за посиланням",
                    reviews: "Відгуки",
                    reviews_title: "Наші клієнти говорять про нас",
                    order_development: "Замовити розробку",
                    corp_site_descr: `<li>✔ Строк виконання 10-20 днів</li>
                        <li>✔ Визначення та наповнення основних розділів</li>
                        <li>✔ Дизайн у корпоративних кольорах</li>
                        <li>✔ 5 функціональних модулів</li>
                        <li>✔ Адаптивність під усі пристрої</li>
                        <li>✔ Базова SEO-оптимізація</li>
                        <li>✔ Laravel</li>
                        <li>✔ Система керування сайтом</li>
                        <li>✔ Навчання роботи з сайтом</li>`,
                    online_store_descr: `<li>✔ Строк виконання 2-3 тижні</li>
                        <li>✔ Наповнення 100 позицій</li>
                        <li>✔ Унікальний дизайн</li>
                        <li>✔ Можливість онлайн-оплати</li>
                        <li>✔ Адаптивність під усі пристрої</li>
                        <li>✔ Базова SEO-оптимізація</li>
                        <li>✔ 10000 символів унікального тексту</li>
                        <li>✔ Laravel</li>
                        <li>✔ Навчання роботи з сайтом</li>
                        <li>✔ Підключення зовнішніх сервісів</li>
                        <li>✔ Установка https</li>
                        <li>✔ Доменне ім'я у подарунок</li>`,
                    site_system_descr: `<li>✔ Строк виконання від 2 місяців</li>
                        <li>✔ Наповнення 500 позицій/списків</li>
                        <li>✔ Розробка основних складових</li>
                        <li>✔ Унікальний дизайн</li>
                        <li>✔ Розробка логічних елементів</li>
                        <li>✔ Адаптивність під усі пристрої</li>
                        <li>✔ Базова SEO-оптимізація</li>
                        <li>✔ Laravel</li>
                        <li>✔ Внутрішнє відправлення email</li>
                        <li>✔ Підключення зовнішніх сервісів</li>
                        <li>✔ Система керування сайтом</li>
                        <li>✔ Навчання роботи з сайтом</li>
                        <li>✔ Установка https</li>
                        <li>✔ Доменне ім'я у подарунок</li>`,
                    corp_site_price: "от 25000 грн",
                    site_system_price: "от 85000 грн",
                    online_store_price: "от 50000 грн",

                    about_1: `<b>TechMatrix18</b> - команда людей, яка професійно займається комп'ютерним
                        програмуванням і розробкою сайтів c 2007 року. Основываясь на нашем опыте и знаниях, мы можем
                        гарантувати виконання роботи якісно і в терміни. Успішно розробили і запрограмували не один
                        корпоративний сайт, інтернет-магазин для середнього бізнесу, а також складні веб-портали для банків.`,
                    about_2: `<b>Наша місія</b> — допомогти розвитку успішного бізнесу в IT-сфері. Ми хотіли б стати для
                        Вас надійним партнером по наданню послуг з розробки, розвитку бізнесу в інтернеті та супроводу
                        сайту. Ми досягаємо своєї цілі, пропонуючи послуги, які приводять до розвитку і розвитку суспільства.`,
                    about_3: `<b>Розробка сайту</b> для нас не є кінцевою метою. Це лише інструмент, який
                        повинен допомогти розвитку бізнесу і збільшити прибуток замовника.`,
                    about_4: `Кожен спеціаліст має більше 10 років досвіду розробки або роботи у своїй сфері.`,
                    about_5: `TechMatrix18 любить нові знання, що допомагають нам працювати, а ще любить розробляти та робити
                        великі нестандартні проекти у IT сфері. Ми як Чіп та Дейл, поспішаємо прийти до Вас на допомогу в реалізації
                        Ваших цілей. А хто як не ми, найкраще знаємося на сучасних технологіях сайто будови?
                        А хто як не ми, знаємо, як легко виконати замовлення клієнта так, щоб він залишився задоволеним результатом
                        роботи? Тільки ми! Розробка сайту з нами - легко та весело!`,
                    about_6: `Наша розробка сайту унікальна тим, що ми не використовуємо безкоштовні коробкові рішення, які
                        урізані у функціоналі, дизайні та часто, не дають покупцеві потрібного результату, а про відсутність
                        модифікації, він дізнається з часом. Наша розробка є гнучкою під Вас, починаючи з ваших побажань
                        по функціоналу, наповненню, дизайну та закінчуючи тим, що сайт успішно розміщений в інтернеті, в обумовлені
                        терміни, а також має бажаний вами дизайн, функціональність та практичність. Нашим сайтом легко користуватися,
                        він зрозумілий, має все необхідне та бажане, простий в управлінні, захищений, практичний.`,

                    about_7: `<b>Наша географія</b> - це весь світ. Ми розмовляємо кількома мовами та розробляємо сайти,
                        інтернет магазини та складні системи для бізнесу на сучасних технологіях.`,
                    about_8: `Вік наших клієнтів віком від 28 до 53 років. Це власник бізнесу, бізнесмен, бізнес леді,
                        маркетолог та бренд менеджер, власник виробництва, підприємець із сегменту B2B та B2C, публічна особистість.`,
                    about_9: `Сайти замовляють для розвитку власного бізнесу, для популяризації компанії через інтернет,
                        сайт-система для автоматизації процесів на виробництві або заводі із залученням IT, сайт-система
                        або сервіс для ведення клінтів та їх даних, сайт-система для логістики на підприємстві, веб-сервіс та
                        API для мобільних додатків, запуск та виведення нового бренду, для збільшення продажів, пошук нових клієнтів,
                        соціальний розважальний або новинний портал, популяризація бренду або захоплення нового сегменту ринку,
                        сайт-система для ведення даних у лабораторії, збільшення прибутку з інтернету.`,
                    about_10: `Наші сайти: <b>в інтернеті</b>, <b>на підприємстві</b>, <b>на заводі</b>, <b>у банку</b>,
                        <b>у холдингу</b>, <b>у лабораторії</b>, <b>у компанії</b>, <b>у корпорації</b>.`,
                    about_11: `Перевага сайтів в тому, що сайти доступні для ваших клієнтів як у робочі дні, так і
                        будь-який інший час, представляючи ваші послуги на корпоративному сайті або продаючи ваші товари 24/7 в
                        Інтернеті тоді, коли офіси закриті.`,

                    about_title_1: `Дизайнер`,
                    text_1: `Задовольнить ваші графічні побажання у кольорах. Поєднає сучасний дизайн з вашими бажаннями. Малює дизайн веб-сайту для розробки.`,
                    about_title_2: `Frontend – розробник`,
                    text_2: `Зверстає і розмістить, згідно з правилами розміщення html верстки з використанням графічного дизайну для подальшої розробки сайту.`,
                    about_title_3: `Backend - розробник`,
                    text_3: `Запрограмує, розробить сайт та його складну логіку, натягне верстку, провалідує дані та захистить сайт, сильна розробка – його коник проти хакерських атак.`,
                    about_title_4: `Контент менеджер`,
                    text_4: `Заповнить сайт бажаною інформацією, продуктами, товарами, текстами чи зображеннями.`,
                    about_title_5: `Менеджер проекту`,
                    text_5: `Організовує роботу спеціалістів, взаємодіє із замовником. Знає, що роблять розробники і на якому етапі зараз розробка сайту.`,

                    bread_about: `Про нас`,

                }
            },
            ch: {
                translation: {
                    dashboard: "仪表板",
                    contacts: "联系人",
                    activities: "活动",
                    clients: "客户",
                    deals: "交易",
                    departments: "部门",
                    positions: "职位",
                    roles: "角色",
                    users: "用户",
                    trading: "交易中心",
                    settings: "设置",
                    about: "关于我们",
                    logout: "退出登录",
                    login: "登录",
                    learn: "学习/培训",
                    big: "放大",
                    less: "缩小",
                    symbols: "交易对/代码",
                    candles: "K线图",
                    view_candle: "查看K线",
                    view_symbol: "查看详情",
                    close: "关闭",
                    go_back: "返回",
                    upload_candles: "上传K线数据",
                    view_candles: "查看K线图",
                    backtest: "回测",
                    tasks: "Flowable 任务",
                    history: "任务历史",
                    deleteSelected: "删除所选",
                    calendar: "日历",
                    back: "返回",
                    back_to_list: "回到列表",
                    trade_details: "交易详情",
                    close_trade: "平仓/结束交易",
                    edit_trade: "编辑交易",
                    view_details: "查看详情",
                    grafics: "图表",
                    perevodu: "转账",
                    payments: "支付",
                    credits: "贷款/信用",
                    applications: "申请",
                    banking_services: "银行服务",
                    private_banking: "私人银行",
                    wealth_management: "财富管理",
                    investments: "投资",
                    stock_market: "股票市场",
                    advisor: "理财顾问",
                    forex: "外汇市场",
                    private_cabinet: "个人中心",
                    my_accounts: "我的账户",
                    about_us: "关于我们",
                    first: "第一",
                    development_site: "网站开发",
                    slogan: "我们是TechMatrix18。我们帮助实现创意。",
                    how_work: "我们如何工作？",
                    what_doing: "我们做什么？",
                    landing_page: "登录页",
                    development: "开发",
                    corporate_website: "企业网站",
                    online_store: "在线商店",
                    service_api: "移动端Web服务和API",
                    site_system: "网站系统",
                    web_portal: "网络门户",
                    articles: "文章",
                    contacts: "联系人",
                    download_price: "下载价格表",
                    brief_online: "在线填写简要信息",
                    brief: "填写简要信息",
                    team: "团队",
                    price: "价格",
                    seo_words: "字数（SEO）",
                    first_1: `<b>TechMatrix18</b> — 我們是一支專業的團隊，自 2007 年以來一直從事電腦程式設計和網站開發工作。我們已成功開發和編程了許多企業網站、中型企業的線上商店以及全國各地銀行的複雜入口網站。`,
                    first_2: `<b>我們的使命</b> — 我們致力於幫助您在IT領域發展成功的業務。我們希望成為您值得信賴的合作夥伴，為您提供開發服務、線上業務拓展和網站維護。我們透過提供有助於社會發展和繁榮的服務來實現我們的目標。`,
                    first_3: `網站開發並非我們的最終目標。它只是一種工具，旨在幫助您發展業務並提高利潤。 <br/><br/>
                        我們熱愛生活，並欣然接受它的各種形式。 TechMatrix18 樂於學習有助於我們工作的新知識，我們也熱衷於大型且令人興奮的 IT 項目，渴望成為您和您企業值得信賴的合作夥伴。`,
                    who_we_are: "我們是誰？",
                    first_4: `<b>我們的地理</b> — 這就是整個世界。我們精通多種語言，並運用現代技術開發網站、網上商店和複雜的商業系統。 <br /><br />
                        我們的客戶年齡在 28 歲到 53 歲之間。他們包括企業主、企業家、女商人、行銷人員和品牌經理、製造企業主、B2B 和 B2C 企業家以及公眾人物。 <br/><br/>
                        網站建置的目的包括：業務拓展、公司線上推廣、利用資訊科技實現生產或工廠流程自動化、建立客戶及其資料管理的網站系統或服務、建立企業物流網站系統、推出和推廣新品牌、提升銷售額、尋找新客戶、建立社交娛樂或新聞入口網站、
                        推廣品牌或開拓新市場、為行動應用程式提供網路服務和API、建立社交娛樂或新聞入口網站、推廣品牌或開拓新市場、為行動應用程式提供網路服務和API、建立實驗室資料管理網站以及提高線上利潤。 <br/><br/>
                        我們的網站：在網路上、在企業中、在工廠中、在銀行中、在控股公司中、在實驗室中、在公司中、在集團公司中。<br /><br />
                        網站的優勢在於，無論在營業時間或其他時間，您的客戶都可以訪問它們，
                        您可以在公司網站上展示您的服務，或在辦公室關閉時全天候線上銷售您的產品。 <br/>`,
                    why_us: "為什麼選擇我們？",
                    a_ewe: "而且",
                    title_1: "多年經驗",
                    title_2: "配合默契的團隊",
                    title_3: "我們實施新技術",
                    title_4: "現有客戶",
                    title_5: "多年經驗",
                    title_6: "裝滿飲用水的馬車",
                    title_7: "程式設計日",
                    title_8: "滿意的客戶",
                    first_5: `是的，我們開發和建立網站。我們編寫程式碼。我們搭建各種規模的網站。我們開發的網站易於維護，因為我們熟悉程式碼，也清楚自己在做什麼。我們不使用免費的CMS系統，因為它們並非為未來的修改和擴展而設計，
                        而這正是它們免費的原因，使用它們進行開發成本更低、速度更快。
                        需要一個交鑰匙式的網站開發和上線服務嗎？這正是我們擅長的！我們隨時準備為您開發網站並將其上線。我們專注於企業網站、線上商店和網站系統。我們為我們的工作和交付的成果感到自豪，也為我們的客戶感到自豪。
                        我們希望透過與我們合作，您能夠實現您期望的目標。`,
                    service_1: "著陸頁",
                    service_2: "企業網站",
                    service_3: "行動裝置Web服務和API。",
                    service_4: "網路入口網站",
                    service_5: "網站系統",
                    service_6: "網上商店",
                    how_work: "我們如何工作？",
                    title_f1: "該開發過程包括多個階段",
                    descr_f1: `1. 設定任務；<br/>
                        2. 準備技術規格並與客戶簽訂合約；<br/>
                        3. 開發佈局，與客戶協調；<br/>
                        4. 範本佈局、安裝內容管理系統、設定主機並建立示範網站；<br/>
                        5. 開發必要功能並進行測試；<br/>
                        6. 填充內容；<br/>
                        7. 客戶驗收後完成訂單；`,
                    first_7: `我們採用基於現代前沿技術的開發方法。 Facebook、亞馬遜——所有這些平台都使用 PHP 編寫，PHP 是一種擁有最高安全標準和程式碼穩定性的程式語言。 <br/><br/>
                        我們在 PHP 及其框架 Yii2 和 Laravel 成為全球最廣泛使用的框架之前就選擇了它們。
                        這使得 TechMatrix18 能夠為您打造獨一無二的產品，並靈活地滿足您的各種特殊需求。 <br/><br/>`,
                    our_prices: "我們的價格",
                    descr_f2: `- 我們不製作模板解決方案（除非您要求我們這樣做）<br/>
                        - 我們不製作千篇一律的網站（除非您要求我們這樣做）<br/>
                        - 我們不做「只做幾個小時的工作」<br/>
                        - 我們做事不是為了取悅您，而是為了取悅您的客戶<br/>
                        - 我們努力實現目標（並非總是成功，但最重要的是我們能夠實現目標） <br/>`,
                    we_work_expensive: "我們這樣做成本很高嗎？確實如此！",
                    descr_f3: `雖然這一切都是我們工作的報酬，如果您也認為工作應該得到報酬，我們可以合作。
                        我們也懂得如何溝通，所以如果您仍然想了解價格，`,
                    go_link: "請點擊連結",
                    reviews: "評論",
                    reviews_title: "我們的客戶都在談論我們",
                    order_development: "訂單發展",
                    corp_site_descr: `<li>✔ 完成時間：10-20 天</li>
                        <li>✔ 關鍵部分的定義與內容</li>
                        <li>✔ 企業配色設計</li>
                        <li>✔ 5 功能模組</li>
                        <li>✔ 適合所有設備</li>
                        <li>✔ 基礎 SEO 優化</li>
                        <li>✔ Laravel 框架</li>
                        <li>✔ 內容管理系統</li>
                        <li>✔ 網站管理訓練</li>`,
                    online_store_descr: `<li>✔ 完成時間：2-3 週</li>
                        <li>✔ 已招滿 100 個職缺</li>
                        <li>✔ 獨特設計</li>
                        <li>✔ 線上付款選項</li>
                        <li>✔ 適合所有設備</li>
                        <li>✔ 基礎 SEO 優化</li>
                        <li>✔ 10,000 個字元的獨特文字</li>
                        <li>✔ Laravel 框架</li>
                        <li>✔ 網站訓練</li>
                        <li>✔ 連線外部服務</li>
                        <li>✔ HTTPS 安裝</li>
                        <li>✔ 免費網域</li>`,
                    site_system_descr: `<li>✔ 完成時間只要 2 個月</li>
                        <li>✔ 填入 500 個職缺/名單</li>
                        <li>✔ 主要元件開發</li>
                        <li>✔ 獨特設計</li>
                        <li>✔ 邏輯版塊開發</li>
                        <li>✔ 適合所有設備</li>
                        <li>✔ 基礎 SEO 優化</li>
                        <li>✔ Laravel</li>
                        <li>✔ 內部郵件發送</li>
                        <li>✔ 連線外部服務</li>
                        <li>✔ 內容管理系統</li>
                        <li>✔ 網站訓練</li>
                        <li>✔ HTTPS 安裝</li>
                        <li>✔ 免費網域</li>`,
                    corp_site_price: "900美元起",
                    site_system_price: "起價 3,150 美元",
                    online_store_price: "1855美元起",

                    about_1: `<b>TechMatrix18</b> 我們是一支自2007年起便從事電腦程式設計和網站開發的專業團隊。憑藉豐富的經驗和專業知識，
                        我們能夠保證專案的品質和按時交付。我們已成功開發並編寫了多個企業網站、中型企業的線上商城以及銀行的複雜入口網站。`,
                    about_2: `<b>我們的使命</b> ——助您在IT領域發展壯大。我們希望成為您值得信賴的合作夥伴，為您提供網路開發、
                        業務拓展和網站維護等服務。我們致力於提供能夠促進社會發展和進步的服務，從而實現我們的目標。`,
                    about_3: `<b>網站開發</b> 這並非我們的最終目標。它只是一種工具，旨在幫助企業發展並提高客戶利潤。`,
                    about_4: `每位專家在開發或相關領域均擁有超過 10 年的經驗。`,
                    about_5: `TechMatrix18 熱愛學習新知識，這有助於我們的工作，我們也熱衷於開發和完成 IT 領域的大型非標準專案。我們就像奇奇和蒂蒂一樣，
                        迫不及待地想要幫助您實現目標。還有誰比我們更了解現代網站建立技術呢？
                        還有誰比我們更懂得如何輕鬆滿足客戶的需求，並確保客戶對最終成果感到滿意呢？只有我們！與我們合作，網站開發輕鬆又有趣！`,
                    about_6: `我們的網站開發獨樹一幟，我們不使用免費的現成解決方案，因為這些方案
                        功能和設計都有限，而且往往無法達到預期效果。缺乏 隨著時間的推移，這些缺陷會逐漸顯現。我們的開發方案靈活且量身定制，
                        滿足您的各種需求，從您對功能、內容和設計的期望，到確保網站在約定的時間內成功上線，並擁有您夢寐以求的設計、功能和易用性。
                        我們的網站易於使用，直覺易懂，擁有您所需的一切，易於管理，安全可靠，實用便捷。`,

                    about_7: `<b>我們的地理</b> ——就是整個世界。我們精通多種語言，並運用現代技術開發網站、網上商店和複雜的商業系統。`,
                    about_8: `我們的客戶年齡在 28 歲到 53 歲之間。他們包括企業主、企業家、女商人、行銷人員和品牌經理、製造企業主、B2B 和 B2C 企業家以及公眾人物。`,
                    about_9: `網站可用於業務拓展、公司線上推廣、
                        用於利用資訊科技實現生產或工廠流程自動化的網站系統、用於管理客戶及其資料的網站系統或服務、用於企業物流的網站系統、用於行動應用程式的 Web 服務和
                        用於推出和推廣新品牌、提高銷售、尋找新客戶、
                        用於社交娛樂或新聞入口網站、用於品牌推廣或開拓新市場、
                        用於實驗室資料管理的網站系統、用於提高線上利潤。`,
                    about_10: `我們的網站： <b>在網路上</b>, <b>企業</b>, <b>在工廠</b>, <b>在銀行</b>,
                        <b>在控股公司</b>, <b>在實驗室裡</b>, <b>公司</b>, <b>在公司</b>.`,
                    about_11: `網站的優勢在於，無論在工作日還是其他任何時間，您的客戶都可以訪問它們，您可以在公司網站上展示您的服務，
                        或者在辦公室關閉時全天候在線銷售您的產品。`,

                    about_title_1: `設計師`,
                    text_1: `我們將滿足您對圖形色彩的要求。我們會將現代設計與您的願望結合。我們也會為網站開發創建設計方案。`,
                    about_title_2: `前端開發者`,
                    text_2: `根據 HTML 佈局的放置規則，使用圖形設計進行佈局和放置，以便後續網站開發。`,
                    about_title_3: `後端開發人員`,
                    text_3: `他將負責網站的程式設計和開發，包括複雜的邏輯設計、佈局創建、資料驗證以及網站安全防護。強大的開發能力是他抵禦駭客攻擊的強項。`,
                    about_title_4: `內容管理器`,
                    text_4: `在網站上填寫所需的資訊、產品、商品、文字或圖片。`,
                    about_title_5: `專案經理`,
                    text_5: `負責管理專業人員的工作並與客戶溝通。了解開發人員的工作內容以及網站目前的開發進度。`,

                    bread_about: `關於我們`,

                }
            },
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

