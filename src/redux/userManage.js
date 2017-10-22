import instance from 'utils/instance'
import { getUserListPage } from 'utils/api'
import { actions as appActions } from './app'

// Actions
export const types = {
    SET_USERLISTS: 'userManage/SET_USERLISTS'
}

// Action Creators
export const actions = {
    setUserLists: ({ data, total, currentPage }) => ({
        type: types.SET_USERLISTS,
        data,
        total
    }),
    getUserListPage: page => async (dispatch) => {
        dispatch(appActions.startFetch())
        const data = await instance.get(getUserListPage(page))
        dispatch(actions.setUserLists(data.data))
        dispatch(appActions.finishFetch())
    }
}

const initialState = {
    total: null,
    userLists: []
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USERLISTS:
            return {
                ...state,
                total: action.total,
                userLists: action.data.map(item => ({ ...item, key: item.id }))
            }
        default:
            return state
    }
}