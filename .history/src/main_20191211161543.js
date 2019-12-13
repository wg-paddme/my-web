import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'

import store from './store'
import router from './router/index'
import
import './less/index.less'
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
