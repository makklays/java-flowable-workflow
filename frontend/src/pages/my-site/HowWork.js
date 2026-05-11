import React, { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHome, faSearch, faTasks, faSync, faChartLine, faTrashCan, faPlus, faCoins, faClock, faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import authHeader from '../../services/authHeader';
import Jumbotron from '../../components/Jumbotron';
import Footer from '../../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Короткая запись компонента - стрелочная функция
const HowWork = () => {
    const { t, i18n } = useTranslation();
    const { lng } = useParams();

    const { userId, role } = useApp(); // Достаем данные из вашего контекста
    const [tasks, setTasks] = useState([]);
    const [availableProcesses, setAvailableProcesses] = useState([]);

    const navigate = useNavigate();

    return (
        <div>
            <Jumbotron />

            <div className="container">
                <div className="row" style={{ marginBottom: '40px' }}>
                    <div className="col-md-12">
                        <div className="container" style={{ marginTop:'20px' }} ></div>

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={`/${lng}/`} className="a-green"><FontAwesomeIcon icon={faHome} className="me-2" /></Link></li>
                                <li className="breadcrumb-item" aria-current="page">{t('what_doing')}</li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-12">
                                <br />
                                <h1 className="text-center text-design2">
                                    {t('what_doing')}
                                </h1>
                                <br />
                            </div>
                        </div>

                        <div class="card-deck mb-3">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                        <a href="http://techmatrix18/ru/landing-page" class="text-corporate">
                                            <div>
                                                <img src="/img/icons/lpage_.png" alt="TechMatrix18 - Лендинг пейдж image 1" title="Лендинг пейдж" class="img-development" />
                                            </div>
                                            <h2 class="site-sitio">Лендинг пейдж</h2>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                        <a href="http://techmatrix18/ru/corporate-site" class="text-corporate">
                                            <div>
                                                <img src="/img/icons/corporate_.png" alt="TechMatrix18 - Корпоративный сайт image 2" title="Корпоративный сайт" class="img-development" />
                                            </div>
                                            <h2 class="site-sitio">Корпоративный сайт</h2>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                        <a href="http://techmatrix18/ru/api-service" class="text-corporate">
                                            <div>
                                                <img src="/img/icons/api_.png" alt="TechMatrix18 - Веб сервис и API для моб. image 3" title="Веб сервис и API для моб." class="img-development" />
                                            </div>
                                            <h2 class="site-sitio">Веб сервис и API для моб.</h2>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-deck mb-3">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                        <a href="http://techmatrix18/ru/web-portal" class="text-corporate">
                                            <div>
                                                <img src="/img/icons/web_portal2.png" alt="TechMatrix18 - Web-портал image 4" title="Web-портал" class="img-development" />
                                            </div>
                                            <h2 class="site-sitio">Web-портал</h2>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="text-center card mb-4 shadow-sm">
                                        <a href="http://techmatrix18/ru/site-system" class="text-corporate">
                                            <div>
                                                <img src="/img/icons/sysite.png" alt="TechMatrix18 - Сайт-система image 5" title="Сайт-система" class="img-development" />
                                            </div>
                                            <h2 class="site-sitio">Сайт-система</h2>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="text-center card mb-4 shadow-sm effect-shadow-fade-in">
                                        <a href="http://techmatrix18/ru/online-store" class="text-corporate">
                                            <div>
                                                <img src="/img/icons/store2.png" alt="TechMatrix18 - Интернет-магазин image 6" title="Интернет-магазин" class="img-development" />
                                            </div>
                                            <h2 class="site-sitio">Интернет-магазин</h2>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <br/><h1 class="text-center text-design2">Разработка</h1> <br/>
                            </div>

                            <div class="col-md-12">
                                <p class="text-left">
                                    Лучшие сайты мира состоят из кода. А разработчики пишут и делают этот код для сайтов,
                                    то есть разработывают. Мы программируем и делаем код. Этот код воспринимается программой
                                    и интерпретируется в визуальные составляющие, которые Вы видите на екране вашего монитора.
                                    Мы делаем сайты из кода, который был одобрен сильнейшими и умнейшими программистами PHP.
                                    Делаем и разрабатываем сайты на основе готовых копонентов Laravel. Это позволяет нам
                                    делать сайты сложные и одновременно с этим легко модифицируемые и редактируемые под
                                    пожелания клиента. Да, мы делаем сайт, который легко поддерживать. Мы делаем большие
                                    сайты. Вам нужно разработать сайт под ключ и запустить его в интернете? Это к нам!
                                    Мы готовы разработать сайт для Вас и запустить его в интернете. Наш вектор направления —
                                    это корпоративный сайт, интернет магазин и сайт-система. Мы гордимся тем, что мы делаем
                                    и разрабатываем сайты. Мы гордимся результатами своей роботы и нашими клиентами.
                                    Мы хотим, чтобы и Вы смогли получить желаемый результат, поработав с нами. <br/>
                                    <br/>
                                </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <h1 class="text-center text-design2">Технологии</h1>
                                <p class="text-center">Используемые нами технологии при разработке</p>
                            </div>
                        </div>

                        {/* листалка технологий */}
                        <div class="d-flex justify-content-center flex-wrap mt-5">
                            <div class="carousel slide py-4 col-12 col-md-9 col-lg-7" data-interval="false" data-ride="carousel" id="our_technologies">
                                <div class="carousel-inner px-lg-3">
                                    <div class="carousel-item active">
                                        <div class="row slide justify-content-center">
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Composer" src="/img/img/composer.png" />
                                                    <p class="text-muted mt-3">Composer</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="PHP" src="/img/img/php.png" />
                                                    <p class="text-muted mt-3">PHP</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="MySQL" src="/img/img/mysql.png" />
                                                    <p class="text-muted mt-3">MySQL</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Laravel" src="/img/img/laravel_.png" />
                                                    <p class="text-muted mt-3">Laravel</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row slide justify-content-center">
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="HTML5" src="/img/img/site/html5.png" />
                                                    <p class="text-muted mt-3">HTML5</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="CSS3" src="/img/img/site/css3.png" />
                                                    <p class="text-muted mt-3">CSS3</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="jQuery" src="/img/img/jquery.png" />
                                                    <p class="text-muted mt-3">jQuery</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Vue.js" src="/img/img/vue_js.png" />
                                                    <p class="text-muted mt-3">Vue.js</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row slide justify-content-center">
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Slim" src="/img/img/slim.png" />
                                                    <p class="text-muted mt-3">Slim</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="PostgreSQL" src="/img/img/postgre_sql.png" />
                                                    <p class="text-muted mt-3">PostgreSQL</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Lumen" src="/img/img/lumen.png" />
                                                    <p class="text-muted mt-3">Lumen</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row slide justify-content-center">
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Jira" src="/img/img/jira.png" />
                                                    <p class="text-muted mt-3">Jira</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Github" src="/img/img/github.png" />
                                                    <p class="text-muted mt-3">GitHub</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Git" src="/img/img/git.png" />
                                                    <p class="text-muted mt-3">Git</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div class="row slide justify-content-center">
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Linux" src="/img/img/linux.png" />
                                                    <p class="text-muted mt-3">Linux</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Ubuntu" src="/img/img/site/ubuntu.png" />
                                                    <p class="text-muted mt-3">Ubuntu</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Microsoft" src="/img/img/microsoft.png" />
                                                    <p class="text-muted mt-3">Microsoft</p>
                                                </div>
                                            </div>
                                            <div class="col-6 col-md-3">
                                                <div class="my-3 text-center">
                                                    <img height="65" alt="Bash" src="/img/img/bash.png" />
                                                    <p class="text-muted mt-3">Bash</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a class="carousel-control-prev" href="#our_technologies" role="button" data-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" data-slide="next" href="#our_technologies" role="button">
                                    <span aria-hidden="true" class="carousel-control-next-icon"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <h1 class="text-center text-design2">Отзывы</h1>
                                <p class="text-center">Наши клиенты говорят о нас</p>
                            </div>
                        </div>

                        {/* листалка */}
                        <div class="carousel slide py-4" data-interval="false" data-ride="carousel" id="successStories">
                            <ol class="carousel-indicators">
                                <li class="" data-slide-to="0" data-target="#successStories"></li>
                                <li data-slide-to="1" data-target="#successStories" class="active"></li>
                                <li data-slide-to="2" data-target="#successStories"></li>
                            </ol>
                            <div class="carousel-inner pb-4">
                                <span class="x-link-without-decoration carousel-item" href="/blog/posts/moy-put-i-rol-hexlet-v-moyom-razvitii">
                                    <div class="row slide justify-content-center">
                                        <div class="col-12 col-md-10 col-lg-2 d-flex align-items-center d-lg-block mb-5">
                                            <div class="mb-lg-4">
                                                <img class="img-fluid rounded-circle kromka" width="105" height="105" alt="Аватар пользователя" src="/img/img/foto3.jpg" />
                                            </div>
                                            <div class="ml-4 ml-lg-0">
                                                <div class="h3 font-weight-bold">Kirill Zakimov</div>
                                                <div class="h5 mb-0 font-italic">г. Киев</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-10 col-lg-8">
                                            <p class="lead text-justify">«Мой интернет-магазин сейчас приносит мне прибыль и в нем реализовано все мио сумашедшие идеи, загрузки, каталоги и главное финансовые отчеты с графиками. Работой очень доволен. Есть мобильная версия. Сейчас от туда поступает много заказов. Скорость и оптимизация великолепны.»</p>
                                        </div>
                                    </div>
                                </span>
                                <span class="x-link-without-decoration carousel-item active" href="/blog/posts/kak-ya-stal-programmistom-v-33-goda">
                                    <div class="row slide justify-content-center">
                                        <div class="col-12 col-md-10 col-lg-2 d-flex align-items-center d-lg-block mb-5">
                                            <div class="mb-lg-4">
                                                <img class="img-fluid rounded-circle kromka" width="105" height="105" alt="Аватар пользователя" src="/img/img/foto.jpg" />
                                            </div>
                                            <div class="ml-4 ml-lg-0">
                                                <div class="h3 font-weight-bold">Valeriy Zadavysvichka</div>
                                                <div class="h5 mb-0 font-italic">г. Киев</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-10 col-lg-8">
                                            <p class="lead text-justify">«Alexander is a good specialist who decided many different technical tasks for our Learning Management system. The development was completed on time and all my wishes and improvements were taken into account. The development was completed on time and all my wishes and improvements were taken into account. Separately, I can highlight the best technical implementations offered to me for the product. I was understood from the floor by words.»</p>
                                        </div>
                                    </div>
                                </span>
                                <span class="x-link-without-decoration carousel-item" href="/blog/posts/feycot-success-story">
                                    <div class="row slide justify-content-center">
                                        <div class="col-12 col-md-10 col-lg-2 d-flex align-items-center d-lg-block mb-5">
                                            <div class="mb-lg-4">
                                                <img class="img-fluid rounded-circle kromka" width="105" height="105" alt="Аватар пользователя" src="/img/img/foto2.jpg" />
                                            </div>
                                            <div class="ml-4 ml-lg-0">
                                                <div class="h3 font-weight-bold">Katy Antonenko</div>
                                                <div class="h5 mb-0 font-italic">г. Барселона</div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-10 col-lg-8">
                                            <p class="lead text-justify">«Вот уже месяц как пользуюсь сделаным для меня сайтов. Сайтом и разработкой удовлетворена. Глубина страниц была утверждена на этапе заключения контракта. Сроками, объемом и скоростью разработки осталась довольна, рекомендую.»</p>
                                        </div>
                                    </div>
                                </span>
                            </div>
                            <a class="carousel-control-prev x-link-without-decoration d-none d-md-flex" data-slide="prev" href="#successStories" role="button">
                                <span aria-hidden="true" class="carousel-control-prev-icon"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next x-link-without-decoration d-none d-md-flex" data-slide="next" href="#successStories" role="button">
                                <span aria-hidden="true" class="carousel-control-next-icon"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HowWork;