<template>
  <div class="container py-5">
    <NavBar/>
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <div class="row text-center">
      <div class="col-3" v-for="user in users" :key="user.id">
        <a href="#">
          <img :src="user.image" width="200px" height="200px">
        </a>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary">追蹤人數：{{ user.FollowerCount }}</span>
        <p class="mt-3">
          <button type="button" class="btn btn-danger" @click="deletefollow(user.id, user)" v-if="user.isFollowed">
            取消追蹤
          </button>
          <button v-else type="button" class="btn btn-primary" @click="addfollow(user.id, user)">
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from '@/utils/mixins'
export default {
  name: 'UsersTop',
  data() {
    return {
      "users": []
    }
  },
  components: {
  },
  mounted() {
    this.getUsersTopData() //常常忘了this,注意一下
  },
  methods: {
    //取得usersTopData
    async getUsersTopData() {

      try {
        let result = await this.$api.reqGetUersTop()
        console.log(result)
        this.users = result.users
      } catch (error) {
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人，請稍後再試'
        })
      }


    },
    async addfollow(userid, user) {
      try {
        let result = await this.$api.reqAddFollowing(userid)
        console.log(result)
        console.log(event.target.value)
        if (result.status == 'success')
          user.isFollowed = true
        user.FollowerCount = user.FollowerCount + 1
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deletefollow(userid, user) {
      try {
        let result = await this.$api.reqDeleteFollowing(userid)
        console.log(result)
        if (result.status == 'success')
          user.isFollowed = false
        user.FollowerCount = user.FollowerCount - 1



      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
  }
}
</script>