import Vue from 'vue'
import axios from 'axios' 
import mintUI from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.prototype.$http = axios
Vue.use(mintUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
