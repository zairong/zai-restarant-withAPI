import requests from "./ajax"

//登入請求
export const reqSignIn = (data) => {
  return requests({ url: '/signin', method: 'post', data })
}
//取得餐廳請求
export const reqGetRestaurants = ({ page, categoryId }) => {
  const searchParams = new URLSearchParams({ page, categoryId }).toString()
  return requests({
    url: `/restaurants?${searchParams}`,
    method: 'get',
    
  })
}
//取得餐廳清單
export const reqGetRestaurantsfeeds = () => {
  return requests({
    url: `/restaurants/feeds`,
    method: 'get',
     //每個網頁都要
  })
}
//加入最愛
export const reqAddFavorite = (restaurantId) => {
  return requests({
    method: 'post',
    url: `/favorite/${restaurantId}`,
    data: null,//post需要帶入data,不帶則寫null
    
  })
}
//移除最愛
export const reqDeleteFavorite = (restaurantId) => {
  return requests({
    url: `/favorite/${restaurantId}`,
    method: 'delete',
    
  })
}
//加入喜歡
export const reqAddLike = (restaurantId) => {
  return requests({
    method: 'post',
    url: `/like/${restaurantId}`,
    data: null,//post需要帶入data,不帶則寫null
    
  })
}
//移除喜歡
export const reqDeleteLike = (restaurantId) => {
  return requests({
    url: `/like/${restaurantId}`,
    method: 'delete',
    
  })
}
//取得美食達人資料
export const reqGetUersTop = () => {
  return requests({
    url: '/users/top',
    method: 'get',
    
  })
}
//美食達人加入追蹤
export const reqAddFollowing = (userId) => {
  return requests({
    method: 'post',
    url: `/following/${userId}`,
    
  })
}
//美食達人移除追蹤
export const reqDeleteFollowing = (userId) => {
  return requests({
    url: `/following/${userId}`,
    method: 'delete',
    
  })
}
//取得餐廳TOP餐廳TOP資料
export const reqGetRestaurantsTop = () => {
  return requests({
    url: '/restaurants/top',
    method: 'get',
    
  })
}
//取得全部餐廳類別 admin/categories get
export const reqGetALLRestaurantsCategories = () => {
  return requests({
    url: 'admin/categories',
    method: 'get',
    
  })
}
//新增餐廳資料 /admin/restaurants post
export const reqCreateRestaurant = (data) => {
  return requests({
    url: '/admin/restaurants',
    method: 'post',
    data,
    
  })
}
//取得後台餐廳清單
export const reqGetALLRestaurantsForm = () => {
  return requests({
    url: 'admin/restaurants',
    method: 'get',
    
  })
}
//刪除後台餐廳清單
export const reqDeleteRestaurantsForm = (id) => {
  return requests({
    url: `admin/restaurants/${id}`,
    method: 'delete',
    
  })
}
//取得個別餐廳數據
export const reqGetRestaurantsFormById = (id) => {
  return requests({
    url: `admin/restaurants/${id}`,
    method: 'get',
    
  })
}
//傳送修改表單數據
export const reqChangeRestaurantData = (id, data) => {
  return requests({
    url: `/admin/restaurants/${id}`,
    method: 'put',
    data,
    
  })
}
//傳送註冊表單資料 post
export const reqSendSignUpFormData = (data) => {
  return requests({
    url: `/signup`,
    method: 'post',
    data,
    
  })
}
//取得餐廳後台類別資料
export const reqGetRestaurantsCategories = () => {
  return requests({
    url: `admin/categories`,
    method: 'get',
    
  })
}

//新增餐廳類別 /admin/categories post
export const reqCreateRestaurantCategories = (data) => {
  return requests({
    url: '/admin/categories',
    method: 'post',
    data,
    
  })
}
//刪除餐廳類別
export const reqDelteRestaurantCategories = (id) => {
  return requests({
    url: `/admin/categories/${id}`,
    method: 'delete',
    
  })
}
//傳送修改後餐廳類別數據
export const reqChangeRestaurantCategories = ( categoryId, name ) => {
  return requests({
    url: `/admin/categories/${categoryId}`,
    method: 'put',
    data:{name},
    
  })
}
//取得用戶詳細資料
export const reqGetUerAllInfo = (id) =>{
  return requests({
    url:`/users/${id}`,
    method:'GET',
    
  })
}

//取得用戶資料
export const reqGetUerInfo = () =>{
  return requests({
    url:`/get_current_user`,
    method:'GET',
    
  })
}
//取得餐廳資料
export const reqGetRestaurantsById = (id) =>{
  return requests({
    url:`/restaurants/${id}`,
    method:'GET',
    
  })
}

//移除評論
export const reqDeleteComment = (id) =>{
  return requests({
    url:`/comments/${id}`,
    method:'delete',
    
  })
}
//新增評論
export const reqAddComment = (data) =>{
  return requests({
    url:`/comments/`,
    method:'post',
    data,
    
  })
}
//更新使用者資料
export const reqUpdateUerInfo = (userId, formData) =>{
  return requests({
    url:`/users/${userId}`,
    method:'put',
    formData,
    
  })
}
//變更使用者權限
export const reqUpdateAdminUerInfo = (userId, data) =>{
  return requests({
    url:`/admin/users/${userId}`,
    method:'put',
    data,
  })
}
//
export const reqGetAdminUerInfo = () =>{
  return requests({
    url:`/admin/users`,
    method:'get',
    
  })
}













