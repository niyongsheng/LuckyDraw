import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "./lang/index";

import {message, Modal, notification} from 'ant-design-vue'
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$notification = notification

Vue.config.productionTip = false

new Vue({
  store,
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
