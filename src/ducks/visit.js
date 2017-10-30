import instance from 'utils/instance'
import { actions as appActions } from './app'
import { message as Msg } from 'antd'
import { getVisitPage, getUserVisit, getCompanyVisit, deleteVisit, editorVisit, addVisit } from 'utils/api'

export const types = {
    SET_VISITS:   'visit/SET_VISITS',
    UPDATE_VISIT: 'visit/UPDATE_VISIT',
    CREATE_VISIT: 'visit/CREATE_VISIT',
}

export const actions = {
    updateVisit: data => ({ type: types.UPDATE_VISIT, data }),
    setVisits: ({ data, total }) => ({ type: types.SET_VISITS, data, total }),
    aGetVisitPage: page => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getVisitPage(page))
            !result.data.success && Msg.error('Not Data!')
            dispatch(actions.setVisits(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error('获取拜访列表失败！请重试')
            dispatch(appActions.finishFetch())
        }
    },
    aCreateVisit: data => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.post(addVisit, data)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(appActions.finishFetch())
            return result.data
        } catch (err) {
            console.error(err)
            Msg.error(err)
            dispatch(appActions.finishFetch())
        }
    },
    aSearchUserVisit: name => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getUserVisit(name))
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.setVisits(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error('搜索拜访失败！请重试')
            dispatch(appActions.finishFetch())
        }
    },
    aSearchCompanyVisit: name => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.get(getCompanyVisit(name))
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.setVisits(result.data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error('获取拜访失败！请重试')
            dispatch(appActions.finishFetch())
        }
    },
    aDeleteVisit: data => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.post(deleteVisit, data)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(appActions.finishFetch())
            return result
        } catch (err) {
            console.error(err)
            Msg.error('删除拜访失败！请重试')
            dispatch(appActions.finishFetch())
        }
    },
    aUpdateVisit: data => async (dispatch) => {
        try {
            dispatch(appActions.startFetch())
            const result = await instance.post(editorVisit, data)
            const { success, message } = result.data
            success ? Msg.info(message) : Msg.error(message)
            dispatch(actions.updateVisit(data))
            dispatch(appActions.finishFetch())
        } catch (err) {
            console.error(err)
            Msg.error('修改拜访失败！请重试')
            dispatch(appActions.finishFetch())
        }
    },
}

const initialState = {
    total: null,
    visits: [],
}

const handle = (state, action) => {
    const data = action.data
    switch (action.type) {
        case types.SET_VISITS:
            return {
                ...state,
                key: state.uid
            }

        case types.UPDATE_VISIT:
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
        case types.SET_VISITS:
            return {
                ...state,
                total: action.total,
                visits: action.data.map(item => handle(item, action))
            }

        case types.UPDATE_VISIT:
            return {
                ...state,
                visits: state.visits.map(item => handle(item, action))
            }

        default:
            return state
    }
}