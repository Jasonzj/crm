import axios from 'axios'
import sleep from 'utils/sleep'

export const SET_INCREMENT = 'SET_INCREMENT'
export const SET_DECREMENT = 'SET_DECREMENT'
export const SET_DATA = 'SET_DATA'

export const increment = () => ({
    type: SET_INCREMENT
})

export const incrementAsync = () => async (dispatch) => {
    await sleep(1000)
    dispatch(increment())
}

export const decrement = () => ({
    type: SET_DECREMENT
})

export const decrementAsync = () => async (dispatch) => {
    await sleep(1000)
    dispatch(decrement())
}

export const setData = data => ({
    type: SET_DATA,
    data
})

export const getData = () => async (dispatch) => {
    const data = await axios.get('/book/navigation')
    dispatch(setData(data.data.data))
}

