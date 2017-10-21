// Action
export const types = {
    LOG_OUT:      'app/LOG_OUT',
    SIGN_IN:      'app/SIGN_IN',
    SET_ERROR:    'app/SET_ERROR',
    START_FETCH:  'app/START_FETCH',
    FINISH_FETCH: 'app/FINISH_FETCH',
}

// Action Creators
export const actions = {
    signIn: () => ({ type: types.SET_ERROR }),
    logOut: () => ({ type: types.LOG_OUT }),
    startFetch: () => ({ type: types.START_FETCH }),
    finishFetch: () => ({ type: types.FINISH_FETCH }),
    setError: error => ({ type: types.SET_ERROR, data: error })
}

const initialState = {
    isFetching: false,
    signIn: false,
    error: null
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCH:
            return { ...state, isFetching: true }
        case types.FINISH_FETCH:
            return { ...state, isFetching: false }
        case types.SIGN_IN:
            return { ...state, signIn: true }
        case types.LOG_OUT:
            return { ...state, signIn: false }
        case types.SET_ERROR:
            return { ...state, error: action.data }
        default:
            return state
    }
}