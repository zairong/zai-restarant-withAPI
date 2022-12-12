import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from '@/store/user'
import restaurants from '@/store/restaurants'

export default new Vuex.Store({
  modules: {
    user,
    restaurants
  }
})