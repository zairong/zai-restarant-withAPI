// 對於axios進行二次封裝
import axios from 'axios'
// 1. 利用axios物件的方法create，去創建一個axios實例
// 2. request就是axios，只不過稍微配置一下
//在當前模塊中引入store
// import store from '@/store'
const requests = axios.create({
  // 配置物件
  // 基礎路徑，發請求的時候，路徑當中會出現基礎api
  baseURL: '/api',
  // 代表請求超時的時間5s，在5s之內沒有回應就失敗了
  timeout: 5000,
})

// 請求攔截器:在發請求之前，請求攔截器可以檢測到，可以在請求發出去之前做一些事情
requests.interceptors.request.use((config) => {
  // 從 localStorage 將 token 取出
  const token = localStorage.getItem('TOKEN')

  // 如果 token 存在的話，則帶入到 headers 當中
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
},
  err => Promise.reject(err)
)

// 回應攔截器
requests.interceptors.response.use((res) => {
  // 成功的回呼函數：伺服器相應資料回來以後，相應攔截器可以檢測到，可以做一些事情


  return res.data //res => resolve

}, (error) => {
  // 伺服器回應失敗的回呼函數
  return Promise.reject(new Error('failed'))
})

// 對外暴露
export default requests;



