export const isEmptyObject = (obj) => {
    for (const key in obj) {
        return false
    }
    return true
}

export const getTime = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}