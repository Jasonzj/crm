const sleep = time => new Promise((res, rej) => (
    setTimeout(() => {
        res()
    }, time)
))

export default sleep