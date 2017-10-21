import axios from 'axios'

const instance = axios.create({
    baseURL: !__DEV__ ? 'https://www.easy-mock.com/project/59e6fb7d750b1a6a0b9ad955' : false,
    timeout: 5000
})

export default instance