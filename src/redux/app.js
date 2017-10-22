import instance from 'utils/instance'
import { signIn } from 'utils/api'

// Action
export const types = {
    SET_SIGN_IN:  'app/SET_SIGN_IN',
    SET_SIGN_OUT:  'app/SET_SIGN_OUT',
    SET_ERROR:    'app/SET_ERROR',
    START_FETCH:  'app/START_FETCH',
    FINISH_FETCH: 'app/FINISH_FETCH',
}

// Action Creators
export const actions = {
    setLogOut: () => ({ type: types.SET_SIGN_OUT }),
    setSignIn: data => ({ type: types.SET_SIGN_IN, data }),
    startFetch: () => ({ type: types.START_FETCH }),
    finishFetch: () => ({ type: types.FINISH_FETCH }),
    setError: error => ({ type: types.SET_ERROR, data: error }),
    login: values => async (dispatch) => {
        dispatch(actions.startFetch())
        const data = await instance.post(signIn, values)
        dispatch(actions.setSignIn(data.data))
        dispatch(actions.finishFetch())
        return data
    }
}

const initialState = {
    isFetching: false,
    signIn: false,
    error: null,
    user: {}
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCH:
            return { ...state, isFetching: true }
        case types.FINISH_FETCH:
            return { ...state, isFetching: false }
        case types.SET_SIGN_IN:
            return {
                ...state,
                signIn: action.data.success,
                user: { ...action.data.data }
            }
        case types.SET_SIGN_OUT:
            return { ...state, signIn: false }
        case types.SET_ERROR:
            return { ...state, error: action.data }
        default:
            return state
    }
}