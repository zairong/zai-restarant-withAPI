<template>
  <div class="container py-5">

    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="row">
        <!-- 餐廳卡片 RestaurantCard-->
        <RestaurantCard :restaurant='restaurant' v-for="restaurant in restaurants" :key="restaurant.id" />
      </div>
      <!-- 分頁標籤 RestaurantPagination -->
      <RestaurantsPagination v-show="totalPage.length > 1" :currentPage="currentPage" :totalPage="totalPage"
        :categoryId="categoryId" :previousPage="previousPage" :nextPage="nextPage" />
    </template>
  </div>
</template>

<script>
import NavTabs from '@/components/NavTabs'
import RestaurantCard from '@/components/RestaurantCard'
import RestaurantsNavPills from '@/components/RestaurantsNavPills'
import RestaurantsPagination from '@/components/RestaurantsPagination'
import { Toast } from '@/utils/mixins'
import Spinner from '@/components/Spinner'
import { mapState } from 'vuex'


export default {
  name: 'Restaurants',
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
      isLoading: true
    }
  },
  created() {
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchRestaurants({ page, categoryId })
    this.$store.dispatch("restaurants/GetALLRestaurantsCategories")

  },
  beforeRouteUpdate(to, from, next) {
    const { page = '', categoryId = '' } = to.query
    console.log(page)
    this.fetchRestaurants({ page: page, categoryId: categoryId })//重新向伺服器發請求
    next()//通過
  },
  methods: {
    async fetchRestaurants({ page, categoryId }) {
      try {
        let result = await this.$api.reqGetRestaurants({ page, categoryId })
        // console.log(result)
        if(result.status=='success'){
          
        }
        this.restaurants = result.restaurants
        this.categories = result.categories
        this.categoryId = result.categoryId
        this.currentPage = result.page
        this.totalPage = result.totalPage
        this.previousPage = result.prev
        this.nextPage = result.next
        this.isLoading = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  },
  computed:{
    ...mapState('restaurants',['Categories'])
  }
}
</script>