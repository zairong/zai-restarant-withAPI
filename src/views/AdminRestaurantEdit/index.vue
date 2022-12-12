<template>
  <div class="container py-5">
    <AdminRestaurantForm @after-submit="handleAfterSubmit" :initialRestaurant="restaurant" :isProcessing="isProcessing"/>
  </div>
</template>

<script>
import AdminRestaurantForm from '@/components/AdminRestaurantForm'
import { Toast } from '@/utils/mixins'
export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      isProcessing: false//防重複快速點擊
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  //監聽路由跳轉
  beforeRouteUpdate(to,from,next){
    const {id} = to.params//去哪個路徑
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    //傳送修改表單數據
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true
        let result = await this.$api.reqChangeRestaurantData(this.restaurant.id, formData )//id 不是用this.$route.params 花了我2小時找 掯!!!
        console.log(result)
        if (result.status === 'error') {
          throw new Error(result.message)
        }
        this.$router.push('/admin/restaurants')

      } catch (error) {
        this.isProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
    },
    //取得餐廳清單
    async fetchRestaurant(id) {
      let result = await this.$api.reqGetRestaurantsFormById(id)
      // console.log(result)
      this.restaurant = result.restaurant
    }
  }
}
</script>