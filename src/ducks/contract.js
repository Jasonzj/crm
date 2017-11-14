import createAsyncAction from 'utils/createAsyncAction'
import {
    addContract,
    editContract,
    deleteContract,
    getContractPage,
    getUserContract,
    getContractDetail,
    getCompanyContract,
} from 'utils/api'


// Types
export const types = {
    SET_DETAIL:     'contract/SET_DETAIL',
    SET_CONTRACT:    'contract/SET_CONTRACT',
    DELETE_CONTRACT: 'contract/DELETE_CONTRACT',
    UPDATE_CONTRACT: 'contract/UPDATE_CONTRACT',
    CREATE_CONTRACT: 'contract/CREATE_CONTRACT',
}


// Actions
export const syncActions = {
    setDetail: data => ({ type: types.SET_DETAIL, data }),
    updateContract: data => ({ type: types.UPDATE_CONTRACT, data }),
    setContract: ({ data, total }) => ({ type: types.SET_CONTRACT, data, total }),
}

export const actions = {
    aGetContractPage: createAsyncAction({
        method: 'get',
        api: getContractPage,
        text: '获取合同失败！请重试',
        action: syncActions.setContract
    }),
    aSearchUserContract: createAsyncAction({
        method: 'get',
        api: getUserContract,
        text: '搜索合同失败！请重试',
        action: syncActions.setContract
    }),
    aSearchCompanyContract: createAsyncAction({
        method: 'get',
        api: getCompanyContract,
        text: '获取合同失败！请重试',
        action: syncActions.setContract
    }),
    aDeleteContract: createAsyncAction({
        method: 'post',
        api: deleteContract,
        text: '删除合同失败！请重试'
    }),
    aGetContractDetail: createAsyncAction({
        method: 'get',
        api: getContractDetail,
        text: '获取合同详情失败！请重试',
        action: syncActions.setDetail
    }),
    aUpdateContract: createAsyncAction({
        method: 'post',
        api: editContract,
        text: '修改合同失败！请重试',
        action: syncActions.updateContract,
        isResult: true,
        isEdit: true,
    }),
    aCreateContract: createAsyncAction({
        method: 'post',
        api: addContract,
        text: '创建失败！请重试',
    })
}


// Reducer
const initialState = {
    total: null,
    contracts: [],
    currentContract: {}
}

const handle = (state, action) => {
    const data = action.data
    switch (action.type) {
        case types.SET_CONTRACT:
            return {
                ...state,
                key: state.id
            }

        case types.UPDATE_CONTRACT:
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

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_CONTRACT:
            return {
                ...state,
                total: action.total,
                contracts: action.data.map(item => handle(item, action))
            }

        case types.SET_DETAIL:
            return {
                ...state,
                currentContract: action.data.data
            }

        case types.UPDATE_CONTRACT:
            return {
                ...state,
                contracts: state.contracts.map(item => handle(item, action))
            }

        default:
            return state
    }
}