<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea class="form-control" rows="3" name="text" v-model="text"></textarea>
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">回上一頁</button>
      <button type="submit" class="btn btn-primary mr-0">
        Submit
      </button>
    </div>
  </form>
</template>

<script>

export default {
  name: 'CreateComment',
  props:['restaurant'],
  data() {
    return {
      text: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.text) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫任何評論'
          })
          return
        }
        this.isProcessing = true
        console.log(this.restaurant.id)
        let result = await this.$api.reqAddComment(
         { CategoryId: this.restaurant.CategoryId,
          restaurantId:this.restaurant.id,
          text:this.text}
        )
        console.log(result)

        if (result.status === 'error') {
          throw new Error(result.message)
        }

        this.$emit('after-create-comment')

        this.isProcessing = false
        this.text = ''
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
      
      }
    }

  },
}
</script>