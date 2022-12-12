import {reqGetALLRestaurantsCategories} from '@/api'
const state = {
  Categories:[]
}
const mutations = {
  GETALLRESTAURNTSCATEGORIES(state,Categories){
    state.Categories = Categories
  }
}
const actions = {
  //
  async GetALLRestaurantsCategories({commit}){
    let result= await reqGetALLRestaurantsCategories()
    console.log( '@@@@@@123',result)
    commit('GETALLRESTAURNTSCATEGORIES', result)
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}