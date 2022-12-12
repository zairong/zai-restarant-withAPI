<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="name" type="text" name="name" class="form-control" placeholder="Enter Name" required>
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img v-if="image" :src="image" class="d-block img-thumbnail mb-3" width="200" height="200">

        <input id="image" type="file" name="image" accept="image/*" class="form-control-file"
          @change="handleFileChange">
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        {{ isProcessing ? '資料更新中...' : 'Submit' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      id: 0,
      image: '',
      name: '',
      email: '',
      isProcessing: false
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  watch: {
    userInfo(user) {
      if (user.id === -1) return
      const { id } = this.$route.params
      this.setUser(id)
    }
  },
  created() {
    if (this.userInfo.id === -1) return
    const { id } = this.$route.params
    console.log(id)
    this.setUser(id)
  },
  beforeRouteUpdate(to, from, next) {
    if (this.userInfo.id === -1) return
    const { id } = to.params
    this.setUser(id)
    next()
  },
  methods: {
    setUser(userId) {
      const { id, image, name, email } = this.userInfo
      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: 'not-found' })
        return
      }
      this.id = id
      this.name = name
      this.email = email
      this.image = image
    },
    handleFileChange(e) {
      const files = e.target.files
      if (!files.length) return
      const imageURL = window.URL.createObjectURL(files[0])
      this.image = imageURL
    },
    async handleSubmit(e) {
      try {
        if (this.name) {
          const form = e.target
          const formData = new FormData(form)
          console.log(formData)
          this.isProcessing = true
          //api是put 找超久...
          const result = await this.$api.reqUpdateUerInfo(
            this.id,
            formData
          )
          console.log(result)
          if (result.status == 'success'){

            this.$router.push({ name: 'users', params: { id: this.id } })
          }
        }
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false

      }
    }
  }
}
</script>
