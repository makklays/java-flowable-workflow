
import React, { useReducer } from 'react';

// 1. Определяем тип действия
const actionTypes = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    RESET: 'reset',
}

// 2. Создаём редьюсер
function reducer(state, action) {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return { count: state.count + 1 };
        case actionTypes.DECREMENT:
            return { count: state.count - 1 };
        case actionTypes.RESET:
            return { count: 0 };
        default:
            throw new Error('Unknown action type');
    }
}

// 3. Создаём компонент
function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div>
            <h1>Счётчик: {state.count}</h1>
            <button onClick={() => dispatch({ type: actionTypes.INCREMENT })}>Увеличить</button>
            <button onClick={() => dispatch({ type: actionTypes.DECREMENT })}>Уменьшить</button>
            <button onClick={() => dispatch({ type: actionTypes.RESET })}>Сбросить</button>
        </div>
    );
}