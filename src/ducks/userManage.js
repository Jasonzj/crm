import createAsyncAction from 'utils/createAsyncAction'
import {
    editorUser,
    searchUser,
    deleteUser,
    editorVisit,
    deleteVisit,
    getUserVisit,
    editBusiness,
    getUserListUid,
    deleteBusiness,
    getUserBusiness,
    getCompanyVisit,
    getUserListPage,
} from 'utils/api'

// Types
export const types = {
    SET_USER:        'userManage/SET_USER',
    SET_USERLISTS:   'userManage/SET_USERLISTS',
    SET_BUSSINESS:   'userManage/SET_BUSSINESS',
    UPDATE_USER:     'userManage/UPDATE_USER',
    UPDATE_BUSINESS: 'userManage/UPDATE_BUSINESS',
    DELETE_BUSINESS: 'userManage/DELETE_BUSINESS',
    SET_VISITS:      'userManage/SET_VISITS',
    UPDATE_VISIT:    'userManage/UPDATE_VISIT',
    DELETE_VISIT:    'userManage/DELETE_VISIT',
}


// Action
export const syncActions = {
    updateUser: data => ({ type: types.UPDATE_USER, data }),
    getUserDetail: data => ({ type: types.SET_USER, data }),
    updateVisit: data => ({ type: types.UPDATE_VISIT, data }),
    deleteVisit: data => ({ type: types.DELETE_VISIT, data }),
    deleteBusiness: data => ({ type: types.DELETE_BUSINESS, data }),
    updateBusiness: data => ({ type: types.UPDATE_BUSINESS, data }),
    setVisit: ({ data, total }) => ({ type: types.SET_VISITS, data, total }),
    setBusiness: ({ data, total }) => ({ type: types.SET_BUSSINESS, data, total }),
    setUserLists: ({ data, total }) => ({ type: types.SET_USERLISTS, data, total }),
}

export const actions = {
    agetUserDetail: createAsyncAction({
        method: 'get',
        api: getUserListUid,
        text: '获取用户详情失败！请重试',
        action: syncActions.getUserDetail
    }),
    aGetUserListPage: createAsyncAction({
        method: 'get',
        api: getUserListPage,
        text: '获取用户列表失败！请重试',
        action: syncActions.setUserLists
    }),
    aSearchUser: createAsyncAction({
        method: 'get',
        api: searchUser,
        text: '搜索用户失败！请重试',
        action: syncActions.setUserLists
    }),
    aUpdateUser: createAsyncAction({
        method: 'post',
        api: editorUser,
        text: '修改用户资料失败！请重试',
        action: syncActions.updateUser,
        isResult: true
    }),
    aDeleteUser: createAsyncAction({
        method: 'post',
        api: deleteUser,
        text: '删除用户失败！请重试',
        action: syncActions.deleteUser,
        isResult: true
    }),
    aGetUserBusiness: createAsyncAction({
        method: 'get',
        api: getUserBusiness,
        text: '获取用户商机失败！请重试',
        action: syncActions.setBusiness,
    }),
    aDeleteBusiness: createAsyncAction({
        method: 'post',
        api: deleteBusiness,
        text: '删除商机失败！请重试',
        action: syncActions.deleteBusiness,
        isResult: true
    }),
    aUpdateBusiness: createAsyncAction({
        method: 'post',
        api: editBusiness,
        text: '修改商机失败！请重试',
        action: syncActions.updateBusiness,
        isResult: true
    }),
    aGetUserVisit: createAsyncAction({
        method: 'get',
        api: getUserVisit,
        text: '获取用户拜访失败！请重试',
        action: syncActions.setVisit,
    }),
    aUpdateVisit: createAsyncAction({
        method: 'post',
        api: editorVisit,
        text: '修改拜访失败！请重试',
        action: syncActions.updateVisit,
        isResult: true
    }),
    aDeleteVisit: createAsyncAction({
        method: 'post',
        api: deleteVisit,
        text: '删除商机失败！请重试',
        action: syncActions.deleteVisit,
        isResult: true
    })
}

const initialState = {
    total: null,
    bTotal: null,
    vTotal: null,
    userLists: [],
    business: [],
    visit: [],
    currentUser: {}
}

const handle = (state, action) => {
    const data = action.data
    switch (action.type) {
        case types.UPDATE_USER:
            if (state.uid !== data.uid) {
                return state
            }

            return {
                ...state,
                ...data
            }

        case types.SET_USERLISTS:
            return {
                ...state,
                key: state.uid
            }

        case types.SET_VISITS: return {
            ...state,
            key: state.id
        }

        case types.UPDATE_VISIT:
            if (state.id !== data.id) {
                return state
            }

            return {
                ...state,
                ...data
            }

        case types.DELETE_VISIT:
            return !data.deleteId.includes(state.uid)

        case types.SET_BUSSINESS:
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

        case types.SET_BUSSINESS:
            return {
                ...state,
                bTotal: action.total,
                business: action.data.map(item => handle(item, action))
            }

        case types.SET_VISITS:
            return {
                ...state,
                vTotal: action.total,
                visits: action.data.map(item => handle(item, action))
            }

        case types.DELETE_VISIT:
            return {
                ...state,
                visits: state.visits.filter(item => handle(item, action))
            }

        case types.UPDATE_VISIT:
            return {
                ...state,
                visits: state.visits.map(item => handle(item, action))
            }

        case types.SET_USER:
            return {
                ...state,
                currentUser: action.data.data
            }

        case types.SET_USERLISTS:
            return {
                ...state,
                total: action.total,
                userLists: action.data.map(item => handle(item, action))
            }

        case types.UPDATE_USER:
            return {
                ...state,
                userLists: state.userLists.map(item => handle(item, action))
            }

        default:
            return state
    }
}