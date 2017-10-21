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
        const data = await axios.get(getUserListPage(page))
        dispatch(setUserList(data.data.data))
    }
}

// Reducer
export default (state = {}, action) => {
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