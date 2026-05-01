import React, { useState, useEffect, useMemo } from 'react';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
// Иконки Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileInvoice, faPlus, faClock, faWallet, faArrowTrendUp
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const StockMarket = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { role } = useApp();

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h3><FontAwesomeIcon icon={faArrowTrendUp} className="me-2" /> {t('stock_market')}</h3>
                    <p>Список акций публичных компаний фондового рынка. {role === 'ADMIN' ? '' : ''}</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">

                    В Испании это прежде всего <b>Мадридская фондовая биржа</b> (Bolsa de Madrid), а главным индикатором является индекс IBEX 35. <br/><br/>

                    Биржа в Мадриде работает <b>с 09:00 до 17:30</b> (по местному времени). В остальное время цена будет "заморожена" на уровне закрытия. <br/><br/>

                    <b>Главный рынок Испании — IBEX 35 </b> <br/>
                    Это список из 35 крупнейших и самых ликвидных компаний страны. <br/>
                    Если хочешь вывести «лицо» испанской экономики, бери эти тикеры: <br/><br/>

                    🏦 Финансы и банки <br/><br/>

                        Banco Santander (SAN) — крупнейший банк Испании. <br/>
                        BBVA (BBVA) — второй по величине банк. <br/>
                        CaixaBank (CABK) — лидер на внутреннем рынке. <br/>
                        Banco Sabadell (SAB) — бизнес-банкинг. <br/>
                        Bankinter (BKT) — онлайн и ритейл банкинг. <br/>
                        Unicaja Banco (UNI) — региональный банк. <br/><br/>

                    ⚡ Энергетика и коммунальные услуги <br/><br/>

                        Iberdrola (IBE) — мировой лидер в возобновляемой энергии. <br/>
                        Endesa (ELE) — электроэнергетика. <br/>
                        Naturgy (NTGY) — газ и электричество. <br/>
                        Repsol (REP) — нефтегазовый гигант. <br/>
                        Redeia (бывш. Red Eléctrica) (RED) — управление электросетями. <br/>
                        Enagás (ENG) — газотранспортная система. <br/>
                        Acciona Energía (ANE) — только возобновляемая энергия. <br/>
                        Solaria (SLR) — солнечная энергетика.  <br/><br/>

                    🏗 Промышленность и строительство <br/><br/>

                        Inditex (ITX) — владелец Zara, Massimo Dutti (самая дорогая компания Испании). <br/>
                        Ferrovial (FER) — инфраструктура и транспорт. <br/>
                        ACS (ACS) — строительный холдинг. <br/>
                        Acciona (ANA) — строительство и услуги. <br/>
                        Sacyr (SCYR) — инфраструктурные проекты. <br/>
                        Fluidra (FDR) — оборудование для бассейнов. <br/>
                        Acerinox (ACX) — производство нержавеющей стали. <br/>
                        ArcelorMittal (MTS) — металлургия (глобальный игрок).  <br/><br/>

                    🌐 Телекоммуникации и IT <br/><br/>

                        Telefónica (TEF) — главный оператор связи. <br/>
                        Cellnex Telecom (CLNX) — вышки сотовой связи. <br/>
                        Amadeus IT Group (AMS) — IT для туризма и авиации. <br/>
                        Indra Sistemas (IDR) — технологии и оборона.  <br/><br/>

                    ✈ Туризм, транспорт и логистика <br/><br/>

                        Aena (AENA) — оператор аэропортов. <br/>
                        IAG (IAG) — владелец Iberia и British Airways. <br/>
                        Logista (LOG) — логистика и дистрибуция.  <br/><br/>

                    Медицина и недвижимость <br/><br/>

                        Grifols (GRF) — препараты крови и биофармацевтика. <br/>
                        Rovi (ROVI) — фармацевтика. <br/>
                        Puig (PUIG) — парфюмерия и мода (новое включение в 2024-25). <br/>
                        Merlin Properties (MRL) — коммерческая недвижимость (SOCIMI). <br/>
                        Inmobiliaria Colonial (COL) — офисная недвижимость. <br/>
                        Mapfre (MAP) — страхование. <br/>

                    <br/><br/>

                    Заявка на статус квала: Длинный процесс проверки стажа и оборотов. <br/>
                    Уведомления (Signal Events): Подписка на достижение цены — когда цена актива совпадает с условием, Flowable присылает Push или создает задачу на покупку. <br/>

                </div>
            </div>
        </div>
    );
}

export default StockMarket;

