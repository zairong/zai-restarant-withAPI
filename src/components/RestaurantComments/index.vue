<template>
  <div>
    <h2 class="my-4">
      所有評論：
    </h2>
    <div v-for="comment in restaurantComments" :key="comment.id">
      <blockquote class="blockquote mb-0">
        <button type="button" class="btn btn-danger float-right" v-if="userInfo.isAdmin"
          @click="deleteComment(comment.id)">
          Delete
        </button>
        <h3>
          <a href="#">
            {{ comment.User.name }}
          </a>
        </h3>
        <p>{{ comment.text }}</p>
        <footer class="blockquote-footer">
          {{ comment.createdAt | fromNow }}
        </footer>
      </blockquote>
      <hr>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from '@/utils/mixins'
import { mapState } from 'vuex'

export default {
  name: 'RestaurantComments',
  props: ['restaurantComments'],
  mixins: [fromNowFilter],
  computed: {
    ...mapState('user', ['userInfo']),
  },
  methods: {
    async deleteComment(id) {
      try {
        let result = await this.$api.reqDeleteComment(id)
        console.log(result)
        this.$emit('after-delete-comment',id)
                  
      }catch (error) {
        console.log(error)
      }


    }
  },

}


</script>
<style scoped>
h2.my-4 {
  margin-bottom: 1rem !important;
  font-size: 18px;
}

h3 {
  margin-bottom: 3px;
  line-height: 1.3;
}

.blockquote-footer {
  font-size: 12.5px;
}
</style>