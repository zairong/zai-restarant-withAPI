<template>
  <div class="container py-5">
    <!--NavTabs是子組件  -->
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        最新動態
      </h1>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <h3>最新評論</h3>
          <!-- 最新評論 NewestComments-->
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>


<script>
import NavTabs from '@/components/NavTabs'
import NewestRestaurants from '@/components/NewestRestaurants'
import NewestComments from '@/components/NewestComments'
import Spinner from '@/components/Spinner'


export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  created() {
    this.fetchFeeds()
  },
  methods: {

    async fetchFeeds() {
      try {

        let result = await this.$api.reqGetRestaurantsfeeds()
        if(result.status=='success')
        this.restaurants = result.restaurants
        this.comments = result.comments
        this.isLoading = false

      } catch (error) {

        this.isLoading = false

        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>