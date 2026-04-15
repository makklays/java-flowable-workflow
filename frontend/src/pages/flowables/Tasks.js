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
            <h1>My Flowable tasks</h1>
            <small>Tasks from Flowable assigned to me</small> <br/><br/>

            <div>
                //
            </div>
        </div>
    );
};

export default Tasks;