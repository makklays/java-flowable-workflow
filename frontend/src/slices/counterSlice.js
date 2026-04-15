import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'counter', // Название слайса
    initialState: { value: 0 }, // Начальное состояние
    reducers: {
        // Описываем действия (actions)
        increment: (state) => {
            state.value += 1 // В RTK можно писать так "мутирующее", это безопасно!
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload // Используем данные из "заявки"
        },
    },
})

// Экспортируем функции-экшены для компонентов
export const { increment, decrement, incrementByAmount } = counterSlice.actions
// Экспортируем редьюсер для хранилища
export default counterSlice.reducer

