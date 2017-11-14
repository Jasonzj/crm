import createAsyncAction from 'utils/createAsyncAction'
import {
    addVisit,
    deleteVisit,
    editorVisit,
    getVisitPage,
    getUserVisit,
    getCompanyVisit,
} from 'utils/api'


// Types
export const types = {
    SET_VISITS:   'visit/SET_VISITS',
    UPDATE_VISIT: 'visit/UPDATE_VISIT',
    CREATE_VISIT: 'visit/CREATE_VISIT',
}


// Actions
export const syncActions = {
    updateVisit: data => ({ type: types.UPDATE_VISIT, data }),
    setVisits: ({ data, total }) => ({ type: types.SET_VISITS, data, total }),
}

export const actions = {
    aGetVisitPage: createAsyncAction({
        method: 'get',
        api: getVisitPage,
        text: '获取拜访列表失败！请重试',
        action: syncActions.setVisits
    }),
    aCreateVisit: createAsyncAction({
        method: 'post',
        api: addVisit,
        text: '创建失败！请重试'
    }),
    aSearchUserVisit: createAsyncAction({
        method: 'get',
        api: getUserVisit,
        text: '搜索拜访失败！请重试',
        action: syncActions.setVisits
    }),
    aSearchCompanyVisit: createAsyncAction({
        method: 'get',
        api: getCompanyVisit,
        text: '获取拜访失败！请重试',
        action: syncActions.setVisits
    }),
    aDeleteVisit: createAsyncAction({
        method: 'post',
        api: deleteVisit,
        text: '删除拜访失败！请重试'
    }),
    aUpdateVisit: createAsyncAction({
        method: 'post',
        api: editorVisit,
        text: '修改拜访失败！请重试',
        action: syncActions.updateVisit,
        isResult: true,
        isEdit: true,
    })
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