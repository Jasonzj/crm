const localStore = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    fetch(key) {
        return JSON.parse(localStorage.getItem(key)) || false
    }
}

export default localStore