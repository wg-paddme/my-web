import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'

import store from './store'
import router from './router/index'
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
