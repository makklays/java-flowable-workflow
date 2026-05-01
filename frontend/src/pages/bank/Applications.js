import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice, faPlus, faClock
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const Applications = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role } = useApp();

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3><FontAwesomeIcon icon={faFileInvoice} className="me-2" /> {t('applications')}</h3>
                    <p>Список доступных заявок. {role === 'ADMIN' ? 'Все активные заявки' : ''}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    🏦 Банковские продукты <br/><br/>

                        Заявка на кредитную карту:
                            Во Flowable: Запуск процесса «Scoring». Если сумма мала — авто-аппрув (Service Task), если большая — задача аналитику (User Task). <br/>
                        Ипотечные каникулы: <br/>
                            Во Flowable: Процесс с обязательной загрузкой документов. Если документ не загружен в течение 24 часов — напоминание (Timer Event). <br/>
                        Перевыпуск карты: <br/>
                            Во Flowable: Выбор способа доставки (курьер/отделение). Если курьер — запуск подпроцесса логистики. <br/><br/>

                    🛡 Безопасность и данные <br/><br/>

                        Изменение персональных данных: <br/>
                            Во Flowable: Заявка требует «двойного подтверждения» (Four-eyes principle) — задачи для двух разных сотрудников СБ. <br/>
                        Разблокировка счета/карты: <br/>
                            Во Flowable: Быстрый процесс (CMMN), который может завершиться мгновенно после прикрепления фото паспорта. <br/><br/>

                    📈 Инвестиции и Валюта <br/><br/>

                        Статус квалифицированного инвестора: <br/>
                            Во Flowable: Самый сложный процесс. Проверка оборотов, наличия образования и активов. Здесь идеально показать «Дерево решений» (DMN). <br/>
                        Заявка на вывод крупной суммы валюты: <br/>
                            Во Flowable: Проверка на лимиты. Если лимит превышен — автоматическое создание задачи на валютный контроль. <br/><br/>

                    🆘 Сервис и поддержка <br/><br/>

                        Оспаривание транзакции (Чарджбэк): <br/>
                            Во Flowable: Длительный процесс с внешними сигналами (Signal Events) от платежных систем (Visa/Mastercard/Мир). <br/>
                        Запрос справки для налоговой (3-НДФЛ): <br/>
                            Во Flowable: Полностью автоматический процесс. Сбор данных из БД, генерация PDF (Service Task) и отправка в личный кабинет. <br/><br/>

                    💡 Как это «продать» в коде (Frontend + Flowable) <br/><br/>

                    Для демонстрации знаний Flowable на странице списка заявок добавьте такие элементы: <br/>

                        Кнопка «Запустить»: Возле каждого типа заявки. Она должна слать POST-запрос на /process-api/runtime/process-instances с processDefinitionKey. <br/>
                        Индикатор «Живой процесс»: Если заявка запущена, показывайте, на каком узле BPMN она сейчас находится (например, «Ожидает проверки юристом»). <br/>
                        Динамические формы: При нажатии на «Кредит» форма одна, при нажатии на «Справка» — другая. Это покажет вашу работу с Form Service во Flowable. <br/><br/>

                    🏗 Рекомендуемая структура страницы «Заявки» <br/><br/>

                        Header: Кнопка «+ Новая заявка», которая открывает модалку со списком выше. <br/>
                        Таблица «Мои активные процессы»: <br/>
                            ID заявки | Тип (Кредит/Справка) | Статус (В работе/Нужно действие) | Дата запуска. <br/>
                        Action: Если процесс стоит на User Task для клиента — кнопка «Заполнить данные». <br/>
                </div>
            </div>
        </div>
    );
}

export default Applications;

