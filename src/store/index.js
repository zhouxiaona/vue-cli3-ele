import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import data from './modules/data'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    data
  },
  getters,
  plugins: [
    persistedState({
      storage: window.localStorage    
    })
  ]
})
