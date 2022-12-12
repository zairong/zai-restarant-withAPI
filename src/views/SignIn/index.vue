<template>
  <div class="container py-5">
    <form class="w-100">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input id="email" name="email" type="email" class="form-control" placeholder="email" autocomplete="username"
          v-model="email" required autofocus>

      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" class="form-control" placeholder="Password"
          v-model="password" autocomplete="current-password" required>
      </div>
      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" @click.prevent="handleSubmit"
        :disabled="isProcessing">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup"> Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import { Toast, setToken } from '@/utils/mixins'
export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    //送出帳密給伺服器取得token
    async handleSubmit() {
      let data = {
        email: this.email,
        password: this.password
      }
      try {
        //是否填寫帳密
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          return
        }
        this.isProcessing = true
        let result = await this.$api.reqSignIn(data)
        console.log('提交帳密', result)
        if (result.status == 'success') {
          console.log('token',result.token)
          this.isProcessing = false

          setToken(result.token)//持久化存token
          
          this.$router.push('/restaurants')//跳轉路由
          return 'ok'
        }
      } catch (error) {
        // 顯示錯誤提示
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
        this.password = ''
        this.isProcessing = false

      }

    }
  }

}
</script>

<style>

</style>