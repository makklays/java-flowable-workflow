import React, { useState, useEffect } from 'react';
import CountdownTimer from '../components/Timer';

// Короткая запись компонента - стрелочная функция
const About = () => {
    return (
        <div>
            <h1>Обо мне</h1>
            <p>Здесь будет инфо обо мне ...</p>

            <div>Осталось: </div>
            <CountdownTimer />
        </div>
    );
};

export default About;

