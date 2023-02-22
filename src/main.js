import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// import getEle from '@/utils/ele.js'
import VueQuillEditor from 'vue-quill-editor'
 
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import './assets/reset.less'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
// Vue.prototype.$message = Message


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// getEle(Vue)

