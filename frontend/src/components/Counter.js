import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../slices/counterSlice' // Шаг назад и в slices

export const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    )
}

