
import {getUserInfo} from '@/request/apis/home'

export default {
    setToken(ctx,payload) {
        ctx.commit('SET_TOKEN',payload)
    },
    setUserInfo(ctx,payload) {
        ctx.commit('SET_USERINFO',payload)

    },
    setSideInfo(ctx,payload) {
        ctx.commit('SET_SIDEINFO',payload)

    },
    getUserInfos(ctx){
        getUserInfo().then(res => {
            ctx.commit('GET_USER_INFO',res.data.data)
        })
    }
}