import { SET_USERLIST } from 'action'

const initState = {
    userList: [],
    businessList: []
}

const userManage = (state = initState, action) => {
    switch (action.type) {
        case SET_USERLIST:
            return {
                ...state,
                userList: action.data
            }
        default:
            return state
    }
}

export default userManage