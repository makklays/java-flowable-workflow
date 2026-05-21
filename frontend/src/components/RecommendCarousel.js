import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Не забудьте импортировать стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';

const RecommendCarousel = ({ jobs }) => {
    // Создаем состояние для отслеживания загрузки страницы
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true); // Сработает только после полной загрузки в браузере
    }, []);

    if (!jobs || jobs.length === 0) return null;
    // Если страница еще перезагружается (F5) — не рендерим Swiper, чтобы избежать бага
    if (!domLoaded) return <div style={{ height: '200px' }}>Загрузка...</div>;

    return (
        <div className="carousel-container" style={{ position: 'relative', padding: '0 50px' }}>

            <Swiper
                modules={[Navigation]}
                spaceBetween={20} // Отступ между карточками
                slidesPerView={1} // Сколько карточек видно одновременно
                loop={true}       // Включает пролистывание по кругу (бесконечность)
                // Эти два параметра заставят Swiper пересчитать ширину после F5
                observer={true}
                observeParents={true}
                //navigation={true} // Включает стрелочки влево/вправо
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                    // ИСПРАВЛЕНО: Явно указали от 0 пикселей показывать 1 слайд
                    0: { slidesPerView: 1 },
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 }
                }}
            >
            {jobs.map((job) => (
                <SwiperSlide key={job.id}>
                    <div className="job-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>

                        <div className="row slide justify-content-center">
                            <div className="col-12 col-md-10 col-lg-2 d-flex align-items-center d-lg-block">
                                <div className="mb-lg-4">
                                    <img className="img-fluid rounded-circle kromka" width="105" height="105" alt="Аватар пользователя" src={job.photo} />
                                </div>
                                <div className="ml-4 ml-lg-0">
                                    <div className="h3 font-weight-bold">{job.person}</div>
                                    <div className="h5 mb-0 font-italic">{job.city}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-10 col-lg-8">
                                <p className="lead text-justify">{job.recommend}</p>
                            </div>
                        </div>

                    </div>
                </SwiperSlide>
            ))}
            </Swiper>

            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    );
};

export default RecommendCarousel;

