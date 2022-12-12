<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initialRestaurant="restaurant" />
    <hr>
    <!-- 餐廳評論 RestaurantComments @after-delete-comment為自訂義名稱,afterDeleteComment是回調函數 -->
    <RestaurantComments :restaurantComments="restaurantComments" @after-delete-comment="afterDeleteComment" />
    <!-- 新增評論 CreateComment -->
    <CreateComment  :restaurant="restaurant"
        @after-create-comment="afterCreateComment"/>
  </div>
</template>

<script>
import RestaurantDetail from "@/components/RestaurantDetail"
import RestaurantComments from "@/components/RestaurantComments"
import CreateComment from "@/components/CreateComment"


export default {
  name: 'Restaurant',
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data() {
    return {
      restaurant: {},
      restaurantComments: [],
    }
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
   
    async fetchRestaurant(restaurantId) {
      let result = await this.$api.reqGetRestaurantsById(restaurantId)
      console.log(result)
      this.restaurant = result.restaurant
      this.restaurantComments = result.restaurant.Comments

    },
    afterDeleteComment(commentId){
      this.restaurantComments = this.restaurantComments.filter(
        comment => comment.id !== commentId
      )
    },
    afterCreateComment () {
      const { id: restaurantId } = this.$route.params
      this.fetchRestaurant(restaurantId)
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  
}
</script>