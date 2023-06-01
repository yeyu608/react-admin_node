import axios from 'axios'

let baseURL = 'http://localhost:8080/api/users'
let baseURL1 = 'http://www.codeman.ink:3000'

const instance = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    
})

const { CancelToken, isCancel } = axios

let cancel

// 请求拦截
instance.interceptors.request.use(
    config => {
        if(sessionStorage.getItem('user')){
            let token = sessionStorage.getItem('user').token
            token && (config.headers.Authorization = token)
        }
       
        // 进行多个网址代理
        switch(config.typeUrl){
            case 'USER':
                config.url = baseURL + config.url;
                break;
            case 'STREAM':
                config.url = baseURL1 + config.url
        }
       // console.log(config)
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