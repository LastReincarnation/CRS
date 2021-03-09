import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxiosPlugin from 'vue-axios-plugin';
import axios from 'axios'
import router from "./router";
import './mock/index'
import './mock/carList'
//城市选择器
// import VueAreaLinkage from 'vue-area-linkage'

Vue.prototype.$axios = axios
// 使用插件
require('./mock')
Vue.use(VueAxiosPlugin)
Vue.use(ElementUI)
// Vue.use(VueAreaLinkage)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
