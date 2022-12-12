<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm @after-submit="handleAfterSubmit" :isProcessing="isProcessing" />
  </div>
</template>

<script>
import AdminRestaurantForm from '@/components/AdminRestaurantForm'
export default {
  name: 'AdminRestaurantNew',
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        
        this.isProcessing = true
        let result = await this.$api.reqCreateRestaurant(formData)
        // 透過 API 將表單資料送到伺服器
        console.log(result)
        this.$router.push('/admin/restaurants')

      } catch (error) {
        this.isProcessing = false
        console.log(error)
      }

    }
  }
}
</script>

<style>

</style>