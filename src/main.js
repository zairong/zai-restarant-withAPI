import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import './assets/application.css'
//引入全局組件
import NavBar from "@/components/NavBar"
//註冊全局組件:參數1:全局組件的名字 參數2:哪一個組件
Vue.component('NavBar', NavBar)
//統一接收api文件裡的請求函數
import * as API from '@/api';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  //配置全域事件總線
  beforeCreate() {
    Vue.prototype.$bus = this //全局事件總線 ,$bus就是當前的vm
    Vue.prototype.$api = API;
  },

}).$mount('#app')
