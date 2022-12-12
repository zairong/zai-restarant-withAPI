<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">
      餐廳評論網
    </router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!--後台權限-->
        <router-link to="/admin" class="text-white mr-3" v-if="userInfo.isAdmin || yesOrNoLogin">
          管理員後台
        </router-link>
        <!-- 登入狀態 -->
        <template>
          <!-- is user is login -->
          <router-link  :to="{ name: 'users', params: { id: userInfo.id } }" class="text-white mr-3" v-if="userInfo.isAdmin || yesOrNoLogin">
            使用者 您好
          </router-link>
          <button v-if="userInfo.isAdmin || yesOrNoLogin" type="button"
            class="btn btn-sm btn-outline-success my-2 my-sm-0" @click="logOut">
            登出
          </button>
          <button v-else type="button"
            class="btn btn-sm btn-outline-success my-2 my-sm-0" @click="login">
            請登入
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
// seed data
export default {
  name: 'NavBar',
  data() {
    return {
      yesOrNoLogin: false
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  methods: {
    logOut() {
      this.$store.commit('user/revokeAuthentication')
      this.$router.push('/signin')
    },
    login() {
      this.yesOrNoLogin= true
      this.$router.push('/signin')
    },
  },




}
</script>


<style scoped>
  .navbar-toggler {
    min-width: 70px;
    margin-right: 0;
  }

  nav.bg-dark {
    padding: 14px 16px;
    background-color: #bd2333 !important;
  }

  .navbar-brand {
    font-size: 19px;
    padding: 0;
}
</style>