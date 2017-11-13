export const isEmptyObject = (obj) => {
    if (Object.keys(obj).length) {
        return false
    }
    return true
}

export const getTime = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}