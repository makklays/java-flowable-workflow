import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Не забудьте импортировать стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';

const JobCarousel = ({ jobs }) => {
    return (
        <div className="carousel-container" style={{ position: 'relative', padding: '0 50px' }}>
            <h2>Job recommendations ({jobs.length})</h2>

            <Swiper
                modules={[Navigation]}
                spaceBetween={20} // Отступ между карточками
                slidesPerView={3} // Сколько карточек видно одновременно
                loop={true}       // Включает пролистывание по кругу (бесконечность)
                navigation={true} // Включает стрелочки влево/вправо
                breakpoints={{
                    // Адаптивность
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
            {jobs.map((job) => (
                <SwiperSlide key={job.id}>
                    <div className="job-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                        <h3>{job.title}</h3>
                        <p>{job.location}</p>
                        <button>Learn more</button>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
    );
};

export default JobCarousel;

