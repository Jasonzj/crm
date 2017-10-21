import instance from 'utils/instance'
import { getUserListPage } from 'utils/api'

// Actions
export const types = {
    SET_USERLISTS: 'userManage/SET_USERLISTS'
}

// Action Creators
export const actions = {
    setUserLists: data => ({
        type: types.SET_USERLISTS,
        data
    }),
    getUserListPage: page => async (dispatch) => {
        const data = await instance.get(getUserListPage(page))
        dispatch(actions.setUserLists(data.data.data))
    }
}

const initialState = {
    userLists: []
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USERLISTS:
            return {
                ...state,
                userLists: action.data
            }
        default:
            return state
    }
}