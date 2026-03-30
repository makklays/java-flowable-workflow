import React, { useState } from 'react';

// Короткая запись компонента - стрелочная функция
const Learn = () => {
    const [count, setCount] = useState(0);

    function handleClickPlus() {
        setCount(count + 1);
    }
    function handleClickMinus() {
        setCount(count - 1);
    }

    return (
        <>
            <div>
                <h1>Обучение React</h1>
                <p>Здесь будут елементы обучения React...</p>
            </div>

            <div style={{ fontSize: '24px', fontWeight: 'bold' }} >{count}</div>
            <div style={{ marginTop: '20px' }} >
                <button onClick={handleClickPlus} >Увеличить</button> <button onClick={handleClickMinus} >Уменьшить</button>
            </div>
        </>
    );
};

export default Learn;