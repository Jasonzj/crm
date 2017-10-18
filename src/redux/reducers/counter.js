import { SET_INCREMENT, SET_DECREMENT } from 'action'

const counter = (state = 0, action) => {
    switch (action.type) {
        case SET_INCREMENT:
            return state + 1
        case SET_DECREMENT:
            return state - 1
        default:
            return state
    }
}

export default counter