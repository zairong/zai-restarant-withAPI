<template>
  <!-- v-on 來監聽 submit 事件 -->
  <form @submit.stop.prevent="handleSubmit" v-show="!isLoading">
    <div class="form-group">
      <label for="name">Name</label>
      <input id="name" v-model="restaurant.name" type="text" class="form-control" name="name" placeholder="Enter name"
        required>
    </div>

    <div class="form-group">
      <label for="categoryId">Category</label>
      <select id="categoryId" class="form-control" name="categoryId" required v-model="restaurant.categoryId">
        <option value="" selected disabled>
          --請選擇--
        </option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="tel">Tel</label>
      <input id="tel" type="text" v-model="restaurant.tel" class="form-control" name="tel"
        placeholder="Enter telephone number">
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input id="address" v-model="restaurant.address" type="text" class="form-control" placeholder="Enter address"
        name="address">
    </div>

    <div class="form-group">
      <label for="opening-hours">Opening Hours</label>
      <input id="opening-hours" type="time" class="form-control" name="opening_hours" v-model="restaurant.openingHours">
    </div>

    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" class="form-control" rows="3" name="description"
        v-model="restaurant.description"></textarea>

    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img v-if="restaurant.image" :src="restaurant.image" class="d-block img-thumbnail mb-3" width="200" height="200">
      <input id="image" type="file" name="image" accept="image/*" class="form-control-file" @change="handleFileChange">
    </div>

    <button type="submit" class="btn btn-primary" :disabled="isProcessing">
      {{ isProcessing ? "處理中..." : "送出" }}
    </button>
  </form>
</template>

<script>
import { Toast } from '@/utils/mixins'
export default {
  name: 'AdminRestaurantForm',
  data() {
    return {
      restaurant: {
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      categories: [],
      isLoading: true
    }
  },
  methods: {
    //取得全部餐廳類別
    async fetchCategories() {
      try {
        let result = await this.$api.reqGetALLRestaurantsCategories()
        // console.log(result)
        this.categories = result.categories
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        // console.log(error)
        console.log(error)
      }
    },
    handleFileChange(event) {
      const { files } = event.target
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.restaurant.image = ''
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.restaurant.image = imageURL
      }
    },
    //
    handleSubmit(event) {
      if (!this.restaurant.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫餐廳名稱'
        })
        return
      } else if (!this.restaurant.categoryId) {
        Toast.fire({
          icon: 'warning',
          title: '請選擇餐廳類別'
        })
        return
      }
      const form = event.target
      const formData = new FormData(form)
      console.log(formData)
      this.$emit('after-submit', formData)
    },
    
  },
  mounted() {
    this.fetchCategories()
    //空值
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant
    }

  },
  props: ['initialRestaurant', 'isProcessing'],
  //監測initialRestaurant
  watch: {
    initialRestaurant() {
      this.restaurant.name = this.initialRestaurant.name
      this.restaurant.categoryId = this.initialRestaurant.CategoryId
      this.restaurant.openingHours = this.initialRestaurant.opening_hours
      this.restaurant.tel = this.initialRestaurant.tel
      this.restaurant.address = this.initialRestaurant.address
      this.restaurant.description = this.initialRestaurant.description
    }
  },




}
</script>