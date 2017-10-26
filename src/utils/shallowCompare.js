const shallowCompare = (obj1, obj2) => {
    const keys = Object.keys(obj1)
    return !keys.every((key) => {
        const value = obj1[key]
        const nextValue = obj2[key]
        if (typeof value === 'function') return true
        return value === nextValue
    })
}

export default shallowCompare