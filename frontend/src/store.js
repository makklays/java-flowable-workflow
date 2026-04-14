import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice' // Импорт из папки slices

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})

