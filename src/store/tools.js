import { createVuexPersistedState } from "vue-persistedstate";

export default {
    plugins: [
        createVuexPersistedState({
          key: 'vuex',
          storage: window.localStorage,
          whiteList: [],
          blackList: [],
        }),
      ]
}