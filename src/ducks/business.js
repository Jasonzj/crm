import instance from 'utils/instance'
import { deleteBusiness, editBusiness, getBusinessPage, getUserBusiness, getCompanyBusiness } from 'utils/api'
import { actions as appActions } from './app'
import { message as Msg } from 'antd'

export const types = {
    SET_BUSINESS:    'business/SET_BUSINESS',
    DELETE_BUSINESS: 'business/DELETE_BUSINESS',
    UPDATE_BUSINESS: 'business/UPDATE_BUSINESS',
}

export const actions = {
    deleteBusiness: data => ({ type: types.DELETE_BUSINESS, data }),
    updateBusiness: data => ({ type: types.UPDATE_BUSINESS, data }),
    setBusiness: ({ data, total }) => ({ type: types.SET_BUSINESS, data, total }),
    aGetBusinessPage: page => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getBusinessPage(page))
            !result.data.success && Msg.error('Not Data!')
            dispatch(actions.setBusiness(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error(err)
            dispatch(appActions.finishFetch())
        }
    },
    aUpdateBusiness: data => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.post(editBusiness, data)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.updateBusiness(data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error(err)
            dispatch(appActions.finishFetch())
        }
    },
    aDeleteBusiness: data => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.post(deleteBusiness, data)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.deleteBusiness(data))
            dispatch(appActions.finishFetch())
            return result
        } catch (err) {
            console.error(err)
            Msg.error(err)
            dispatch(appActions.finishFetch())
        }
    },
    aSearchUserBusiness: name => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getUserBusiness(name))
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.setBusiness(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error(err)
            dispatch(appActions.finishFetch())
        }
    },
    aSearchCompanyBusiness: name => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getCompanyBusiness(name))
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.setBusiness(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error(err)
            dispatch(appActions.finishFetch())
        }
    },
}

const initialState = {
    total: null,
    business: []
}

const handle = (state, action) => {
    const data = action.data
    switch (action.type) {
        case types.SET_BUSINESS:
            return {
                ...state,
                key: state.id
            }

        case types.UPDATE_BUSINESS:
            if (state.id !== data.id) {
                return state
            }

            return {
                ...state,
                ...data
            }

        case types.DELETE_BUSINESS:
            return !data.deleteId.includes(state.uid)

        default:
            return state
    }
}

// Reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_BUSINESS:
            return {
                ...state,
                total: action.total,
                business: action.data.map(item => handle(item, action))
            }

        case types.UPDATE_BUSINESS:
            return {
                ...state,
                business: state.business.map(item => handle(item, action))
            }

        case types.DELETE_BUSINESS:
            return {
                ...state,
                business: state.business.filter(item => handle(item, action))
            }

        default:
            return state
    }
}