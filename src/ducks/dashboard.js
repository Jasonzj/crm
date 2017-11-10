import { getDashBoardData } from 'utils/api'
import createAsyncAction from 'utils/createAsyncAction'

// Action
export const types = {
    SET_DATA: 'app/SET_DATA',
}

// Action Creators
export const syncActions = {
    setData: data => ({ type: types.SET_DATA, data })
}

export const actions = {
    aSetData: createAsyncAction({
        method: 'get',
        api: getDashBoardData,
        action: syncActions.setData,
        text: '获取数据失败! 请刷新重试'
    })
}

const initialState = {
    numbers: {},
    visit: []
}

// Reducer
export default (state = initialState, action) => {
    const data = action.data
    switch (action.type) {
        case types.SET_DATA:
            return {
                ...action.data.data
            }

        default:
            return state
    }
}