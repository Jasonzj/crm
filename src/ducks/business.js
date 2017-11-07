import instance from 'utils/instance'
import { actions as appActions } from './app'
import { message as Msg } from 'antd'
import {
    addBusiness,
    editBusiness,
    deleteBusiness,
    getBusinessPage,
    getUserBusiness,
    getCompanyBusiness,
} from 'utils/api'

export const types = {
    SET_BUSINESS:    'business/SET_BUSINESS',
    UPDATE_BUSINESS: 'business/UPDATE_BUSINESS',
    CREATE_BUSINESS: 'business/CREATE_BUSINESS',
}

export const actions = {
    updateBusiness: data => ({ type: types.UPDATE_BUSINESS, data }),
    setBusiness: ({ data, total }) => ({ type: types.SET_BUSINESS, data, total }),
    aCreateBusiness: data => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.post(addBusiness, data)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(appActions.finishFetch())
            return result.data
        } catch (err) {
            console.error(err)
            Msg.error('创建失败！请重试')
            dispatch(appActions.finishFetch())
        }
    },
    aGetBusinessPage: page => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getBusinessPage(page))
            !result.data.success && Msg.error('Not Data!')
            dispatch(actions.setBusiness(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error('获取商机失败！请重试')
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
            Msg.error('修改商机失败！请重试')
            dispatch(appActions.finishFetch())
        }
    },
    aDeleteBusiness: data => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.post(deleteBusiness, data)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(appActions.finishFetch())
            return result
        } catch (err) {
            console.error(err)
            Msg.error('删除商机失败！请重试')
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
            Msg.error('搜索商机失败！请重试')
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
            Msg.error('搜索商机失败！请重试')
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

        default:
            return state
    }
}