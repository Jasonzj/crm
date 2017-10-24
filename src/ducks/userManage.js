import instance from 'utils/instance'
import { getUserListPage, editorUser } from 'utils/api'
import { actions as appActions } from './app'

// Actions
export const types = {
    SET_USERLISTS: 'userManage/SET_USERLISTS',
    UPDATE_USER: 'userManage/UPDATE_USER',
}

// Action Creators
export const actions = {
    setUserLists: ({ data, total, currentPage }) => ({
        type: types.SET_USERLISTS,
        data,
        total
    }),
    getUserListPage: page => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getUserListPage(page))
            dispatch(actions.setUserLists(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            dispatch(appActions.finishFetch())
        }
    },
    updateUser: data => async (dispatch) => {
        dispatch(appActions.startFetch())
        const result = await instance.post(editorUser, data)
        console.log(result)
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