import instanse from '../index'

export function getUserInfo() {
    return instanse({
        url: 'my/userinfo',
        method: 'GET'

    })
}


export function getSideInfo() {
    return instanse({
        url: 'my/menus',
        method: 'GET'

    })
}

export function updataUserInfo({ id, nickname, email }) {
    return instanse({
        url: 'my/userinfo',
        method: 'PUT',
        data: {
            id,
            nickname,
            email
        }
    })
}
0
export function uploadAvatar(avatar) {
    return instanse({
        url: 'my/update/avatar',
        method: 'PATCH',
        data: {
            avatar
        }
    })
}

export function updatePwd({ old_pwd, new_pwd, re_pwd }) {
    return instanse({
        url: 'my/updatepwd',
        method: 'PATCH',
        data: {
            old_pwd,
            new_pwd,
            re_pwd
        }
    })
}

export function addArticle({ cate_name, cate_alias }) {
    return instanse({
        url: 'my/cate/add',
        method: 'POST',
        data: {
            cate_name, cate_alias
        }
    })
}

export function getCateList() {
    return instanse({
        url: 'my/cate/list',
        method: 'GET'
    })
}
export function updateList({ id, cate_name, cate_alias }) {
    return instanse({
        url: 'my/cate/info',
        method: 'PUT',
        data: {
            id, cate_name, cate_alias
        }
    })
}

export function deleteCate(id) {
    return instanse({
        url: 'my/cate/del',
        method: 'DELETE',
        params: {
            id
        }
    })
}

export function addArticleList(fd) {
    return instanse({
        url: 'my/article/add',
        method: 'POST',
        data: fd
    })
}