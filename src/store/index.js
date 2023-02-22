import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import { createVuexPersistedState } from "vue-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state, mutations, actions,
   plugins: [
    createVuexPersistedState({
      key: 'vuex',
      storage: window.localStorage,
      whiteList: [],
      blackList: [],
    }),
  ]
 
})
