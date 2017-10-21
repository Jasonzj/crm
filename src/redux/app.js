// Action
export const types = {
    START_FETCH:  'app/START_FETCH',
    FINISH_FETCH: 'app/FINISH_FETCH',
    SET_ERROR:    'app/SET_ERROR'
}

// Action Creators
export const actions = {
    startFetch: () => ({ type: types.START_FETCH }),
    finishFetch: () => ({ type: types.FINISH_FETCH }),
    setError: error => ({ type: types.SET_ERROR, data: error })
}

const initialState = {
    isFetching: false,
    error: null
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCH:
            return { ...state, isFetching: true }
        case types.FINISH_FETCH:
            return { ...state, isFetching: false }
        case types.SET_ERROR:
            return { ...state, error: action.data }
        default:
            return state
    }
}