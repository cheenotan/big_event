import instanse from '../index'

export function postRegister(url,data) {
    return instanse({
        url:url,
        method:'POST',
        data:data
    })
}

export function postLogin(url,data) {
    return instanse({
        url:url,
        method:'POST',
        data:data
    })
}