import axios from 'axios'
import sleep from 'utils/sleep'

export const SET_INCREMENT = 'SET_INCREMENT'
export const SET_DECREMENT = 'SET_DECREMENT'
export const SET_DATA = 'SET_DATA'

export const onIncrement = () => ({
    type: SET_INCREMENT
})

export const onIncrementAsync = () => async (dispatch) => {
    await sleep(1000)
    dispatch(onIncrement())
}

export const onDecrement = () => ({
    type: SET_DECREMENT
})

export const onDecrementAsync = () => async (dispatch) => {
    await sleep(1000)
    dispatch(onDecrement())
}

export const setData = data => ({
    type: SET_DATA,
    data
})

export const getData = () => async (dispatch) => {
    const data = await axios.post('/api/v1/login', {
        user: 'admin',
        pass: 'admin'
    })
    console.log(data)
    // dispatch(setData(data.data.data))
}

