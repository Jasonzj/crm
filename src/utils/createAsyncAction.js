import instance from './instance'
import { actions as appActions } from 'ducks/app'
import { message as Msg } from 'antd'

export default ({
    api,
    text,
    method,
    action,
    isEdit = false,
    isResult = false,
}) => arg => async (dispatch) => {
    try {
        dispatch(appActions.startFetch())
        const url = typeof api === 'function' ? api(arg) : api
        const data = method === 'post' ? arg : null
        const result = await instance[method](url, data)
        const { success, message } = result.data

        success
            ? message && Msg.info(message)
            : message && Msg.error(message)

        const payload = isEdit ? arg.emp : arg
        const actionData = isResult ? payload : result.data
        action && dispatch(action(actionData))
        dispatch(appActions.finishFetch())
        return result
    } catch (err) {
        console.erroe(err)
        Msg.error(text)
        dispatch(appActions.finishFetch())
    }
}
