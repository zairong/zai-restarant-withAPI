import { reqGetUerInfo } from '@/api'
const state = {
  userInfo: {},
  isAuthenticated: false,
  token: ''
}
const mutations = {
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
    state.token = localStorage.getItem('TOKEN')
    state.isAuthenticated = true
  },

  revokeAuthentication(state) {
    localStorage.removeItem('TOKEN')
    state.userInfo = {}
    state.token = ''
    state.isAuthenticated = false
  }
}
const actions = {
  async getUserInfo({ commit }) {
    try {
      let result = await reqGetUerInfo()
      console.log('當前登入者資料', result)
      commit('GETUSERINFO', result)
      return true
    } catch (error) {

      console.log(error, '尚未登入,請先登入或註冊')
      // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
      // commit('revokeAuthentication')
      return false
    }
  },


}
const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}