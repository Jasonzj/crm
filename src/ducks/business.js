import createAsyncAction from 'utils/createAsyncAction'
import {
    addBusiness,
    editBusiness,
    deleteBusiness,
    getBusinessPage,
    getUserBusiness,
    getCompanyBusiness,
} from 'utils/api'


// Types
export const types = {
    SET_BUSINESS:    'business/SET_BUSINESS',
    UPDATE_BUSINESS: 'business/UPDATE_BUSINESS',
    CREATE_BUSINESS: 'business/CREATE_BUSINESS',
}


// Actions
export const syncActions = {
    updateBusiness: data => ({ type: types.UPDATE_BUSINESS, data }),
    setBusiness: ({ data, total }) => ({ type: types.SET_BUSINESS, data, total }),
}

export const actions = {
    aCreateBusiness: createAsyncAction({
        method: 'post',
        api: addBusiness,
        text: '创建失败！请重试'
    }),
    aGetBusinessPage: createAsyncAction({
        method: 'get',
        api: getBusinessPage,
        text: '获取商机失败！请重试',
        action: syncActions.setBusiness
    }),
    aUpdateBusiness: createAsyncAction({
        method: 'post',
        api: editBusiness,
        text: '修改商机失败！请重试',
        action: syncActions.updateBusiness,
        isResult: true,
        isEdit: true,
    }),
    aDeleteBusiness: createAsyncAction({
        method: 'post',
        api: deleteBusiness,
        text: '删除商机失败！请重试'
    }),
    aSearchUserBusiness: createAsyncAction({
        method: 'get',
        api: getUserBusiness,
        text: '搜索商机失败！请重试',
        action: syncActions.setBusiness
    }),
    aSearchCompanyBusiness: createAsyncAction({
        method: 'get',
        api: getCompanyBusiness,
        text: '搜索商机失败！请重试',
        action: syncActions.setBusiness
    })
}


// Reducer
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
            if (state.id != data.id) {
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