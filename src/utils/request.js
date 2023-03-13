import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/users',
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})

const { CancelToken, isCancel } = axios

let cancel

// 请求拦截
instance.interceptors.request.use(
    config => {
        let token = localStorage.getItem('user').token
        token && (config.headers.Authorization = token)

        // 取消重复请求
        if (cancel) { cancel("取消重复请求") }

        config.cancelToken = new CancelToken(c => (cancel = c));
        return config
    },
    err => {
        return Promise.reject(err)
    })



// 响应拦截
instance.interceptors.response.use(response => {
    return response
}, err => {
    if (!window.navigator.onLine) {
        alert("请检查网络是否连接")
    }
    return Promise.reject(err)
})


export default instance