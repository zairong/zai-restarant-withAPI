<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img class="card-img-top" :src="restaurant.image" alt="Card image cap" width="286px" height="180px">
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{ name || '未分類' }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button v-if="restaurant.isFavorited" type="button" class="btn btn-danger btn-border favorite mr-2"
          @click="deleteFavorite(restaurant.id)" :disabled="isProcessing">
          移除最愛
        </button>
        <button v-else type="button" class="btn btn-primary btn-border favorite mr-2"
          @click="addFavorite(restaurant.id)" :disabled="isProcessing">
          加到最愛
        </button>
        <button v-if="restaurant.isLiked" type="button" class="btn btn-danger like mr-2"
          @click="deleteLike(restaurant.id)" :disabled="isProcessing">
          Unlike
        </button>
        <button v-else type="button" class="btn btn-primary like mr-2" @click="addLike(restaurant.id)"
          :disabled="isProcessing">
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { Toast } from '@/utils/mixins'

export default {
  props: ['restaurant',],
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    //加入最愛
    async addFavorite(id) {
      try {
        this.isProcessing = true
        let result = await this.$api.reqAddFavorite(id)
        console.log(result)
        if (result.status == 'success') {
          this.restaurant.isFavorited = true
        }
        this.isProcessing = false

      } catch (error) {
        this.isProcessing = false

        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
      }
    },
    //移除最愛
    async deleteFavorite(id) {
      try {
        this.isProcessing = true
        let result = await this.$api.reqDeleteFavorite(id)
        console.log(result)
        if (result.status == 'success') {
          this.restaurant.isFavorited = false
        }
        this.isProcessing = false

      } catch (error) {
        this.isProcessing = false
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，請稍後再試'
        })
      }
    },
    //加入喜歡
    async addLike(id) {
      try {
        this.isProcessing = true

        let result = await this.$api.reqAddLike(id)
        console.log(result)
        if (result.status == 'success') {
          this.restaurant.isLiked = true
        }
        this.isProcessing = false

      } catch (error) {
        this.isProcessing = false
        console.log(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
      }
    },
    //移除喜歡
    async deleteLike(id) {
      try {
        this.isProcessing = true
        let result = await this.$api.reqDeleteLike(id)
        console.log(result)
        if (result.status == 'success') {
          this.restaurant.isLiked = false
        }
        //請求回來改回false,可在點擊
        this.isProcessing = false

      } catch (error) {
        console.log(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法將餐廳移除最愛，請稍後再試'
        })
      }
    },
  },
  computed: {
    name() {
      const { Category } = this.restaurant || {}
      const { name } = Category || {}
      return name
    }
  }
}
</script>


<style scoped>
.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}

.card-img-top {
  background-color: #EFEFEF;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>