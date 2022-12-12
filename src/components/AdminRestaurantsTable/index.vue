<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th scope="col" width="300">
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link class="btn btn-link" :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }">
            Show
          </router-link>
          <router-link :to="{ name: 'admin-restaurant-edit', params: { id: restaurant.id } }" class="btn btn-link">
            Edit</router-link>

          <button type="button" class="btn btn-link" @click="deleteRestaurant(restaurant.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'AdminRestaurantsTable',
  data() {
    return {
      restaurants: []
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    async fetchRestaurants() {
      try {
        let result = await this.$api.reqGetALLRestaurantsForm()
        console.log(result)
        this.restaurants = result.restaurants
      } catch (error) {
        console.log(error)
      }

    },
    async deleteRestaurant(restaurantId) {
      // this.restaurants = this.restaurants.filter(
      //   restaurant => restaurant.id !== restaurantId
      // )
      let result = await this.$api.reqDeleteRestaurantsForm(restaurantId)
      console.log(result)
      this.fetchRestaurants()//重新刷新頁面
    }
  }

}
</script>