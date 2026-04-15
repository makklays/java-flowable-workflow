import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../../slices/counterSlice';
// Переводы текстов
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

// Короткая запись компонента - стрелочная функция
const Tasks = () => {
    const { t, i18n } = useTranslation();

    const count = useSelector((state) => state.counter.value); // Читаем данные
    const dispatch = useDispatch(); // Получаем функцию отправки

    return (
        <div>
            <small>Example of code using Redux Toolkit</small> <br/><br/>

            <h1>Counter: {count}</h1>
            <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => dispatch(increment())}>+1</button>
            <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={() => dispatch(decrement())}>-1</button>
            <button className="btn btn-primary" onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        </div>
    );
};

export default Tasks;