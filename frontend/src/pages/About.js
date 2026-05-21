import React, { useState, useEffect } from 'react';
import CountdownTimer from '../components/Timer';
import JobCarousel from '../components/JobCarousel';

// 1. Создаем массив с вакансиями (в реальном проекте они могут приходить из API)
const mockJobs = [
    {
        id: 1,
        title: 'Senior Architect, Digital Signal Processing',
        location: 'Sunnyvale, CA, USA',
    },
    {
        id: 2,
        title: 'Research Scientist, Google Research, AI/ML',
        location: 'Zürich, Switzerland; Mountain View, CA, USA',
    },
    {
        id: 3,
        title: 'Staff Software Engineer, Machine Learning, GeminiApp Personalization, DeepMind',
        location: 'Mountain View, CA, USA',
    },
    {
        id: 4,
        title: 'Frontend Engineer, React Developer',
        location: 'Remote, ID, USA',
    },
    {
        id: 5,
        title: 'Engineering Manager, Infrastructure',
        location: 'London, UK',
    }
];

// Короткая запись компонента - стрелочная функция
const About = () => {
    return (
        <div>
            <h1>Обо мне</h1>
            <p>Здесь будет инфо обо мне ...</p>

            <div>Осталось: </div>
            <CountdownTimer />

            {/* 2. Передаем массив в проп `jobs` или `initialJobs` (в зависимости от выбранного вами варианта карусели) */}
            <div style={{ marginTop: '40px' }}>
                <JobCarousel jobs={mockJobs} />
            </div>
        </div>
    );
};

export default About;

