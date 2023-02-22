import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const instanse = axios.create({
    baseURL: 'http://big-event-vue-api-t.itheima.net/'
})

instanse.interceptors.request.use(function (config) {
    if (store.state.myToken) {
        config.headers.Authorization = store.state.myToken
    }
    return config
},function (error) {
    return Promise.reject(error)
}

)


// 响应拦截
instanse.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.response.status === 401) {
        store.dispatch('setToken','')
        store.dispatch('setUserInfo',{})
        Message.error('身份过期，请重新登录')
        router.push('/login')
    }

    return Promise.reject(error);
  });

export default instanse