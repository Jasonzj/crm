import instance from 'utils/instance'
import { signIn } from 'utils/api'
import { message as Msg } from 'antd'

// Action
export const types = {
    SET_SIGN_IN:   'app/SET_SIGN_IN',
    SET_SIGN_OUT:  'app/SET_SIGN_OUT',
    SET_ERROR:     'app/SET_ERROR',
    START_FETCH:   'app/START_FETCH',
    FINISH_FETCH:  'app/FINISH_FETCH',
    START_LOADER:  'app/START_LOADER',
    FINISH_LOADER: 'app/FINISH_LOADER',
}

// Action Creators
export const actions = {
    setSignIn: data => ({ type: types.SET_SIGN_IN, data }),
    setSignOut: () => ({ type: types.SET_SIGN_OUT }),
    startFetch: () => ({ type: types.START_FETCH }),
    finishFetch: () => ({ type: types.FINISH_FETCH }),
    setError: error => ({ type: types.SET_ERROR, data: error }),
    aSignIn: values => async (dispatch) => {
        try {
            dispatch(actions.startFetch())
            const result = await instance.post(signIn, values)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.setSignIn(result.data))
            dispatch(actions.finishFetch())
            return result
        } catch (err) {
            console.error(err)
            Msg.error('登入失败！请重试')
            dispatch(actions.finishFetch())
        }
    }
}

const initialState = {
    isFetching: false,
    signIn: false,
    user: {}
}

// Reducer
export default (state = initialState, action) => {
    const data = action.data
    switch (action.type) {
        case types.START_FETCH:
            return { ...state, isFetching: true }

        case types.FINISH_FETCH:
            return { ...state, isFetching: false }

        case types.SET_SIGN_IN:
            return {
                ...state,
                signIn: data.success,
                user: data.data
            }

        case types.SET_SIGN_OUT:
            return { ...state, signIn: false }

        default:
            return state
    }
}