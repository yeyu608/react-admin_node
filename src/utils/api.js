import instance from './request'

// 注册接口
export function userRegister(url, params, type) {
    return instance({
        url,
        method: 'POST',
        data: params,
        typeUrl: type
    })
}
// 登陆接口
export function userLogin(url, params, type) {
    return instance({
        url,
        method: 'POST',
        data: params,
        typeUrl: type
    })
}

export function userHome(url, params, type) {
    return instance({
        url,
        method: 'POST',
        data: params,
        typeUrl: type
    })
}

export function userUpload(url, params, type) {
    return instance({
        url,
        method: 'POST',
        data: params,
        typeUrl: type
    })
}
// 获取每日推荐歌单
export function everyDay_song(url, params, type) {
    return instance({
        url,
        method: 'POST',
        data: params,
        typeUrl: type
    })
}

