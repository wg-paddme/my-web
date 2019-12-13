import request from '@/utils/request'

export function getInfo() {
    return request({
        url: '/user/infos',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
