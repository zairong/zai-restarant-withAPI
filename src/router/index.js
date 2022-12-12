import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'
import store from '@/store'
Vue.use(VueRouter)
//獲取原push
const originalPush = VueRouter.prototype.push
//修改push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes,
})
//守衛
router.beforeEach(async (to, from, next) => {
  let tokenInLocalStorage = localStorage.getItem('TOKEN')
  const tokenInStore = store.state.user.token
  let isAuthenticated = store.state.user.isAuthenticated
  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    // 成功返回true,失敗返回false
    isAuthenticated = await store.dispatch('user/getUserInfo') 
    console.log('我有token,當路由跳轉或重整,資料丟失,重新給我一份')
  }
   // 對於不需要驗證 token 的頁面
   const pathsWithoutAuthentication = ['signup', 'signin']

   // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
   // 如果 token 有效則轉址到餐廳首頁
   if (isAuthenticated && to.name === 'signin') {
    next('/restaurants')
    return
  }
  // 如果 token 有效則轉址到餐廳首頁
  next()
}
)

export default router
