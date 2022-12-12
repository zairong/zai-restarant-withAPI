<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      人氣餐廳
    </h1>

    <hr>
    <div class="card mb-3" style="max-width: 540px;margin: auto;" v-for="restaurant in restaurants"
      :key="restaurant.id">
      <div class="row no-gutters">
        <div class="col-md-4">
          <a>
            <img class="card-img" :src="restaurant.image">
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge badge-secondary">收藏數：{{ restaurant.viewCounts }}</span>
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <a href="#" class="btn btn-primary mr-2">Show</a>

            <button type="button" class="btn btn-danger mr-2" v-if="restaurant.isFavorited"
              @click="deleteFavorite(restaurant.id,restaurant)">
              移除最愛
            </button>
            <button type="button" class="btn btn-primary" v-else @click="addFavorite(restaurant.id,restaurant)">
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '@/components/NavTabs'
export default {
  components: {
    NavTabs
  },
  created() {
    this.fetchRestaurants()
  },
  data() {
    return {
      restaurants: []
    }
  },
  methods: {
    //取得人氣餐廳資料
    async fetchRestaurants() {
      try {
        let result = await this.$api.reqGetRestaurantsTop()
        console.log(result)
        this.restaurants = result.restaurants
      } catch (error) {
        console.log(error)
      }
    },
    //加入最愛
    async addFavorite(id,restaurant) {
      try {
        let result = await this.$api.reqAddFavorite(id)
        console.log(result)
        if (result.status == 'success') {
          restaurant.isFavorited = true
        }
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
      }
    },
    //移除最愛
    async deleteFavorite(id,restaurant) {
      try {
        let result = await this.$api.reqDeleteFavorite(id)
        console.log(result)
        if (result.status == 'success') {
          restaurant.isFavorited = false
        }
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，請稍後再試'
        })
      }
    },

  }
}
</script>

<style>

</style>