import instance from './request'

export function userRegister(url, params) {
    return instance({
        url,
        method: 'POST',
        data: params
    })
    
}
export function userLogin(url, params) {
    return instance({
        url,
        method: 'POST',
        data: params
    })
}


export function userHome(url, params) {
    return instance({
        url,
        method: 'POST',
        data: params
    })
}

export function userUpload(url, params) {
    return instance({
        url,
        method: 'POST',
        data: params
    })
}


