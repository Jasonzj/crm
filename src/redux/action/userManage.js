import axios from 'axios'

// action type
import { SET_USERLIST } from 'action'

// api
import { getUserListPage } from 'utils/api'

export const setUserList = data => ({
    type: SET_USERLIST,
    data
})

export const getUserList = page => async (dispatch) => {
    const data = await axios.get(getUserListPage(page))
    dispatch(setUserList(data.data.data))
}